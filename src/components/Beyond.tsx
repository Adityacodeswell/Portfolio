import { motion, useScroll, useTransform, useMotionTemplate } from 'motion/react';
import { useRef } from 'react';
import { PORTFOLIO_DATA } from '../config/content';

export default function Beyond() {
  const containerRef = useRef<HTMLElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { images } = PORTFOLIO_DATA;

  const interests = [
    { id: '01', title: 'Wrestling', url: images.beyond_01_wrestling, alt: "Wrestling Culture" },
    { id: '02', title: 'Training', url: images.beyond_02_training, alt: "Gym Environment" },
    { id: '03', title: 'Selfgrowth', url: images.beyond_03_exhibitions, alt: "Art Exhibition" },
    { id: '04', title: 'Exhibitions', url: images.beyond_04_storytelling, alt: "Exhibition Detail" }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const x = useTransform(scrollYProgress, [0.3, 1], ["0%", "-55%"]);

  return (
    <section 
      id="beyond"
      ref={containerRef}
      className="relative bg-[#E8E8E8] pt-32 md:pt-48 overflow-hidden"
    >
      {/* 0. Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] pointer-events-none select-none z-0">
        <span 
          style={{ 
            opacity: 0.1,
            WebkitTextStroke: '1px rgba(46, 49, 146, 0.5)',
            color: 'transparent'
          }}
          className="text-[45vw] font-display font-black uppercase leading-none"
        >
          DESIGN
        </span>
      </div>

      {/* 1. Static Intro Section */}
      <div className="max-w-[1800px] mx-auto w-full px-6 mb-24 flex flex-col items-center z-20 relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-9xl font-display font-medium tracking-tighter uppercase leading-[0.8] mb-12 text-center text-ink"
        >
          Beyond <br /><span className="italic font-light text-ink/20">Design</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl font-sans text-ink/70 leading-relaxed max-w-3xl text-center"
        >
          Outside research and systems work, I spend a part of my life around wrestling, physical training, and exhibitions. These experiences continuously shape how I observe movement, discipline, emotion, and human behavior inside the systems I design.
        </motion.p>
      </div>

      {/* 2. Sticky Horizontal Gallery Section */}
      <div className="h-[150vh] relative">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Film Grain Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay z-50"
               style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

          <div className="w-full relative overflow-visible z-10 pt-12 md:pt-20">
            <motion.div 
              ref={targetRef}
              style={{ x }}
              className="flex gap-16 px-[15vw] items-center"
            >
              {interests.map((item, idx) => (
                <InterestCard key={idx} item={item} index={idx} total={interests.length} scrollYProgress={scrollYProgress} />
              ))}
            </motion.div>
          </div>

          {/* 3. Concluding Typographic Layer */}
          <div className="absolute bottom-[10%] left-full w-max pointer-events-none z-0">
            <motion.div
              style={{ x: useTransform(scrollYProgress, [0.3, 1], ["-125%", "-100%"]) }}
              className="whitespace-nowrap"
            >
              <span 
                style={{ 
                  WebkitTextStroke: '1px rgba(18, 18, 18, 1)',
                  color: 'transparent',
                  opacity: 0.05
                }}
                className="text-[18vw] font-display font-black uppercase leading-none select-none block"
              >
                THANKS FOR WATCHING
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface InterestCardProps {
  key?: number | string;
  item: {
    id: string;
    title: string;
    url: string;
    alt: string;
  };
  index: number;
  total: number;
  scrollYProgress: any;
}

function InterestCard({ item, index, total, scrollYProgress }: InterestCardProps) {
  const step = 1 / total;
  const cardCenter = (index + 0.5) / total;
  
  const inputRange = [
    Math.max(0, cardCenter - step), 
    cardCenter, 
    Math.min(1, cardCenter + step)
  ];

  const scale = useTransform(scrollYProgress, inputRange, [1.0, 1.05, 1.0]);
  const grayscale = useTransform(scrollYProgress, inputRange, [100, 0, 100]);
  const brightness = useTransform(scrollYProgress, inputRange, [0.8, 1, 0.8]);
  
  const filter = useMotionTemplate`grayscale(${grayscale}%) brightness(${brightness})`;

  return (
    <motion.div 
      style={{ scale, filter }}
      className="flex-shrink-0 w-[300px] md:w-[500px] aspect-[3/4] relative rounded-[24px] overflow-hidden group cursor-none"
      onMouseEnter={() => {
        window.dispatchEvent(new CustomEvent('updateCursorText', { detail: { text: 'SCROLL' } }));
      }}
      onMouseLeave={() => {
        window.dispatchEvent(new CustomEvent('updateCursorText', { detail: { text: '' } }));
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <img 
        src={item.url} 
        alt={item.alt}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        style={{ imageRendering: 'auto' } as any}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
      <div className="absolute bottom-8 left-8 text-white translate-y-4 group-hover:translate-y-0 transition-all duration-700">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2 block text-accent">Interest // 0{index + 1}</span>
        <h3 className="text-3xl font-display uppercase tracking-tightest">{item.title}</h3>
      </div>
    </motion.div>
  );
}
