import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface TransitionContextType {
  triggerTransition: (to: string, originX: number, originY: number) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) throw new Error('usePageTransition must be used within a TransitionProvider');
  return context;
};

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const triggerTransition = (to: string, x: number, y: number) => {
    setOrigin({ x, y });
    setIsTransitioning(true);
    
    // Duration for the expansion
    setTimeout(() => {
      navigate(to);
      // Let the expansion stay for a bit while content loads
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 800);
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scale: 0, x: origin.x, y: origin.y, opacity: 1 }}
            animate={{ scale: 50, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '10vw', // Small starting point
              height: '10vw',
              marginLeft: '-5vw',
              marginTop: '-5vw',
              backgroundColor: 'var(--color-accent)',
              borderRadius: '50%',
              zIndex: 9999,
              pointerEvents: 'none',
              transformOrigin: 'center'
            }}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};
