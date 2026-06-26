import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/common/Navbar';

const Recruitment = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    year: '',
    branch: '',
    experience: 'none',
    motivation: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Get the current user session (if any)
    const { data: { user } } = await supabase.auth.getUser();
    
    // Insert application data into the 'recruitment' table
    const { error } = await supabase.from('recruitment').insert([{
      user_id: user?.id || null, // Associates application with user if logged in
      name: formData.name,
      email: formData.email,
      year: formData.year,
      branch: formData.branch,
      experience: formData.experience,
      motivation: formData.motivation
    }]);

    if (error) {
      console.error("Submission error:", error);
      alert("Error: " + error.message);
      setStatus('idle');
    } else {
      setStatus('success');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent pt-28 pb-20">
      <Navbar />

      {/* Subtle ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-accent font-sans text-xs tracking-[0.3em] uppercase font-bold mb-4">Join The Legacy</p>
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-6">Recruitment 2026</h1>
          <p className="text-sm md:text-base font-sans text-secondary max-w-xl mx-auto leading-relaxed">
            We are looking for articulate thinkers, relentless researchers, and passionate speakers to join the core council. Applications close at midnight.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="bg-white/40 backdrop-blur-xl border border-primary/10 rounded-[2rem] p-8 md:p-12 shadow-xl"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              // Success State
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-8 shadow-sm border border-green-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-3xl font-serif text-primary mb-4">Application Received</h3>
                <p className="text-base font-sans text-secondary leading-relaxed max-w-md mb-8">
                  Thank you for applying to Cognitive Minds, {formData.name.split(' ')[0]}. Our panel will review your application and reach out via your university email.
                </p>
                <a href="/" className="px-8 py-3.5 bg-primary text-white rounded-xl font-sans text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20">
                  Return to Homepage
                </a>
              </motion.div>

            ) : (
              // The Application Form
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit} 
                className="flex flex-col gap-10"
              >
                
                {/* Section 1: The Basics */}
                <div>
                  <h2 className="text-sm font-sans font-bold tracking-widest uppercase text-primary border-b border-primary/10 pb-4 mb-6">1. The Basics</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-[11px] font-sans font-bold uppercase tracking-widest text-primary/70 ml-1">Full Name</label>
                      <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 text-primary font-sans text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 shadow-sm" placeholder="John Doe" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-[11px] font-sans font-bold uppercase tracking-widest text-primary/70 ml-1">DTU Email</label>
                      <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 text-primary font-sans text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 shadow-sm" placeholder="name@dtu.ac.in" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="branch" className="text-[11px] font-sans font-bold uppercase tracking-widest text-primary/70 ml-1">Branch</label>
                      <input required type="text" id="branch" name="branch" value={formData.branch} onChange={handleChange} className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 text-primary font-sans text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 shadow-sm" placeholder="Computer Engineering" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="year" className="text-[11px] font-sans font-bold uppercase tracking-widest text-primary/70 ml-1">Current Year</label>
                      <select required id="year" name="year" value={formData.year} onChange={handleChange} className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 text-primary font-sans text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 shadow-sm appearance-none">
                        <option value="" disabled>Select your year</option>
                        <option value="1">First Year</option>
                        <option value="2">Second Year</option>
                        <option value="3">Third Year</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: The Discourse */}
                <div>
                  <h2 className="text-sm font-sans font-bold tracking-widest uppercase text-primary border-b border-primary/10 pb-4 mb-6">2. The Discourse</h2>
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="experience" className="text-[11px] font-sans font-bold uppercase tracking-widest text-primary/70 ml-1">Prior Debating Experience</label>
                      <select required id="experience" name="experience" value={formData.experience} onChange={handleChange} className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 text-primary font-sans text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 shadow-sm appearance-none">
                        <option value="none">None - I am looking to start.</option>
                        <option value="school">School Level (MUNs, Declamations)</option>
                        <option value="college">University Circuit (Asian/British Parliamentary)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="motivation" className="text-[11px] font-sans font-bold uppercase tracking-widest text-primary/70 ml-1">Why do you want to join Cognitive Minds?</label>
                      <textarea required id="motivation" name="motivation" value={formData.motivation} onChange={handleChange} rows="4" className="w-full bg-white border border-primary/10 rounded-xl px-5 py-4 text-primary font-sans text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 shadow-sm resize-none" placeholder="Tell us about your interest in public speaking, policy, or logical discourse..." />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-primary/10">
                  <button 
                    type="submit" 
                    disabled={status === 'loading'} 
                    className="w-full md:w-auto md:px-12 py-4 bg-primary text-white rounded-xl font-sans text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all duration-300 disabled:bg-primary/50 flex justify-center items-center shadow-lg shadow-primary/20"
                  >
                    {status === 'loading' ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : "Submit Application"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Recruitment;
