import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Medal, Star, Crown, Mic } from 'lucide-react';

const achievementsData = [
  { icon: <Crown size={32} strokeWidth={1.5} />, title: "Champions", tournament: "Asian Parliamentary Debate", desc: "Secured the gold in a 64-team national circuit, remaining undefeated.", year: "2024" },
  { icon: <Medal size={32} strokeWidth={1.5} />, title: "Best Speaker", tournament: "National Law University Open", desc: "Awarded the best individual speaker out of 200+ participants.", year: "2024" },
  { icon: <Trophy size={32} strokeWidth={1.5} />, title: "Runners Up", tournament: "St. Stephen's Mukharji Memorial", desc: "Reached the grand finals of one of the oldest debate tournaments in the country.", year: "2023" },
  { icon: <Star size={32} strokeWidth={1.5} />, title: "Quarter-finalists", tournament: "World Universities Debating Champ.", desc: "Represented DTU on the global stage against international Ivy League teams.", year: "2023" },
  { icon: <Mic size={32} strokeWidth={1.5} />, title: "Best Adjudicator", tournament: "Delhi University Debate Circuit", desc: "Recognized for exceptional judging accuracy and feedback quality.", year: "2023" }
];

const Achievements = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-primary text-paper">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 mb-12">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="eyebrow mb-4 text-accent">Hall of Fame / 01</motion.p>
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
