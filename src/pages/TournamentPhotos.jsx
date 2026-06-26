import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { tournamentMedia } from '../data/gallery';

const TournamentPhotos = () => {
  const { id } = useParams();
  const data = tournamentMedia[id];

  if (!data) return <div className="pt-32 text-center">Tournament not found</div>;

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-24">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-serif text-primary mb-12">{data.title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {data.images.map((url, index) => {
            const isVideo = url.endsWith('.mp4');
            return isVideo ? (
              <video
                key={index}
                controls
                preload="metadata"
                className="w-full h-64 object-cover rounded-2xl shadow-sm hover:scale-[1.02] transition-transform duration-300"
              >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                key={index}
                src={url}
                alt={`${data.title} photo ${index + 1}`}
                loading="lazy"
                className="w-full h-64 object-cover rounded-2xl shadow-sm hover:scale-[1.02] transition-transform duration-300"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TournamentPhotos;
