import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const Counter = ({ from, to, suffix }) => {
  const nodeRef = useRef();
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2, ease: "easeOut",
        onUpdate(value) { if (nodeRef.current) nodeRef.current.textContent = Math.round(value) + suffix; }
      });
      return () => controls.stop();
    }
  }, [from, to, inView, suffix]);

  return <span ref={nodeRef} className="mb-2 block font-serif text-7xl font-semibold leading-none text-primary md:text-8xl lg:text-9xl">{from}{suffix}</span>;
};

const Impact = () => {
  const stats = [
    { num: 10, suffix: "+", label: "National Competitions" },
    { num: 50, suffix: "+", label: "Active Members" },
    { num: 100, suffix: "+", label: "Archived Motions" },
    { num: 15, suffix: "+", label: "Awards Won" },
  ];

  return (
    <section className="poster-grid relative flex min-h-screen w-full flex-col justify-center border-y-2 border-primary bg-accent px-6 py-24 md:px-12">
      <div className="max-w-7xl mx-auto w-full mb-16 md:mb-20">
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="eyebrow mb-4 text-oxblood">Impact / 02</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }} className="text-6xl font-semibold leading-[0.9] text-primary md:text-8xl">Proof, not <span className="italic text-oxblood">posture.</span></motion.h2>
      </div>
      <div className="mx-auto w-full max-w-7xl border-2 border-primary bg-background shadow-poster">
        <div className="grid grid-cols-2 divide-x-2 divide-y-2 divide-primary lg:grid-cols-4 lg:divide-y-0">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }} className="flex flex-col py-10 px-4 md:px-8 first:pl-0 lg:first:pl-4">
              <Counter from={0} to={stat.num} suffix={stat.suffix} />
              <span className="max-w-[150px] text-xs font-bold uppercase leading-relaxed tracking-[0.16em] text-secondary md:text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
