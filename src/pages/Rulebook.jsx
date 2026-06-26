import React from 'react';
import Navbar from '../components/common/Navbar';

const Rulebook = () => {
  // Your confirmed PDF link
  const pdfUrl = "https://drive.google.com/file/d/1EuIVTQgImuCDyH0sf7OYgiw0NQlpE21j/";

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-24">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-serif text-primary mb-6">Rulebook</h1>
        <p className="text-secondary font-sans mb-12">
          The official briefing documents for all debaters and judges.
        </p>

        {/* The "Access Portal" Card */}
        <div className="bg-white/50 backdrop-blur-md border border-primary/10 rounded-3xl p-12 shadow-xl">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
          </div>
          
          <h2 className="text-2xl font-serif text-primary mb-4">Ready to access?</h2>
          <p className="text-secondary font-sans mb-8">Click the button below to view the official Cognitive Minds briefings in a new window.</p>
          
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-xl font-sans font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20"
          >
            Open Briefings Document
          </a>
        </div>
      </div>
    </div>
  );
};

export default Rulebook;
