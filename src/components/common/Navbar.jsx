import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LogIn, LogOut, UserRound } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import cmLogo from '../../assets/logo/cm-logo.jpg';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Council', path: '/council' },
  { name: 'Motion Archive', path: '/archive' },
  { name: 'Competitions', path: '/competitions' },
  { name: 'Rulebook', path: '/rulebook' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Recruitment', path: '/recruitment' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b-2 border-primary bg-background/90 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="/" className="flex items-center gap-3 text-primary">
              <img
                src={cmLogo}
                alt="Cognitive Minds logo"
                className="h-9 w-9 object-cover"
              />
              <span className="font-serif text-xl font-semibold leading-none">Cognitive Minds</span>
            </Link>
          </div>

          <div className="hidden items-center space-x-7 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative group font-sans text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300 ${
                    isActive ? 'text-oxblood' : 'text-secondary hover:text-oxblood'
                  }`
                }
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-oxblood transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
            
            {session ? (
              <Link
                to="/dashboard"
                aria-label="Open member profile"
                title="Member profile"
                className="flex h-10 w-10 items-center justify-center border-2 border-primary bg-paper text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
              >
                <UserRound size={18} strokeWidth={1.8} />
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 border-2 border-primary bg-accent px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-paper"
              >
                <LogIn size={16} />
                Log In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary hover:text-accent transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden bg-background border-b border-black/5">
          <div className="px-6 pt-2 pb-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-serif ${isActive ? 'text-primary' : 'text-secondary hover:text-accent'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {session ? (
              <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-medium text-white"
                >
                  <UserRound size={18} /> Member Profile
                </Link>
                <button
                  onClick={handleLogout}
                  aria-label="Log out"
                  title="Log out"
                  className="flex items-center justify-center rounded-lg border border-red-500/20 px-4 text-red-600"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-medium text-white"
              >
                <LogIn size={18} />
                Member Log In
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
