import { motion, useAnimationFrame } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  color: string;
}

export default function KineticBackground({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [binaryData, setBinaryData] = useState<string[]>([]);
  
  useEffect(() => {
    // Generate particles for the vortex
    const p: Particle[] = [];
    for (let i = 0; i < 60; i++) {
        p.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 2 + 1,
            angle: Math.random() * Math.PI * 2,
            color: Math.random() > 0.5 ? '#FF3B3B' : '#00E5FF'
        });
    }
    setParticles(p);

    // Generate binary stream lines
    const b: string[] = [];
    for (let i = 0; i < 10; i++) {
      b.push(Array.from({length: 20}, () => Math.round(Math.random())).join(''));
    }
    setBinaryData(b);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: active ? 1 : 0,
        backgroundColor: active ? '#1A1A1B' : 'transparent' 
      }}
      transition={{ duration: 0.3 }}
      className="absolute -inset-x-20 -inset-y-10 scale-110 pointer-events-none -z-10 overflow-hidden rounded-sm"
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }} 
      />

      {/* Binary Waterfall Sidebars */}
      <div className="absolute inset-0 flex justify-between px-4 font-mono text-[6px] text-accent/20 overflow-hidden leading-none pt-4">
        {binaryData.map((line, i) => (
          <motion.div 
            key={i}
            animate={{ y: [0, -100] }}
            transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "linear" }}
          >
            {line.split('').map((char, j) => <div key={j}>{char}</div>)}
          </motion.div>
        ))}
      </div>

      {/* The Central Vortex */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] flex items-center justify-center"
      >
        <div className="w-[400px] h-[400px] bg-gradient-radial from-accent/40 via-tech/10 to-transparent blur-3xl opacity-40 animate-pulse" />
      </motion.div>

      {/* Orbiting Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          animate={active ? {
            rotate: [0, 360],
            scale: [1, 1.5, 0.5, 1],
            opacity: [0.2, 1, 0.2]
          } : {}}
          transition={{ 
            duration: 10 / p.speed, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{
            left: '50%',
            top: '50%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 15px ${p.color}`,
            transformOrigin: `${(p.x - 50) * 4}px ${(p.y - 50) * 4}px`,
          }}
        />
      ))}
    </motion.div>
  );
}
