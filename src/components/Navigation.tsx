import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Converts ANY css colour string (rgb, hex, oklch...) to [r, g, b, a] using a 1x1 canvas.
function makeColorReader() {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  return (css: string): [number, number, number, number] => {
    if (!ctx) return [0, 0, 0, 0];
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000000';
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2], d[3] / 255];
  };
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const navLinks = [
    { label: 'WORK', href: '/#work' },
    { label: 'ABOUT', href: '/#about' },
    { label: 'CONTACT', href: '/#contact' },
  ];

  // Look at what is painted directly under the nav bar and pick white or black text.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const readColor = makeColorReader();
    let raf = 0;
    let last = false;

    const measure = () => {
      raf = 0;
      const bar = header.getBoundingClientRect();
      const y = Math.min(window.innerHeight - 1, Math.max(1, bar.top + bar.height / 2));
      const stack = document.elementsFromPoint(window.innerWidth / 2, y);
      let dark = false;
      for (const el of stack) {
        if (header.contains(el)) continue;
        const style = window.getComputedStyle(el);
        if (parseFloat(style.opacity) < 0.5 || style.visibility === 'hidden') continue;
        const [r, g, b, a] = readColor(style.backgroundColor);
        if (a < 0.5) continue;
        dark = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.45;
        break;
      }
      if (dark !== last) {
        last = dark;
        setOnDark(dark);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const poll = window.setInterval(schedule, 400);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearInterval(poll);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        id="portfolio-navigation"
        data-tone={onDark ? 'dark' : 'light'}
        className="fixed top-0 left-0 w-full z-50 bg-transparent transition-colors duration-300 px-6 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Mark (Top Left) */}
          <Link
            to="/"
            className="font-sans font-bold text-2xl md:text-3xl tracking-tight select-none hover:opacity-80 transition-opacity"
          >
            A<span className="nav-logo-accent text-[#FF3B30]">.</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <nav className="flex items-center gap-8">
              {navLinks.map((item) => (
                <a key={item.label} href={item.href} className="text-xs tracking-widest font-medium">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-1.5 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (stays white with black text) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col justify-between px-8 py-8"
          >
            <div className="flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="font-sans font-bold text-2xl tracking-tight text-black"
              >
                A<span className="nav-logo-accent text-[#FF3B30]">.</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-black hover:text-black"
                aria-label="Close navigation menu"
              >
                <X size={26} />
              </button>
            </div>

            <nav className="flex flex-col gap-8 my-auto">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-sans font-bold text-3xl tracking-tight text-black hover:text-[#FF3B30] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="pt-6 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>MUMBAI, IN</span>
              <span>DESIGN RESEARCH × TECH</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
