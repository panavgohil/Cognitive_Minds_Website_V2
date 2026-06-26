import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { KeyRound, LogOut, X, Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
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
  
  // New Search & Notification States
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const getDashboardData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { profile: null, tourneyData: [] };

    const [{ data: profile }, { data: tourneyData }] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('tournaments').select('*').eq('user_id', user.id),
    ]);

    return { profile, tourneyData: tourneyData || [] };
  };

  useEffect(() => {
    let isActive = true;

    getDashboardData().then(({ profile, tourneyData }) => {
      if (!isActive) return;
      if (profile) setMember(profile);
      setTournaments(tourneyData);
    });

    return () => {
      isActive = false;
    };
  }, []);

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

  const refreshData = async () => {
    const { profile, tourneyData } = await getDashboardData();
    if (profile) setMember(profile);
    setTournaments(tourneyData);
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

    if (password.length < 8) {
      setPasswordMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMessage('The passwords do not match.');
      return;
    }

    setPasswordStatus('loading');
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setPasswordMessage(error.message);
      setPasswordStatus('idle');
      return;
    }

    setPassword('');
    setConfirmPassword('');
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

  return (
    <div className="min-h-screen bg-transparent pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* NEW: Search and Notification UI */}
        <div className="flex justify-end gap-4 mb-12">
          <div className="relative">
            <div className="flex items-center bg-white/50 border border-primary/10 rounded-full px-4 py-2 w-64">
              <Search size={18} className="text-secondary" />
              <input 
                className="bg-transparent border-none outline-none ml-2 text-sm w-full" 
                placeholder="Search members..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {isSearchOpen && (
              <div className="absolute top-12 left-0 w-full bg-white shadow-xl rounded-2xl p-4 z-50 border border-primary/10">
                {searchResults.length > 0 ? searchResults.map(r => (
                  <div key={r.id} className="p-2 text-sm hover:bg-gray-50 cursor-pointer">{r.full_name}</div>
                )) : <p className="text-xs text-secondary italic">No members found</p>}
              </div>
            )}
          </div>
          <button className="relative p-3 bg-white/50 rounded-full border border-primary/10 hover:bg-white transition-all">
            <Bell size={20} className="text-primary" />
            {/* The dot here is currently static, we will make it dynamic in the next step */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-accent font-sans text-xs tracking-[0.3em] uppercase font-bold mb-4">Member Portal</p>
            <h1 className="text-5xl font-serif text-primary">Welcome back.</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowPasswordForm(true)}
              className="flex items-center gap-2 rounded-xl border border-primary/15 bg-white/50 px-5 py-3 text-sm font-semibold text-primary transition-all hover:border-accent hover:bg-white"
            >
              <KeyRound size={17} />
              Change Password
            </button>
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90"
            >
              {isEditing ? "Save Profile" : "Edit Profile"}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-red-500/20 px-5 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-50"
            >
              <LogOut size={17} />
              Log Out
            </button>
          </div>
        </motion.div>

        {showPasswordForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-10 rounded-3xl border border-primary/10 bg-white/60 p-6 shadow-lg backdrop-blur-md md:p-8"
          >
            <button
              onClick={closePasswordForm}
              aria-label="Close password form"
              className="absolute right-5 top-5 text-secondary transition-colors hover:text-primary"
            >
              <X size={20} />
            </button>
            <div className="mb-6">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                Account Security
              </p>
              <h2 className="text-2xl font-serif text-primary">Change your password</h2>
            </div>
            <form onSubmit={handlePasswordChange} className="grid max-w-3xl gap-4 md:grid-cols-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                autoComplete="new-password"
                className="rounded-xl border border-primary/10 bg-white p-4 text-sm focus:border-accent focus:outline-none"
                required
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                autoComplete="new-password"
                className="rounded-xl border border-primary/10 bg-white p-4 text-sm focus:border-accent focus:outline-none"
                required
              />
              {passwordMessage && (
                <p className={`text-xs md:col-span-2 ${passwordStatus === 'success' ? 'text-green-700' : 'text-red-600'}`}>
                  {passwordMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={passwordStatus === 'loading'}
                className="w-fit rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white disabled:opacity-50 md:col-span-2"
              >
                {passwordStatus === 'loading' ? 'Updating...' : 'Update Password'}
              </button>
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
                <input name="linkedin_url" value={member.linkedin_url || ''} onChange={(e) => setMember({...member, linkedin_url: e.target.value})} className="w-full p-4 bg-white border border-primary/10 rounded-xl font-sans text-sm" placeholder="LinkedIn URL" />
                <input name="instagram_url" value={member.instagram_url || ''} onChange={(e) => setMember({...member, instagram_url: e.target.value})} className="w-full p-4 bg-white border border-primary/10 rounded-xl font-sans text-sm" placeholder="Instagram URL" />
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-primary">{member.full_name || "Set your name"}</h2>
                <p className="text-sm font-sans font-semibold uppercase text-accent">{member.role || "Role"}</p>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/70 mb-1">Branch</p>
                  <p className="text-sm font-sans text-primary">{member.branch || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/70 mb-1">Year</p>
                  <p className="text-sm font-sans text-primary">{member.current_year || "N/A"}</p>
                </div>
                
                <div className="absolute bottom-6 right-8 flex gap-4">
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">
                      <FaLinkedin size={24} />
                    </a>
                  )}
                  {member.instagram_url && (
                    <a href={member.instagram_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">
                      <FaInstagram size={24} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          <div className="lg:col-span-8 bg-white/30 border border-primary/5 rounded-3xl p-10">
            <h3 className="text-2xl font-serif text-primary mb-6">Tournament History</h3>
            
            <form onSubmit={handleAddTournament} className="grid grid-cols-2 gap-4 mb-8 bg-white/50 p-6 rounded-2xl border border-primary/10">
              <input name="name" placeholder="Tournament Name" className="p-3 rounded-xl border border-primary/10" required />
              <input name="role" placeholder="Role" className="p-3 rounded-xl border border-primary/10" required />
              <input name="result" placeholder="Result" className="p-3 rounded-xl border border-primary/10" required />
              <input name="date" placeholder="Date" className="p-3 rounded-xl border border-primary/10" required />
              <button type="submit" className="col-span-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all">
                + Log Tournament
              </button>
            </form>

            <div className="space-y-4">
              {tournaments.length > 0 ? tournaments.map((t) => (
                <div key={t.id} className="p-4 bg-white rounded-xl border border-primary/10 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-primary">{t.name}</h4>
                    <p className="text-xs text-secondary">{t.role} • {t.date}</p>
                  </div>
                  <span className="text-sm font-bold text-accent">{t.result}</span>
                </div>
              )) : <p className="text-secondary italic">No tournaments added yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;