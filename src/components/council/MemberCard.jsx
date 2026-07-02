import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import placeholderImg from '../../assets/council/placeholder.png';

const MemberCard = ({ member, onOpenDetails }) => {
  return (
    <motion.div 
      className="group relative flex flex-col cursor-pointer h-full"
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-50px" }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-primary/5 mb-6">
        <img 
          src={member.image || placeholderImg} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" 
        />
        <div className="absolute inset-0 border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-10 pointer-events-none"></div>
      </div>

      {/* Typography & Socials Container */}
      <div className="flex flex-col flex-grow text-center px-2">
        <h3 className="text-2xl font-serif text-primary mb-1">{member.name}</h3>
        <p className="text-xs font-sans font-bold uppercase tracking-widest text-accent mb-3">{member.role}</p>
        
        {member.description && (
          <p className="text-sm font-sans text-secondary leading-relaxed line-clamp-3 mb-6">
            {member.description}
          </p>
        )}
        
        {/* Dummy Social Icons */}
        <div className="mt-auto flex items-center justify-center gap-5">
          {/* LinkedIn Placeholder */}
          <a href="#" className="text-secondary hover:text-accent transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect width="4" height="12" x="2" y="9"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          {/* Instagram Placeholder */}
          <a href="#" className="text-secondary hover:text-accent transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>
          <button
            type="button"
            onClick={() => onOpenDetails?.(member)}
            aria-label={`Open details for ${member.name}`}
            title="Open member details"
            className="inline-flex items-center justify-center text-secondary transition-colors duration-300 hover:text-accent"
          >
            <Star size={20} strokeWidth={1.6} fill="currentColor" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;