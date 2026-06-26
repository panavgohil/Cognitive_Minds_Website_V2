import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';

const upcomingTournaments = [
  {
    id: 1,
    title: "DTU Parliamentary Debate 2026",
    date: "October 15-17, 2026",
    location: "Delhi Technological University",
    format: "Asian Parliamentary (3v3)",
    status: "Upcoming",
    description: "Our flagship tournament. Expected footfall of 60+ teams from across the nation."
  },
  {
    id: 2,
    title: "National Law University Open",
    date: "November 05-07, 2026",
    location: "NLU Delhi",
    format: "British Parliamentary (2v2)",
    status: "Registration Open",
    description: "Contingent registration is currently open for the core BP format. Trials will be held next week."
  }
];

const pastTournaments = [
  {
    id: 3,
    title: "St. Stephen's Mukharji Memorial",
    date: "March 2026",
    location: "Delhi University",
    format: "Asian Parliamentary (3v3)",
    status: "Completed",
    description: "Sent 4 contingents. Secured Runners-Up and Best Adjudicator."
  },
  {
    id: 4,
    title: "World Universities Debating Championship",
    date: "January 2026",
    location: "International Circuit",
    format: "British Parliamentary (2v2)",
    status: "Completed",
    description: "Represented DTU on the global stage, breaking into the top 16."
  }
];

const Competitions = () => {
  return (
    <div className="min-h-screen bg-transparent pt-32 pb-24">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        
        {/* Page Header */}
        <div className="mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-sans text-xs tracking-[0.3em] uppercase font-bold mb-4"
          >
            The Circuit
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif text-primary mb-6 tracking-tight"
          >
            Competitions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-sans text-secondary max-w-2xl leading-relaxed"
          >
            Track our upcoming contingents and review our historical performance across national and international circuits.
          </motion.p>
        </div>

        {/* Upcoming Section */}
        <div className="mb-24">
          <div className="flex items-center gap-6 mb-10">
            <h2 className="text-3xl font-serif text-primary">Upcoming</h2>
            <div className="h-[1px] flex-grow bg-primary/10"></div>
          </div>
          
          <div className="flex flex-col gap-6">
            {upcomingTournaments.map((tourney, index) => (
              <motion.div 
                key={tourney.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/40 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 md:p-8 hover:bg-white/80 transition-colors duration-300 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest ${tourney.status === 'Registration Open' ? 'bg-green-100 text-green-700' : 'bg-accent/10 text-accent'}`}>
                        {tourney.status}
                      </span>
                      <span className="text-xs font-sans text-secondary font-medium">{tourney.format}</span>
                    </div>
                    <h3 className="text-2xl font-serif text-primary mb-4">{tourney.title}</h3>
                    <p className="text-sm font-sans text-secondary leading-relaxed max-w-2xl mb-6">
                      {tourney.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-primary/70 font-medium">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                        {tourney.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        {tourney.location}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Past Section */}
        <div>
          <div className="flex items-center gap-6 mb-10">
            <h2 className="text-3xl font-serif text-primary">Past Results</h2>
            <div className="h-[1px] flex-grow bg-primary/10"></div>
          </div>
          
          <div className="flex flex-col gap-4">
            {pastTournaments.map((tourney, index) => (
              <motion.div 
                key={tourney.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-transparent border border-primary/10 rounded-2xl hover:border-primary/30 transition-colors duration-300"
              >
                <div className="flex flex-col mb-4 md:mb-0">
                  <h3 className="text-xl font-serif text-primary mb-2">{tourney.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-sans text-secondary">
                    <span>{tourney.date}</span>
                    <span className="w-1 h-1 rounded-full bg-primary/20"></span>
                    <span>{tourney.location}</span>
                  </div>
                </div>
                <div className="text-sm font-sans font-medium text-primary text-left md:text-right max-w-xs leading-relaxed">
                  {tourney.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Competitions;
