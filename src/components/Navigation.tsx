import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isCaseStudy = location.pathname.startsWith('/project/');
  
  // Determine page title for case studies
  let pageTitle = '';
  if (location.pathname === '/project/trackle') pageTitle = 'RESEARCH_LOG // TRACKLE';
  if (location.pathname === '/project/eco-smart-kiln') pageTitle = 'RESEARCH_LOG // ECO-SMART KILN';
  if (location.pathname === '/project/sahaay') pageTitle = 'RESEARCH_LOG // SAHAAY';
  if (location.pathname === '/project/subsense') pageTitle = 'RESEARCH_LOG // SUBSENSE';
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > window.innerHeight * 0.8) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  });

  const navLinks = ['Work', 'About', 'Contact'];

  const MobileMenu = ({ theme }: { theme: 'light' | 'dark' }) => (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 ${
            theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
          } p-6 h-screen`}
        >
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-6 p-2"
          >
            <X size={32} />
          </button>
          {navLinks.map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="font-display font-medium text-4xl uppercase tracking-tighter"
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (isCaseStudy) {
    return (
      <>
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 px-6 py-4 md:px-12 md:py-6 ${
            hasScrolled ? 'bg-white/70 backdrop-blur-md border-b border-[#E8E8E8]' : 'bg-transparent'
          }`}
        >
          {/* RESPONSIVE FIX: On small screens below 480px, adjust columns to grid-cols-2 and sm:grid-cols-3 to optimize space */}
          <div className="max-w-[1800px] mx-auto grid grid-cols-2 sm:grid-cols-3 items-center">
            {/* Left Anchor: Back Link */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#585CE5] rounded-full animate-pulse" />
              <Link 
                to="/" 
                className="font-mono text-[10px] md:text-[11px] font-bold tracking-widest text-black/60 hover:text-accent transition-colors duration-300"
              >
                ← <span className="hidden md:inline">BACK TO SYSTEM</span><span className="md:hidden">BACK</span>
              </Link>
            </div>

            {/* Center Anchor: Context Title */}
            {/* RESPONSIVE FIX: Change display breakpoint to hidden sm:flex to hide centre title at smaller breakpoints */}
            <div className="hidden sm:flex justify-center">
              <span className="font-mono text-[10px] font-bold text-black/40 tracking-widest whitespace-nowrap">
                {pageTitle || 'CASE_STUDY'}
              </span>
            </div>

            {/* Right Anchor & Toggle */}
            {/* RESPONSIVE FIX: Group mobile menu toggle and desktop links into right-aligned grid column to maintain strict grid structure */}
            <div className="flex justify-end items-center gap-4 md:gap-8">
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 text-black/60"
              >
                <Menu size={20} />
              </button>

              {/* Right Anchor: Global Links */}
              {/* RESPONSIVE FIX: Change gap on right-side nav links to gap-4 md:gap-8 to prevent narrow screen overflow */}
              <div className="hidden md:flex justify-end gap-4 md:gap-8">
                {navLinks.map((item) => (
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
          </div>
        </motion.nav>
        <MobileMenu theme="light" />
      </>
    );
  }

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-6 md:px-12 md:py-8"
      >
        <div className="max-w-[1800px] mx-auto flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="font-display font-semibold text-base md:text-lg tracking-tighter text-white">PORTFOLIO</span>
            <span className="font-mono text-[9px] md:text-[10px] text-white/50 tracking-widest uppercase italic">Design Researcher</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 text-white"
          >
            <Menu size={24} />
          </button>

          {/* RESPONSIVE FIX: Change gap on landing tab links from gap-8 to gap-4 md:gap-8 to prevent link line wraps or overflow on narrow viewports */}
          <div className="hidden md:flex gap-4 md:gap-8 group">
            {navLinks.map((item) => (
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
      <MobileMenu theme="dark" />
    </>
  );
}
