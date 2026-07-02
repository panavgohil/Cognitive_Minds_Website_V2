import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import MemberCard from '../components/council/MemberCard';
import { councilData } from '../data/council';

const Council = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  // Filter data based on tier defined in council.js
  const seniors = councilData.filter(member => member.tier === 'senior');
  const juniors = councilData.filter(member => member.tier === 'junior');

  const closeDetails = () => setSelectedMember(null);
  const openDetails = (member) => setSelectedMember(member);

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <p className="text-[#B89200] font-sans text-xs tracking-[0.3em] uppercase font-bold mb-4">Leadership</p>
          <h1 className="text-6xl md:text-7xl font-serif text-primary mb-6">The Council</h1>
          <p className="text-lg font-sans text-secondary">Meet the minds shaping the discourse at Delhi Technological University.</p>
        </div>

        {/* Senior Council Section */}
        <div className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-3xl font-serif text-primary">Senior Council</h2>
            <div className="h-[1px] flex-grow bg-primary/10"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {seniors.map(member => (
              <MemberCard 
                key={member.id} 
                member={member} 
                onOpenDetails={openDetails}
              />
            ))}
          </div>
        </div>

        {/* Junior Council Section */}
        <div>
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-3xl font-serif text-primary">Junior Council</h2>
            <div className="h-[1px] flex-grow bg-primary/10"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {juniors.map(member => (
              <MemberCard 
                key={member.id} 
                member={member} 
                onOpenDetails={openDetails}
              />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedMember && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-primary/55 px-4 py-8 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDetails}
            >
              <motion.div
                className="relative w-full max-w-2xl overflow-hidden border-2 border-primary bg-paper shadow-poster"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="absolute inset-x-0 top-0 h-2 bg-accent" />
                <div className="flex items-start justify-between gap-4 border-b border-primary/10 px-6 py-5 sm:px-8">
                  <div>
                    <p className="eyebrow mb-2 text-oxblood">Council Profile</p>
                    <h3 className="text-3xl font-serif text-primary sm:text-4xl">{selectedMember.name}</h3>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-secondary">{selectedMember.role}</p>
                  </div>
                  <button
                    type="button"
                    onClick={closeDetails}
                    className="flex h-10 w-10 items-center justify-center border-2 border-primary text-primary transition-colors hover:bg-accent"
                    aria-label="Close member details"
                  >
                    ×
                  </button>
                </div>

                <div className="grid gap-8 px-6 py-6 sm:px-8 sm:py-8">
                  <div className="rounded-2xl border border-primary/10 bg-background/60 p-5 sm:p-6">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-oxblood">From the Desk</p>
                    <p className="text-lg leading-8 text-primary sm:text-xl sm:leading-9">“{selectedMember.quote}”</p>
                  </div>

                  <div>
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.26em] text-oxblood">Comps Participated In</p>
                    {selectedMember.comps.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {selectedMember.comps.map((comp) => (
                          <span
                            key={comp}
                            className="rounded-full border border-primary/15 bg-background px-4 py-2 text-sm font-medium text-primary"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm leading-7 text-secondary">
                        No contingent appearances recorded in the current roster data yet.
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Council;
