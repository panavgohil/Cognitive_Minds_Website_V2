import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const images = [
  {
    src: 'https://res.cloudinary.com/dzb964pqt/image/upload/v1781874820/IMG-20251005-WA0072_aqvz4k.jpg',
    alt: 'Cognitive Minds members at a debating tournament',
  },
  {
    src: 'https://res.cloudinary.com/dzb964pqt/image/upload/v1781874819/IMG-20251005-WA0040_yalosh.jpg',
    alt: 'Debaters representing Cognitive Minds',
  },
  {
    src: 'https://res.cloudinary.com/dzb964pqt/image/upload/v1781874819/20251004_184206_dhwdn2.jpg',
    alt: 'A Cognitive Minds tournament moment',
  },
  {
    src: 'https://res.cloudinary.com/dzb964pqt/image/upload/v1781874621/20251004_180028_gxcxew.jpg',
    alt: 'Members during a debate event',
  },
];

const VisualStory = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-paper px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-5 text-oxblood">
            In the Room
          </p>
          <h2 className="text-5xl font-semibold leading-[0.9] text-primary md:text-7xl">
            More than a <span className="italic text-oxblood">podium.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-secondary">
            The other half is community—researching together, travelling the
            circuit, and learning to hold the room.
          </p>

          <div className="mt-8 flex gap-2" aria-label="Select slideshow image">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={activeIndex === index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeIndex === index ? 'w-10 bg-accent' : 'w-4 bg-primary/15 hover:bg-primary/30'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-8">
          <div
            aria-hidden="true"
            className="absolute -inset-5 -z-10 translate-x-5 translate-y-5 bg-accent"
          />
          <div className="relative aspect-[16/10] overflow-hidden border-2 border-primary bg-primary/10 shadow-poster">
            <AnimatePresence mode="sync">
              <motion.img
                key={images[activeIndex].src}
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                initial={{ opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1.1 }, scale: { duration: 5 } }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualStory;
