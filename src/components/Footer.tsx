import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../config/content';

export default function Footer() {
  const { text } = PORTFOLIO_DATA;

  return (
    <footer id="contact" className="px-6 py-12 md:px-12 md:py-24 bg-ink text-bg">
      <div className="max-w-[1800px] mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-[10vw] font-display font-medium tracking-tighter mb-16 md:mb-24 leading-[0.9] md:leading-[0.85]"
        >
          {text.footer_tagline.split('\n').map((line, i) => (
            <span key={i} className={i === 1 ? "italic block font-sans font-light" : "block"}>
              {line}
            </span>
          ))}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 items-end text-left">
          <div className="space-y-4">
             <span className="font-mono text-[10px] uppercase tracking-widest text-bg/40 italic">Social</span>
             <div className="flex flex-col gap-2">
               <a href={text.social_linkedin} target="_blank" rel="noopener noreferrer" className="text-xl hover:italic transition-all duration-300 w-fit">LinkedIn</a>
               <a href={text.social_instagram} target="_blank" rel="noopener noreferrer" className="text-xl hover:italic transition-all duration-300 w-fit">Instagram</a>
               <a href={text.social_behance} target="_blank" rel="noopener noreferrer" className="text-xl hover:italic transition-all duration-300 w-fit">Behance</a>
             </div>
          </div>

          <div className="md:col-span-2 space-y-4">
             <span className="font-mono text-[10px] uppercase tracking-widest text-bg/40 italic">Inquiries</span>
             <a href={`mailto:${text.contact_email}`} className="text-3xl md:text-5xl lg:text-5xl font-display hover:italic truncate block transition-all duration-300 break-all leading-none">
              {text.contact_email}
             </a>
          </div>

          <div className="flex flex-col items-start md:items-end md:text-right gap-6">
             <div className="max-w-[200px]">
               <span className="font-mono text-[10px] uppercase text-bg/20 block mb-1 italic">Status</span>
               <span className="font-mono text-[10px] uppercase text-bg/40 block italic">© 2024 Portfolio of a Scholar-Creator</span>
             </div>
             
             <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-24 h-24 rounded-full bg-accent flex items-center justify-center text-white cursor-none overflow-hidden border-none shadow-2xl flex-shrink-0"
              onMouseEnter={() => {
                window.dispatchEvent(new CustomEvent('updateCursorText', { detail: { text: 'REBOOT' } }));
              }}
              onMouseLeave={() => {
                window.dispatchEvent(new CustomEvent('updateCursorText', { detail: { text: '' } }));
              }}
            >
              <span className="font-mono text-[9px] uppercase font-bold text-center leading-tight z-10 px-4">
                REBOOT SYSTEM
              </span>
              <motion.div 
                initial={{ scale: 0 }}
                whileHover={{ scale: 1.5 }}
                className="absolute inset-0 bg-white/20"
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-2 border border-white/20 rounded-full pointer-events-none" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
