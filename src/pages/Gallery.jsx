import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { galleryTournaments } from '../data/gallery';

const Gallery = () => {
  const navigate = useNavigate();
  const tournamentData = galleryTournaments;

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-24">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <h1 className="text-5xl font-serif text-primary mb-16 text-center">Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournamentData.map((tourney) => (
            <motion.div 
              key={tourney.id}
              onClick={() => navigate(`/gallery/${tourney.id}`)}
              whileHover={{ y: -8 }}
              className="cursor-pointer bg-white/40 border border-primary/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
                <div className="aspect-[4/3] bg-primary/5 overflow-hidden">
                {tourney.previewImage ? (
                  <img
                    src={tourney.previewImage}
                    alt={`${tourney.title} preview`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-secondary/30 font-serif">
                    Preview Image
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">{tourney.category}</p>
                <h3 className="text-xl font-serif text-primary mb-1">{tourney.title}</h3>
                <p className="text-xs font-sans text-secondary">{tourney.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
