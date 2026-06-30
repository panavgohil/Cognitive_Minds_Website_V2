import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import { image } from 'framer-motion/client';
import { Link } from "react-router-dom";
const pastTournaments = [
  {
    id: 1,
    title: "Venky SVDC Debate",
    date: "",
    location: "",
    format: "",
    status: "Past",
    slug: "venky-svdc-debate",
    image:
      "https://res.cloudinary.com/dazclaitv/image/upload/v1782805145/Screenshot_2026-06-30_at_1.08.58_PM_afa4se.png",
    description: "DTU contingent at Venky SVDC Debate.",
  },
  {
    id: 2,
    title: "IIT Bombay",
    date: "",
    location: "IIT Bombay",
    format: "",
    status: "Past",
    slug: "iit-bombay",
    image:
      "https://res.cloudinary.com/dazclaitv/image/upload/v1782805197/Screenshot_2026-06-30_at_1.09.51_PM_lx0wpd.png",
    description: "DTU contingent at IIT Bombay.",
  },
  {
    id: 3,
    title: "IIT Delhi Conjurers Bout",
    date: "",
    location: "IIT Delhi",
    format: "",
    status: "Past",
    slug: "iit-delhi-conjurers-bout",
    image: "https://res.cloudinary.com/dazclaitv/image/upload/IMG_4598_xoscsx",
    description: "DTU contingent at IIT Delhi Conjurers Bout.",
  },
  {
    id: 4,
    title: "IIT Kanpur",
    date: "",
    location: "IIT Kanpur",
    format: "",
    status: "Past",
    slug: "iit-kanpur",
    image:
      "https://res.cloudinary.com/dazclaitv/image/upload/v1782805261/Screenshot_2026-06-30_at_1.10.53_PM_oncobh.png",
    description: "DTU contingent at IIT Kanpur.",
  },
  {
    id: 5,
    title: "Libertas MUN",
    date: "",
    location: "",
    format: "MUN",
    status: "Past",
    slug: "libertas-mun",
    image: "",
    description: "DTU contingent at Libertas MUN.",
  },
  {
    id: 6,
    title: "IIT ISM Dhanbad",
    date: "",
    location: "IIT ISM Dhanbad",
    format: "",
    status: "Past",
    slug: "iit-ism-dhanbad",
    image:
      "https://res.cloudinary.com/dazclaitv/image/upload/v1782805313/Screenshot_2026-06-30_at_1.11.46_PM_spvsui.png",
    description: "DTU contingent at IIT ISM Dhanbad.",
  },
  {
    id: 7,
    title: "Ramjas",
    date: "",
    location: "Ramjas College",
    format: "",
    status: "Past",
    slug: "ramjas",
    image: "",
    description: "DTU contingent at Ramjas.",
  },
  {
    id: 8,
    title: "UIETD",
    date: "",
    location: "UIETD",
    format: "",
    status: "Past",
    slug: "uietd",
    image: "",
    description: "DTU contingent at UIETD.",
  },
  {
    id: 9,
    title: "IIM Indore",
    date: "",
    location: "IIM Indore",
    format: "",
    status: "Past",
    slug: "iim-indore",
    image:
      "https://res.cloudinary.com/dazclaitv/image/upload/v1782804965/Screenshot_2026-06-30_at_1.05.50_PM_rgq49k.png",
    description: "DTU contingent at IIM Indore.",
  },
  {
    id: 10,
    title: "Maitreyi",
    date: "",
    location: "Maitreyi College",
    format: "",
    status: "Past",
    slug: "maitreyi",
    image:
      "https://res.cloudinary.com/dazclaitv/image/upload/v1782804664/Screenshot_2026-06-30_at_1.00.50_PM_tuzcel.png",
    description: "DTU contingent at Maitreyi.",
  },
  {
    id: 11,
    title: "IGDTUW APD",
    date: "",
    location: "IGDTUW",
    format: "Asian Parliamentary",
    status: "Past",
    slug: "igdtuw-apd",
    image: "",
    description: "DTU contingent at IGDTUW APD.",
  },
  {
    id: 12,
    title: "Maharaja Agrasen",
    date: "",
    location: "Maharaja Agrasen",
    format: "",
    status: "Past",
    slug: "maharaja-agrasen",
    image: "",
    description: "DTU contingent at Maharaja Agrasen.",
  },
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
            Track our Past contingents and review our historical performance
            across national and international circuits.
          </motion.p>
        </div>

        {/* Upcoming Section */}
        <div className="mb-24">
          <div className="flex items-center gap-6 mb-10">
            <h2 className="text-3xl font-serif text-primary">
              Past Tournaments
            </h2>
            <div className="h-[1px] flex-grow bg-primary/10"></div>
          </div>

          <div className="flex flex-col gap-6">
            {pastTournaments.map((tourney, index) => (
              <motion.div
                key={tourney.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/40 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 md:p-8 hover:bg-white/80 transition-colors duration-300 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="w-full md:w-72 flex-shrink-0">
                    <img
                      src={tourney.image}
                      alt={tourney.title}
                      className="w-full h-52 object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest ${tourney.status === "Registration Open" ? "bg-green-100 text-green-700" : "bg-accent/10 text-accent"}`}
                      >
                        {tourney.status}
                      </span>
                      <span className="text-xs font-sans text-secondary font-medium">
                        {tourney.format}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif text-primary mb-4">
                      {tourney.title}
                    </h3>
                    <p className="text-sm font-sans text-secondary leading-relaxed max-w-2xl mb-6">
                      {tourney.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-primary/70 font-medium">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                        {tourney.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {tourney.location}
                      </div>
                    </div>
                    <Link
                      to={`/contingent/${tourney.slug}`}
                      className="inline-block mt-6 px-5 py-2 rounded-lg bg-primary text-white hover:bg-accent transition"
                    >
                      View Contingent →
                    </Link>
                  </div>
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
