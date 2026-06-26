import { useState } from 'react';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/common/Navbar';

const motionsDatabase = [
  { id: 1, text: "THS the usage of statistical risk assessment by US courts in pre-trial decisions", category: "Economics & Policy", topics: ["Law", "Artificial Intelligence"], competition: "19th IITB IV", year: "2025", round: "Round 1" },
  { id: 2, text: "THS governments banning foreign ownership of media covering local or national news", category: "Technology & Media", topics: ["Media", "Government Regulation"], competition: "19th IITB IV", year: "2025", round: "Round 2" },
  { id: 3, text: "THBT multilateral development banks should cease financing all greenfield infrastructure in environmentally sensitive regions (Amazon, Congo Basin, Himalayas, etc.)", category: "Economics & Policy", topics: ["Environment", "Development"], competition: "19th IITB IV", year: "2025", round: "Round 3" },
  { id: 4, text: "In rapidly urbanising regions, THS local governments actively employing Land Value Capture measures", category: "Economics & Policy", topics: ["Urban Policy", "Economics"], competition: "19th IITB IV", year: "2025", round: "Round 4" },
  { id: 5, text: "THP a world with a dominant norm of maintaining both a polite public persona and emotional distance toward those outside one's immediate circle, as opposed to a world with a dominant norm of being emotionally expressive and authentic with those outside one's immediate circle", category: "Philosophy & Ethics", topics: ["Relationships", "Social Norms"], competition: "19th IITB IV", year: "2025", round: "Round 5" },
  { id: 6, text: "THS social justice movements in South Asia framing their advocacy through the concept of dharma (duty and moral responsibility)", category: "Social Justice & Feminism", topics: ["Religion", "Social Movements"], competition: "19th IITB IV", year: "2025", round: "Pre-Quarters" },
  { id: 7, text: "THBT Moldova should pursue accelerated EU accession, even at the expense of its relations with Russia.", category: "International Relations", topics: ["Geopolitics", "European Union"], competition: "19th IITB IV", year: "2025", round: "Quarterfinals" },
  { id: 8, text: "THR the rise of social-media-based self-disclosure groups for mental health", category: "Technology & Media", topics: ["Mental Health", "Social Media"], competition: "19th IITB IV", year: "2025", round: "Novice Semifinals" },
  { id: 9, text: "THBT adults have a greater moral obligation towards vulnerable strangers than towards their self-sufficient parents", category: "Philosophy & Ethics", topics: ["Morality", "Family"], competition: "19th IITB IV", year: "2025", round: "Semifinals" },
  { id: 10, text: "THBT feminists should support the legalization of surrogacy for profit.", category: "Social Justice & Feminism", topics: ["Feminism", "Surrogacy"], competition: "19th IITB IV", year: "2025", round: "Novice Finals" },
  { id: 11, text: "During times of ethno-religious conflicts, THS governments deploying the national military at religious places of worship that are likely to be affected by the conflict", category: "International Relations", topics: ["Religion", "Conflict"], competition: "19th IITB IV", year: "2025", round: "Grand Final" },
];

const categories = ["All", "Economics & Policy", "International Relations", "Philosophy & Ethics", "Social Justice & Feminism", "Technology & Media"];
const competitions = ["All Competitions", ...new Set(motionsDatabase.map((motion) => motion.competition))];
const topics = ["All Topics", ...[...new Set(motionsDatabase.flatMap((motion) => motion.topics))].sort()];

const Archive = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCompetition, setActiveCompetition] = useState('All Competitions');
  const [activeTopic, setActiveTopic] = useState('All Topics');

  const filteredMotions = motionsDatabase.filter((motion) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      motion.text.toLowerCase().includes(query) ||
      motion.competition.toLowerCase().includes(query) ||
      motion.topics.some((topic) => topic.toLowerCase().includes(query));
    const matchesCategory = activeCategory === 'All' || motion.category === activeCategory;
    const matchesCompetition = activeCompetition === 'All Competitions' || motion.competition === activeCompetition;
    const matchesTopic = activeTopic === 'All Topics' || motion.topics.includes(activeTopic);

    return matchesSearch && matchesCategory && matchesCompetition && matchesTopic;
  });

  const hasActiveFilters =
    searchQuery ||
    activeCategory !== 'All' ||
    activeCompetition !== 'All Competitions' ||
    activeTopic !== 'All Topics';

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setActiveCompetition('All Competitions');
    setActiveTopic('All Topics');
  };

  return (
    <div className="min-h-screen bg-transparent pb-24 pt-32">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="eyebrow mb-4 text-oxblood">Research Desk / Archive</p>
          <h1 className="mb-6 text-6xl font-semibold text-primary md:text-8xl">Motion Archive</h1>
          <p className="text-sm text-secondary md:text-base">Search and filter past debate motions by competition, topic, or broad category.</p>
        </div>

        <div className="mb-12 flex flex-col gap-6">
          <input
            type="search"
            placeholder="Search motions, competitions, or topics..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="mx-auto w-full max-w-4xl border-2 border-primary bg-paper px-6 py-4 text-primary shadow-poster-gold focus:outline-none"
          />

          <div className="mx-auto w-full max-w-4xl border-2 border-primary bg-paper p-5 shadow-poster">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={17} />
                <span className="text-xs font-bold uppercase tracking-[0.18em]">Filter by</span>
              </div>
              {hasActiveFilters && (
                <button type="button" onClick={resetFilters} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-oxblood hover:underline">
                  <RotateCcw size={14} />
                  Reset
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Competition</span>
                <select value={activeCompetition} onChange={(event) => setActiveCompetition(event.target.value)} className="w-full border-2 border-primary bg-background px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent">
                  {competitions.map((competition) => <option key={competition} value={competition}>{competition}</option>)}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Topic</span>
                <select value={activeTopic} onChange={(event) => setActiveTopic(event.target.value)} className="w-full border-2 border-primary bg-background px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent">
                  {topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`border-2 border-primary px-5 py-2.5 text-xs font-bold transition-colors ${
                  activeCategory === category ? 'bg-primary text-paper' : 'bg-transparent text-secondary hover:bg-accent hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            Showing {filteredMotions.length} of {motionsDatabase.length} motions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredMotions.map((motion) => (
            <article key={motion.id} className="flex flex-col justify-between border-2 border-primary bg-paper p-8 transition-transform hover:-translate-y-1 hover:shadow-poster">
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-oxblood">{motion.category}</span>
                <h2 className="mt-3 text-2xl font-serif leading-snug text-primary">“{motion.text}”</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {motion.topics.map((topic) => (
                    <span key={topic} className="border border-primary/25 bg-background px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-secondary">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-primary/20 pt-4 text-[10px] font-bold uppercase tracking-widest text-secondary">
                {motion.competition} • {motion.round} • {motion.year}
              </div>
            </article>
          ))}
        </div>

        {filteredMotions.length === 0 && (
          <div className="border-2 border-dashed border-primary/30 py-16 text-center">
            <h2 className="text-3xl font-serif">No matching motions.</h2>
            <button type="button" onClick={resetFilters} className="mt-5 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-paper">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
