import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const isCaseStudy = location.pathname.startsWith('/project/');
  
  // Determine page title for case studies
  let pageTitle = '';
  if (location.pathname === '/project/trackle') pageTitle = 'RESEARCH_LOG // TRACKLE';
  if (location.pathname === '/project/eco-smart-kiln') pageTitle = 'RESEARCH_LOG // ECO-SMART KILN';
  if (location.pathname === '/project/sahaay') pageTitle = 'RESEARCH_LOG // SAHAAY';
  if (location.pathname === '/project/subsense') pageTitle = 'RESEARCH_LOG // SUBSENSE';
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Threshold calculation for when to show backdrop/border
    // User requested "once the user scrolls past the hero section"
    if (latest > window.innerHeight * 0.8) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  });

  if (isCaseStudy) {
    return (
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 px-6 py-6 md:px-12 ${
          hasScrolled ? 'bg-white/70 backdrop-blur-md border-b border-[#E8E8E8]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto grid grid-cols-3 items-center">
          {/* Left Anchor: Back Link */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#585CE5] rounded-full animate-pulse" />
            <Link 
              to="/" 
              className="font-mono text-[11px] font-bold tracking-widest text-black/60 hover:text-accent transition-colors duration-300"
            >
              ← BACK TO SYSTEM
            </Link>
          </div>

          {/* Center Anchor: Context Title */}
          <div className="flex justify-center">
            <span className="font-mono text-[10px] font-bold text-black/40 tracking-widest whitespace-nowrap">
              {pageTitle || 'CASE_STUDY'}
            </span>
          </div>

          {/* Right Anchor: Global Links */}
          <div className="flex justify-end gap-8">
            {['Work', 'About', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="font-mono text-[10px] font-bold text-black opacity-40 hover:opacity-100 transition-opacity duration-300 tracking-widest uppercase"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-8 md:px-12 pointer-events-none"
    >
      <div className="max-w-[1800px] mx-auto flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col gap-1">
          <span className="font-display font-semibold text-lg tracking-tighter text-white">PORTFOLIO</span>
          <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase italic">Design Researcher</span>
        </div>

        <div className="flex gap-8 group">
          {['Work', 'About', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-mono text-xs text-white/70 hover:text-white transition-colors duration-300 tracking-wider uppercase"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
