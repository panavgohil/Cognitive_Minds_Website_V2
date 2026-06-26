import React from 'react';
import Navbar from '../components/common/Navbar';
import MemberCard from '../components/council/MemberCard';
import { councilData } from '../data/council';

const Council = () => {
  // Filter data based on tier defined in council.js
  const seniors = councilData.filter(member => member.tier === 'senior');
  const juniors = councilData.filter(member => member.tier === 'junior');

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
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Council;
