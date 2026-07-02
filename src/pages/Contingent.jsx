import React from "react";
import { useParams, Link } from "react-router-dom";
import { contingents } from "../data/contingents";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function Contingent() {
  const { slug } = useParams();

  const data = contingents[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-transparent pt-32 pb-24">
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl font-serif text-primary">Contingent Not Found</h1>
          <p className="mt-4 text-secondary">The contingent you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-24">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <Link to="/competitions" className="text-accent hover:text-oxblood transition mb-8 inline-block">
          ← Back to Competitions
        </Link>
        
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl font-serif text-primary mb-4">{data.tournament}</h1>
          <p className="text-secondary text-lg">{data.location}</p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-serif text-primary mb-10">Team Members</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.members.map((member, index) => (
              <div 
                key={index} 
                className="border-2 border-primary bg-paper p-8"
              >
                <h3 className="text-2xl font-serif text-primary mb-4">{member.name}</h3>
                <div className="border-t border-primary/20 pt-4">
                  <p className="text-sm uppercase tracking-widest font-bold text-secondary">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
