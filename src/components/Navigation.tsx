import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { label: 'WORK', href: '/#work' },
    { label: 'ABOUT', href: '/#about' },
    { label: 'CONTACT', href: '/#contact' },
  ];

  return (
    <>
      <header id="portfolio-navigation" className="fixed top-0 left-0 w-full z-50 bg-white/90 text-black backdrop-blur-sm transition-all duration-300 px-6 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Mark (Top Left) */}
          <Link
            to="/"
            className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-black select-none hover:opacity-80 transition-opacity"
          >
            A<span className="nav-logo-accent text-[#FF3B30]">.</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <nav className="flex items-center gap-8">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs tracking-widest text-black font-medium hover:text-black transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-1.5 text-black hover:text-black transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
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
