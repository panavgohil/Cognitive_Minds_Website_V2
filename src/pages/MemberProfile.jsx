import React from "react";
import { useParams, Link } from "react-router-dom";
import { getMemberBySlug } from "../data/members";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function MemberProfile() {
  const { slug } = useParams();
  const member = getMemberBySlug(slug);

  if (!member) {
    return (
      <div className="min-h-screen bg-transparent pt-32 pb-24">
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl font-serif text-primary mb-4">Member Not Found</h1>
          <p className="text-secondary mb-8">The member profile you're looking for doesn't exist.</p>
          <Link to="/competitions" className="inline-block px-6 py-3 bg-primary text-paper rounded-lg hover:bg-accent transition">
            Back to Competitions
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-24">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <Link to="/competitions" className="text-accent hover:text-oxblood transition mb-6 inline-block">
            ← Back to Competitions
          </Link>
          
          <div className="bg-paper border-2 border-primary p-12 rounded-lg">
            <h1 className="text-6xl md:text-8xl font-serif text-primary mb-6">{member.name}</h1>
            
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-widest text-secondary mb-4">Role</h2>
                <p className="text-2xl font-serif text-primary">{member.role}</p>
              </div>
              
              {member.competitions && member.competitions.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-widest text-secondary mb-4">Competitions</h2>
                  <div className="flex flex-wrap gap-2">
                    {member.competitions.map((comp, index) => (
                      <span key={index} className="border-2 border-primary bg-background px-4 py-2 text-sm font-semibold">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-primary/20 pt-8">
              <p className="text-secondary text-lg">
                {member.name} is an accomplished debater and valued member of the Cognitive Minds community. They have participated in multiple competitive circuits and contributed significantly to the society's achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
