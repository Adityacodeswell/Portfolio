import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function ArchiveBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    ["#FFFFFF", "#E8E8E8"]
  );

  return (
    <motion.div 
      ref={ref}
      style={{ backgroundColor }}
      className="h-[50vh] flex items-center justify-center relative overflow-hidden"
    >
      <motion.span 
        style={{ opacity }}
        className="font-mono text-[10px] md:text-xs text-accent font-bold uppercase tracking-[0.3em]"
      >
        [ SYSTEM ARCHIVE COMPLETE // ACCESSING HUMAN OBSERVATIONS ]
      </motion.span>
    </motion.div>
  );
}
