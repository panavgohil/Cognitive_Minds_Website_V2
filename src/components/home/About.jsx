import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-oxblood py-24 text-paper md:py-32">
      <div className="graphic-outline pointer-events-none absolute -bottom-10 -right-4 font-serif text-[22vw] font-black leading-none text-paper/10">ABOUT</div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="eyebrow mb-6 text-accent">About</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }} className="text-6xl font-semibold leading-[0.88] text-paper md:text-7xl lg:text-8xl">Built for <span className="italic text-accent">better arguments.</span></motion.h2>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-10 lg:pt-16">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.2 }} className="border-l-4 border-accent pl-6 text-3xl font-serif leading-snug text-paper md:text-4xl">We are DTU&apos;s Debating and Personality development society.</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.3 }} className="flex flex-col gap-6 text-base leading-relaxed text-paper/65 md:text-lg">
              <p>Founded on the principles of intellectual rigor and articulate expression, we cultivate an environment where ideas are challenged, structured, and delivered with absolute precision.</p>
              <p>From dominating national parliamentary circuits to hosting DTU's most prestigious discourse events, our legacy is built on a culture of competitive excellence. We do not just teach you how to speak; we teach you how to think.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
