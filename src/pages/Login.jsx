import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import cmLogo from '../assets/logo/cm-logo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset password.');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/update-password', // Ensure this matches your route
    });
    if (error) setError(error.message);
    else alert('Password reset link sent to your email!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('loading');

    const cleanEmail = email.toLowerCase().trim();

    // Domain Validation
    if (!cleanEmail.endsWith('@dtu.ac.in')) {
      setError('Access Restricted: Use @dtu.ac.in email.');
      setStatus('idle');
      return;
    }

    // Standard Sign In
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password,
    });
    
    if (authError) {
      setError(authError.message);
    } else {
      navigate('/dashboard');
    }
    setStatus('idle');
  };

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* LEFT SIDE: Branding */}
      <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center">
        <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border border-primary/10 shadow-xl mb-10 bg-white flex items-center justify-center">
            <img src={cmLogo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-5xl font-serif text-primary mb-6">Cognitive Minds</h1>
          <p className="text-secondary font-sans tracking-[0.3em] uppercase text-[10px] font-bold">Delhi Technological University</p>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10">
        <div className="w-full max-w-sm mx-auto">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-4xl font-serif text-primary mb-8">Welcome Back</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="name@dtu.ac.in" 
                className="w-full p-4 bg-white border border-primary/10 rounded-xl text-sm" 
                required 
              />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                className="w-full p-4 bg-white border border-primary/10 rounded-xl text-sm" 
                required 
              />
              
              {error && <p className="text-xs text-red-500">{error}</p>}
              
              <button 
                type="submit" 
                disabled={status === 'loading'} 
                className="w-full bg-primary text-white rounded-xl py-4 text-sm font-semibold hover:bg-primary/90 transition-all"
              >
                {status === 'loading' ? 'Processing...' : 'Sign In'}
              </button>

              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-xs text-secondary hover:text-primary transition-colors mt-2"
              >
                Forgot Password?
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;