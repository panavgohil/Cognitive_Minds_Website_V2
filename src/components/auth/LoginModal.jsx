import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.toLowerCase().trim();

    // The Gatekeeper Check
    if (!cleanEmail.endsWith('@dtu.ac.in')) {
      setError('Access Restricted: You must use a valid @dtu.ac.in email.');
      return;
    }

    // Simulate backend auth call (We will connect Supabase here later)
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const handleClose = () => {
    // Reset states when closing
    setEmail('');
    setError('');
    setStatus('idle');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Darkened Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-primary/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-background w-full max-w-md rounded-2xl p-8 relative shadow-2xl border border-primary/10 pointer-events-auto"
            >
              {/* Close Button (Pure SVG) */}
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 text-secondary hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>

              {status === 'success' ? (
                // Success State
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="text-2xl font-serif text-primary mb-2">Check your email</h3>
                  <p className="text-sm font-sans text-secondary leading-relaxed">
                    We've sent a magic login link to <br/> <span className="font-semibold text-primary">{email}</span>
                  </p>
                </motion.div>
              ) : (
                // Input Form State
                <>
                  <div className="mb-8">
                    <p className="text-accent font-sans text-xs tracking-[0.2em] uppercase font-bold mb-2">Members Only</p>
                    <h3 className="text-3xl font-serif text-primary mb-2">Council Portal</h3>
                    <p className="text-sm font-sans text-secondary">Sign in using your university credentials.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-sans font-semibold uppercase tracking-widest text-primary/70">
                        DTU Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(''); // Clear error when typing
                        }}
                        placeholder="name@dtu.ac.in"
                        className={`w-full bg-transparent border ${error ? 'border-red-500' : 'border-primary/20'} rounded-lg px-4 py-3 text-primary font-sans text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300`}
                      />
                      {/* Error Message Animation */}
                      <AnimatePresence>
                        {error && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }} 
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-red-500 font-sans mt-1"
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-primary text-white rounded-lg py-3 font-sans text-sm font-medium hover:bg-primary/90 transition-colors disabled:bg-primary/50 flex justify-center items-center h-12 mt-2"
                    >
                      {status === 'loading' ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ) : (
                        "Send Magic Link"
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;