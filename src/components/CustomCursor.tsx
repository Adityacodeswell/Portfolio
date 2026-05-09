import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isTechnical, setIsTechnical] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  
  const sx = useSpring(cursorX, springConfig);
  const sy = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isTechAnchor = target.closest('.group\\/motion');
      setIsTechnical(!!isTechAnchor);

      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('.group') ||
        isTechAnchor ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleUpdate = (e: any) => {
      setCursorText(e.detail?.text || '');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('updateCursor', handleUpdate as EventListener);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('updateCursor', handleUpdate as EventListener);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center overflow-hidden"
        animate={{
          scale: isTechnical ? 2 : (cursorText ? 4 : 1),
          backgroundColor: isTechnical ? '#00E5FF' : '#FF3B3B'
        }}
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      >
        {cursorText && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute font-mono text-[2px] font-bold text-white uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
      
      {/* Precision Ring / Snapping Cursor */}
      <motion.div
        className="fixed top-0 left-0 border border-accent/30 rounded-full pointer-events-none z-[9998] flex items-center justify-center"
        animate={{
          width: isTechnical ? 80 : (cursorText ? 80 : (isHovering ? 60 : 0)),
          height: isTechnical ? 80 : (cursorText ? 80 : (isHovering ? 60 : 0)),
          opacity: isHovering || isTechnical || cursorText ? 1 : 0,
          borderColor: isTechnical ? '#00E5FF' : '#FF3B3B77'
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      >
        {cursorText && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="font-mono text-[8px] font-bold text-accent uppercase tracking-tighter">
              {cursorText}
            </span>
          </motion.div>
        )}
        {/* Crosshair lines */}
        {(isHovering || isTechnical) && (
          <>
            <motion.div 
              animate={{ backgroundColor: isTechnical ? '#00E5FF' : '#FF3B3B' }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2" 
            />
            <motion.div 
              animate={{ backgroundColor: isTechnical ? '#00E5FF' : '#FF3B3B' }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2" 
            />
            <motion.div 
              animate={{ backgroundColor: isTechnical ? '#00E5FF' : '#FF3B3B' }}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-2" 
            />
            <motion.div 
              animate={{ backgroundColor: isTechnical ? '#00E5FF' : '#FF3B3B' }}
              className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-2" 
            />
          </>
        )}
      </motion.div>
    </>
  );
}
