import { motion } from 'framer-motion';
import cmLogo from '../../assets/logo/cm-logo.jpg'; 

const Hero = () => {
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } } };
  const textVariants = { hidden: { opacity: 0, y: 30, filter: 'blur(10px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } };
  const logoVariants = { hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' }, show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <section className="poster-grid relative min-h-screen w-full overflow-hidden border-b-2 border-primary pt-20">
      <div className="absolute right-[-8rem] top-[18rem] h-[20rem] w-[20rem] rounded-full bg-oxblood sm:right-[-10rem] sm:top-24 sm:h-[28rem] sm:w-[28rem] md:right-[-4rem] md:h-[42rem] md:w-[42rem]" />
      <div className="absolute right-[8%] top-[18%] hidden h-40 w-40 rotate-12 border-2 border-primary bg-accent shadow-poster lg:block" />
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-start gap-8 px-5 py-10 sm:px-6 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-12">
        <div className="lg:col-span-9">
          <motion.p variants={textVariants} className="eyebrow mb-4 text-oxblood sm:mb-6">DTU&apos;s Debating and Personality development society</motion.p>
          <motion.h1 variants={textVariants} className="max-w-6xl font-serif text-[clamp(3.4rem,16vw,10.5rem)] font-semibold leading-[0.82] text-primary sm:text-[clamp(4.2rem,13vw,10.5rem)] sm:leading-[0.76]">
            Cognitive
            <span className="block italic text-oxblood">Minds.</span>
          </motion.h1>
          <motion.div variants={textVariants} className="mt-8 flex max-w-3xl flex-col gap-4 border-l-4 border-accent pl-5 sm:mt-10 sm:gap-6 sm:pl-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-lg text-sm leading-6 text-secondary sm:text-base sm:leading-7 md:text-lg">We turn arguments into architecture and speakers into forces the room cannot ignore.</p>
          </motion.div>
        </div>
        <motion.div variants={logoVariants} className="relative hidden lg:col-span-3 lg:block">
          <div className="relative aspect-square rotate-3 border-2 border-primary bg-paper p-4 shadow-poster">
            <img src={cmLogo} alt="Cognitive Minds logo" className="h-full w-full object-cover grayscale contrast-125" />
            <span className="absolute -bottom-4 -left-4 bg-accent px-4 py-2 text-xs font-bold uppercase tracking-widest">Think / Speak / Challenge</span>
          </div>
        </motion.div>
      </motion.div>
      <div className="overflow-hidden border-t-2 border-primary bg-primary py-3 text-paper">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.25em]">
          {[0, 1].map((copy) => (
            <span key={copy}>Debate • Discourse • Research • Public Speaking • Parliamentary Circuit • Ideas With Consequence • </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
