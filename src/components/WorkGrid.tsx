import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { usePageTransition } from './PageTransition';
import { projects } from '../data/projects';
import { PORTFOLIO_DATA } from '../config/content';

interface CardProps {
  key?: string | number;
  project: typeof projects[0];
  idx: number;
}

function Card({ project, idx }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { triggerTransition } = usePageTransition();
  const { images } = PORTFOLIO_DATA;

  const projectImgId = `project_${project.slug.replace(/-/g, '_')}_thumb` as keyof typeof images;
  const displayImage = images[projectImgId] || project.image;

  // Magnetic badge coordinates
  const badgeX = useMotionValue(0);
  const badgeY = useMotionValue(0);
  const springX = useSpring(badgeX, { damping: 20, stiffness: 150 });
  const springY = useSpring(badgeY, { damping: 20, stiffness: 150 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    badgeX.set(x);
    badgeY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    badgeX.set(0);
    badgeY.set(0);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Get absolute center of the click or the explore button
    const x = e.clientX;
    const y = e.clientY;
    triggerTransition(`/project/${project.slug}`, x, y);
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ rotate }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
      // RESPONSIVE FIX: Change staggered grid card offset from md:mt-48 to lg:mt-48 so it only activates on desktop where double-column spacing is balanced and doesn't cause whitespace imbalance on tablets
      className={`group cursor-none relative flex flex-col ${idx % 2 === 1 ? 'lg:mt-48' : ''}`}
    >
      <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-ink mb-10 relative">
        {/* Static Image Base */}
        <motion.img 
          animate={{ 
            opacity: isHovered ? 0.4 : 1, 
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={displayImage} 
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'grayscale-0' : 'grayscale'}`}
        />

        {/* Hover Video Overlay */}
        <video 
          ref={videoRef}
          key={project.video}
          muted 
          loop 
          playsInline
          onCanPlay={(e) => {
            const video = e.currentTarget;
            if (isHovered) video.play().catch(() => {});
          }}
          onError={(e) => {
            console.warn(`Video failed to load for project: ${project.title}`);
            const video = e.currentTarget;
            video.style.display = 'none';
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            filter: project.id === '03' 
              ? (isHovered ? 'grayscale(0%) contrast(110%) brightness(0.9)' : 'grayscale(100%) contrast(150%) brightness(0.5) blur(1px)') 
              : (isHovered ? 'none' : 'grayscale(100%) brightness(0.8) sepia(100%) hue-rotate(-50deg) saturate(600%)') 
          }}
        >
          <source src={project.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute top-6 left-6 font-mono text-[11px] text-white/50 z-10">{project.id}</div>
        
        {/* Cuberto Magnetic Explore Badge */}
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="w-24 h-24 bg-accent rounded-full flex items-center justify-center text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-2xl"
          >
            {project.id === '03' ? 'LOG_03' : 'Explore'}
          </motion.div>
        </motion.div>
      </div>
      
      {/* RESPONSIVE FIX: Prevent card title and category from clipping on narrow mobile screens by removing pr-12 on mobile and applying sm:pr-12 */}
      <div className="flex flex-col gap-4 relative z-10 pr-0 sm:pr-12">
        <div className="flex justify-between items-baseline border-b border-ink/5 pb-4">
          <h3 className="text-3xl md:text-4xl font-display font-medium tracking-tighter uppercase group-hover:text-accent transition-colors duration-300 flex items-center gap-4">
            {project.title}
            {project.id === '03' && (
              <span className="font-mono text-[9px] text-red-600 animate-pulse font-bold tracking-widest border border-red-600/20 px-2 py-0.5 whitespace-nowrap">
                [ STATUS: IN_DEVELOPMENT ]
              </span>
            )}
          </h3>
          <span className="font-mono text-[11px] text-ink/30 font-bold tracking-widest">/ {project.year}</span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40 font-semibold italic">
          {project.category}
        </p>
      </div>
    </motion.div>
  );
}

export default function WorkGrid() {
  return (
    <section id="work" className="px-6 py-24 md:px-12 md:py-48 bg-white overflow-hidden">
      <div className="max-w-[1700px] mx-auto">
        {/* RESPONSIVE FIX: Scale header bottom margin smoothly instead of using oversized mobile defaults (changed from mb-32 md:mb-56 to mb-16 md:mb-32 xl:mb-56) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 xl:mb-56">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 md:mb-0"
          >
             <div className="flex items-center gap-4 mb-6">
               <div className="w-2 h-2 bg-accent rounded-full" />
               <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Field Research Evidence</span>
             </div>
            {/* RESPONSIVE FIX: Add intermediate h2 font sizes sm:text-7xl and lg:text-9xl to smooth layout text scaling */}
            <h2 className="text-6xl sm:text-7xl lg:text-9xl font-display font-medium tracking-tighter uppercase leading-[0.8]">
              System <br/><span className="italic font-light text-ink/20">Outputs_</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-end gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/30 font-bold">Archive [01—04]</span>
            <div className="w-48 h-[2px] bg-accent/20" />
            <p className="font-mono text-[9px] text-ink/20 uppercase tracking-widest italic max-w-[200px] text-right">
              A selection of engineering-led design research projects.
            </p>
          </motion.div>
        </div>

        {/* RESPONSIVE FIX: Smooth gap-y trajectory scaling to avoid aggressive whitespace jumps on medium, large, and extra-large breakpoints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-40 xl:gap-y-64 items-start">
          {projects.map((project, idx) => (
            <Card key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
