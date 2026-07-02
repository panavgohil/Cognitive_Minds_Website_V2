import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Medal, Crown } from 'lucide-react';

const achievementsData = [
  {
    icon: <Crown size={32} strokeWidth={1.5} />,
    title: 'Open Winner',
    tournament: 'IIM Indore 2026 | Asian Parliamentary Debate',
    desc: 'Won the open category.',
    year: '2026',
  },
  {
    icon: <Medal size={32} strokeWidth={1.5} />,
    title: 'Open Semifinalist',
    tournament: 'IIM Indore 2026 | Asian Parliamentary Debate',
    desc: 'Reached the open semifinals.',
    year: '2026',
  },
  {
    icon: <Trophy size={32} strokeWidth={1.5} />,
    title: 'Best Adjudicator',
    tournament: 'IIM Indore 2026 | Asian Parliamentary Debate',
    desc: 'Recognized for strong adjudication in the same circuit.',
    year: '2026',
  },
  {
    icon: <Crown size={32} strokeWidth={1.5} />,
    title: 'Open Semifinalist',
    tournament: 'IIT Kanpur Antaragni 2025 | Asian Parliamentary Debate',
    desc: 'Reached the open semifinals.',
    year: '2025',
  },
  {
    icon: <Medal size={32} strokeWidth={1.5} />,
    title: 'Reserve Break',
    tournament: 'IIT Kanpur Antaragni 2025 | Asian Parliamentary Debate',
    desc: 'Broke as reserve from a highly competitive field.',
    year: '2025',
  },
  {
    icon: <Trophy size={32} strokeWidth={1.5} />,
    title: 'Best Speaker',
    tournament: 'IIT Kanpur Antaragni 2025 | Asian Parliamentary Debate',
    desc: 'Earned Best Speaker recognition for individual performance.',
    year: '2025',
  },
  {
    icon: <Crown size={32} strokeWidth={1.5} />,
    title: 'Winner',
    tournament: 'SVC Socio Speak CD’26',
    desc: 'Awarded first position after competing against 20 teams in a debate on critical thinking and public discourse.',
    year: '2026',
  },
];

const Achievements = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-86%"]);

  return (
    <section ref={targetRef} className="relative h-[380vh] bg-primary text-paper">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 mb-12">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="eyebrow mb-4 text-accent">Hall of Fame</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="max-w-4xl text-6xl font-semibold leading-[0.9] text-paper md:text-8xl">Arguments that became <span className="italic text-accent">history.</span></motion.h2>
        </div>
        <motion.div style={{ x }} className="flex gap-8 px-6 lg:px-12 w-max">
          {achievementsData.map((item, index) => (
            <div key={index} className={`group flex h-[410px] w-[300px] flex-col justify-between border-2 border-paper/30 p-8 transition-all duration-300 md:h-[450px] md:w-[400px] ${index % 2 === 0 ? 'bg-oxblood' : 'bg-paper text-primary'}`}>
              <div>
                <div className="mb-10 flex items-center justify-between text-accent"><span className="text-4xl font-serif italic">0{index + 1}</span>{item.icon}</div>
                <h3 className="mb-3 text-4xl font-semibold leading-none">{item.title}</h3>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] opacity-60">{item.tournament}</p>
                <p className="text-sm leading-7 opacity-70">{item.desc}</p>
              </div>
              <div className="flex items-center justify-between border-t border-current/20 pt-4">
                <span className="text-xs font-bold tracking-widest">{item.year}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-accent">CM / DTU</span>
              </div>
            </div>
          ))}
          <div className="w-[10vw]"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
