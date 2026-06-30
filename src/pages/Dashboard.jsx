import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/common/Navbar';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { KeyRound, LogOut, X, Bell, Search, UserPlus, Clock, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const Dashboard = () => {
  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('idle');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [member, setMember] = useState({ 
    full_name: '', branch: '', current_year: '', role: '', 
    linkedin_url: '', instagram_url: '' 
  });
  const [tournaments, setTournaments] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [resolvedTargetId, setResolvedTargetId] = useState(null);
  const [connections, setConnections] = useState([]);
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  // Helper function to convert slug to name
  const slugToName = (slug) => {
    if (!slug) return null;
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Check if a string is a UUID
  const isUUID = (str) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  };

  const getDashboardData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    let targetId = userId;
    
    // If userId is not a UUID, treat it as a name slug and lookup the profile
    if (userId && !isUUID(userId)) {
      const name = slugToName(userId);
      console.log('Looking up profile for name:', name);
      
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .ilike('full_name', `%${name}%`);
      
      console.log('Search results:', profiles, error);
      
      if (profiles && profiles.length > 0) {
        targetId = profiles[0].id;
        console.log('Found profile ID:', targetId);
      } else {
        console.log('No profile found for name:', name);
        return { profile: null, tourneyData: [], targetId: null };
      }
    }
    
    targetId = targetId || user?.id;
    if (!targetId) return { profile: null, tourneyData: [], targetId: null };

    const [{ data: profile }, { data: tourneyData }] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', targetId).single(),
      supabase.from('tournaments').select('*').eq('user_id', targetId),
    ]);

    if (user) {
      setCurrentUserId(user.id);
      if (user.id !== targetId) {
        const { data } = await supabase.from('connections')
          .select('status')
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .or(`sender_id.eq.${targetId},receiver_id.eq.${targetId}`);
        if (data && data.length > 0) setConnectionStatus(data[0].status);
      }
    }

    if (user) {
      const { data: pendingRequests } = await supabase
        .from('connections')
        .select('id, sender_id, receiver_id, status')
        .or(`receiver_id.eq.${user.id},sender_id.eq.${user.id}`)
        .eq('status', 'pending');

      const incoming = (pendingRequests || []).filter((request) => request.receiver_id === user.id);

      if (incoming.length > 0) {
        const senderIds = [...new Set(incoming.map((request) => request.sender_id).filter(Boolean))];
        const { data: senderProfiles } = await supabase.from('profiles').select('id, full_name').in('id', senderIds);
        const profilesById = Object.fromEntries((senderProfiles || []).map((profile) => [profile.id, profile]));

        setIncomingRequests(
          incoming.map((request) => ({
            ...request,
            sender_name: profilesById[request.sender_id]?.full_name || 'A member',
          }))
        );
      } else {
        setIncomingRequests([]);
      }

    }

    return { profile, tourneyData: tourneyData || [], targetId };
  };

  useEffect(() => {
    let isActive = true;
    getDashboardData().then(({ profile, tourneyData, targetId }) => {
      if (!isActive) return;
      if (profile) setMember(profile);
      setTournaments(tourneyData);
      setResolvedTargetId(targetId);
      refreshConnections(targetId);
    });
    return () => { isActive = false; };
  }, [userId]);

  useEffect(() => {
    let pollingTimer;

    const startPolling = async () => {
      await refreshPendingRequests();
      pollingTimer = setInterval(() => {
        refreshPendingRequests();
      }, 5000);
    };

    startPolling();

    return () => {
      if (pollingTimer) {
        clearInterval(pollingTimer);
      }
    };
  }, []);

  const refreshData = async () => {
    const { profile, tourneyData, targetId } = await getDashboardData();
    if (profile) setMember(profile);
    setTournaments(tourneyData);
    await refreshConnections(targetId);
  };

  const handleConnect = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !resolvedTargetId) return;

    const { error } = await supabase.from('connections').insert({ sender_id: user.id, receiver_id: resolvedTargetId, status: 'pending' });

    if (error) {
      console.error('Failed to send connection request:', error);
      return;
    }

    setConnectionStatus('pending');
    await refreshPendingRequests();
  };

  const refreshPendingRequests = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: pendingRequests } = await supabase
      .from('connections')
      .select('id, sender_id, receiver_id, status')
      .or(`receiver_id.eq.${user.id},sender_id.eq.${user.id}`)
      .eq('status', 'pending');

    const incoming = (pendingRequests || []).filter((request) => request.receiver_id === user.id);

    if (incoming.length > 0) {
      const senderIds = [...new Set(incoming.map((request) => request.sender_id).filter(Boolean))];
      const { data: senderProfiles } = await supabase.from('profiles').select('id, full_name').in('id', senderIds);
      const profilesById = Object.fromEntries((senderProfiles || []).map((profile) => [profile.id, profile]));

      setIncomingRequests(
        incoming.map((request) => ({
          ...request,
          sender_name: profilesById[request.sender_id]?.full_name || 'A member',
        }))
      );
    } else {
      setIncomingRequests([]);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    await supabase.from('connections').update({ status: 'connected' }).eq('id', requestId);
    await refreshPendingRequests();
    await refreshConnections(userId || member.id);
  };

  const handleDeclineRequest = async (requestId) => {
    await supabase.from('connections').update({ status: 'declined' }).eq('id', requestId);
    await refreshPendingRequests();
  };

  const openConnectionsModal = async () => {
    await refreshConnections(userId || member.id);
    setShowConnectionsModal(true);
  };

  const refreshConnections = async (profileId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !profileId) return;
    const targetId = profileId;

    const { data: connectedRows } = await supabase
      .from('connections')
      .select('sender_id, receiver_id')
      .or(`sender_id.eq.${targetId},receiver_id.eq.${targetId}`)
      .eq('status', 'connected');

    const connectedIds = [...new Set((connectedRows || []).flatMap((row) => [row.sender_id, row.receiver_id]).filter((id) => id && id !== targetId))];
    if (connectedIds.length > 0) {
      const { data: connectedProfiles } = await supabase.from('profiles').select('id, full_name, role, branch, current_year').in('id', connectedIds);
      setConnections(connectedProfiles || []);
    } else {
      setConnections([]);
    }
  };

  const handleSearch = async (term) => {
    if (term.length > 2) {
      const { data } = await supabase.from('profiles').select('id, full_name').ilike('full_name', `%${term}%`);
      setSearchResults(data || []);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('profiles').upsert({ id: user.id, ...member });
    setIsEditing(false);
    refreshData();
  };

  const handleAddTournament = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('tournaments').insert([{
      user_id: user.id,
      name: formData.get('name'),
      role: formData.get('role'),
      result: formData.get('result'),
      date: formData.get('date'),
    }]);
    e.target.reset();
    refreshData();
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    if (password.length < 8) { setPasswordMessage('Password must be at least 8 characters long.'); return; }
    if (password !== confirmPassword) { setPasswordMessage('The passwords do not match.'); return; }
    setPasswordStatus('loading');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setPasswordMessage(error.message); setPasswordStatus('idle'); return; }
    setPassword(''); setConfirmPassword('');
    setPasswordMessage('Password updated successfully.');
    setPasswordStatus('success');
  };

  const closePasswordForm = () => {
    setShowPasswordForm(false);
    setPassword('');
    setConfirmPassword('');
    setPasswordMessage('');
    setPasswordStatus('idle');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const connectionsHeading = userId && member.full_name && currentUserId !== userId
    ? `${member.full_name}${member.full_name.endsWith('s') ? "'" : "'s"} connections`
    : 'Your connections';

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-end gap-4 mb-12">
          <div className="relative">
            <div className="flex items-center bg-white/50 border border-primary/10 rounded-full px-4 py-2 w-64">
              <Search size={18} className="text-secondary" />
              <input className="bg-transparent border-none outline-none ml-2 text-sm w-full" placeholder="Search members..." onChange={(e) => handleSearch(e.target.value)} />
            </div>
            {isSearchOpen && (
              <div className="absolute top-12 left-0 w-full bg-white shadow-xl rounded-2xl p-4 z-50 border border-primary/10">
                {searchResults.length > 0 ? searchResults.map(r => (
                  <div key={r.id} onClick={() => { navigate(`/dashboard/${r.id}`); setIsSearchOpen(false); }} className="p-2 text-sm hover:bg-gray-50 cursor-pointer">{r.full_name}</div>
                )) : <p className="text-xs text-secondary italic">No matching profile found</p>}
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => setShowNotifications((prev) => !prev)} className="relative p-3 bg-white/50 rounded-full border border-primary/10 hover:bg-white transition-all">
              <Bell size={20} className="text-primary" />
              {incomingRequests.length > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>}
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-14 w-80 rounded-2xl border border-primary/10 bg-white p-4 shadow-xl z-50">
                {incomingRequests.length > 0 ? (
                  <div className="space-y-3">
                    {incomingRequests.map((request) => (
                      <div key={request.id} className="rounded-xl border border-primary/10 bg-gray-50 p-3">
                        <p className="text-sm font-semibold text-primary">{request.sender_name}</p>
                        <p className="mt-1 text-xs text-secondary">Sent you a connection request.</p>
                        <div className="mt-3 flex gap-2">
                          <button onClick={() => handleAcceptRequest(request.id)} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white">Accept</button>
                          <button onClick={() => handleDeclineRequest(request.id)} className="rounded-lg border border-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">Decline</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-secondary italic">No notification</p>
                )}
              </div>
            )}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-accent font-sans text-xs tracking-[0.3em] uppercase font-bold mb-4">Member Portal</p>
            <h1 className="text-5xl font-serif text-primary">{userId ? member.full_name : "Welcome back."}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {userId ? (
              <button onClick={handleConnect} disabled={connectionStatus !== null} className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${connectionStatus === 'connected' ? 'bg-green-600 text-white' : connectionStatus === 'pending' ? 'bg-gray-300' : 'bg-primary text-white'}`}>
                {connectionStatus === 'pending' ? <><Clock size={17} /> Pending</> : connectionStatus === 'connected' ? <><CheckCircle size={17} /> Connected</> : <><UserPlus size={17} /> Connect</>}
              </button>
            ) : (
              <>
                <button onClick={() => setShowPasswordForm(true)} className="flex items-center gap-2 rounded-xl border border-primary/15 bg-white/50 px-5 py-3 text-sm font-semibold text-primary transition-all hover:border-accent hover:bg-white"><KeyRound size={17} /> Change Password</button>
                <button onClick={isEditing ? handleSave : () => setIsEditing(true)} className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90">{isEditing ? "Save Profile" : "Edit Profile"}</button>
                <button onClick={handleLogout} className="flex items-center gap-2 rounded-xl border border-red-500/20 px-5 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-50"><LogOut size={17} /> Log Out</button>
              </>
            )}
          </div>
        </motion.div>

        {showPasswordForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="relative mb-10 rounded-3xl border border-primary/10 bg-white/60 p-6 shadow-lg backdrop-blur-md md:p-8">
            <button onClick={closePasswordForm} className="absolute right-5 top-5 text-secondary transition-colors hover:text-primary"><X size={20} /></button>
            <div className="mb-6"><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Account Security</p><h2 className="text-2xl font-serif text-primary">Change your password</h2></div>
            <form onSubmit={handlePasswordChange} className="grid max-w-3xl gap-4 md:grid-cols-2">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="rounded-xl border border-primary/10 bg-white p-4 text-sm" required />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="rounded-xl border border-primary/10 bg-white p-4 text-sm" required />
              {passwordMessage && <p className={`text-xs md:col-span-2 ${passwordStatus === 'success' ? 'text-green-700' : 'text-red-600'}`}>{passwordMessage}</p>}
              <button type="submit" className="w-fit rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white">{passwordStatus === 'loading' ? 'Updating...' : 'Update Password'}</button>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div className="lg:col-span-4 bg-white/50 backdrop-blur-md border border-primary/10 rounded-3xl p-8 shadow-sm h-fit relative">
            {isEditing ? (
              <div className="space-y-4">
                <input name="full_name" value={member.full_name || ''} onChange={(e) => setMember({...member, full_name: e.target.value})} className="w-full p-4 bg-white border border-primary/10 rounded-xl font-sans text-sm" placeholder="Full Name" />
                <input name="role" value={member.role || ''} onChange={(e) => setMember({...member, role: e.target.value})} className="w-full p-4 bg-white border border-primary/10 rounded-xl font-sans text-sm" placeholder="Role" />
                <input name="branch" value={member.branch || ''} onChange={(e) => setMember({...member, branch: e.target.value})} className="w-full p-4 bg-white border border-primary/10 rounded-xl font-sans text-sm" placeholder="Branch" />
                <input name="current_year" value={member.current_year || ''} onChange={(e) => setMember({...member, current_year: e.target.value})} className="w-full p-4 bg-white border border-primary/10 rounded-xl font-sans text-sm" placeholder="Year" />
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-primary">{member.full_name || "Set your name"}</h2>
                <p className="text-sm font-sans font-semibold uppercase text-accent">{member.role || "Role"}</p>
                <div><p className="text-[10px] font-bold uppercase tracking-widest text-secondary/70 mb-1">Branch</p><p className="text-sm font-sans text-primary">{member.branch || "N/A"}</p></div>
                <div><p className="text-[10px] font-bold uppercase tracking-widest text-secondary/70 mb-1">Year</p><p className="text-sm font-sans text-primary">{member.current_year || "N/A"}</p></div>
                <div>
                  <button onClick={openConnectionsModal} className="text-primary underline text-sm font-semibold">Connections</button>
                </div>
                <div className="absolute bottom-6 right-8 flex gap-4">
                  {member.linkedin_url && <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent"><FaLinkedin size={24} /></a>}
                  {member.instagram_url && <a href={member.instagram_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent"><FaInstagram size={24} /></a>}
                </div>
              </div>
            )}
          </motion.div>
          <div className="lg:col-span-8 bg-white/30 border border-primary/5 rounded-3xl p-10">
            <h3 className="text-2xl font-serif text-primary mb-6">Tournament History</h3>
            {!userId && (
              <form onSubmit={handleAddTournament} className="grid grid-cols-2 gap-4 mb-8 bg-white/50 p-6 rounded-2xl border border-primary/10">
                <input name="name" placeholder="Tournament Name" className="p-3 rounded-xl border border-primary/10" required />
                <input name="role" placeholder="Role" className="p-3 rounded-xl border border-primary/10" required />
                <input name="result" placeholder="Result" className="p-3 rounded-xl border border-primary/10" required />
                <input name="date" placeholder="Date" className="p-3 rounded-xl border border-primary/10" required />
                <button type="submit" className="col-span-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90"> + Log Tournament </button>
              </form>
            )}
            <div className="space-y-4">
              {tournaments.length > 0 ? tournaments.map((t) => (
                <div key={t.id} className="p-4 bg-white rounded-xl border border-primary/10 flex justify-between items-center">
                  <div><h4 className="font-semibold text-primary">{t.name}</h4><p className="text-xs text-secondary">{t.role} • {t.date}</p></div>
                  <span className="text-sm font-bold text-accent">{t.result}</span>
                </div>
              )) : <p className="text-secondary italic">No tournaments added yet.</p>}
            </div>
          </div>
        </div>
      </div>

      {showConnectionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">Connections</p>
                <h2 className="text-2xl font-serif text-primary">{connectionsHeading}</h2>
              </div>
              <button onClick={() => setShowConnectionsModal(false)} className="text-secondary hover:text-primary text-sm font-semibold">Close</button>
            </div>
            {connections.length > 0 ? (
              <div className="grid gap-3">
                {connections.map((connection) => (
                  <button
                    key={connection.id}
                    onClick={() => { setShowConnectionsModal(false); navigate(`/dashboard/${connection.id}`); }}
                    className="w-full text-left rounded-2xl border border-primary/10 bg-gray-50 p-4 text-left transition hover:bg-gray-100"
                  >
                    <p className="text-lg font-semibold text-primary">{connection.full_name}</p>
                    <p className="text-sm text-secondary">{connection.role || 'Member'}</p>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-secondary">No connections yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;