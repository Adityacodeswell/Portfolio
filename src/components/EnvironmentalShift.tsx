import { motion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

interface Vertex {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function EnvironmentalShift({ active }: { active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Browsers often require muted to be set programmatically for reliable autoplay
      videoRef.current.muted = true;
      videoRef.current.loop = true;
      
      if (active) {
        videoRef.current.play().catch((err) => {
          console.warn("Video autoplay failed:", err);
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [active]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: active ? 0.5 : 0 }}
      className="absolute inset-0 pointer-events-none z-[-15] overflow-hidden"
    >
      {/* Abstract Particle Background Video */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        onError={(e) => {
          console.warn("Hero background video failed to load");
          const video = e.currentTarget;
          video.style.display = 'none';
        }}
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
      >
        <source src="https://cdn.pixabay.com/video/2021/11/14/95671-645856161_tiny.mp4" type="video/mp4" />
      </video>

      {/* Cyan Technical Grid */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(var(--color-tech) 1px, transparent 1px), linear-gradient(90deg, var(--color-tech) 1px, transparent 1px)', 
             backgroundSize: '80px 80px',
             filter: 'drop-shadow(0 0 3px var(--color-tech))'
           }} 
      />

      {/* Red Scanline Radar Sweep */}
      <motion.div 
        animate={{ y: ['-10%', '110%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-[1px] bg-accent/30 blur-[0.5px] shadow-[0_0_15px_var(--color-accent)] z-10"
      />
      
      {/* Noise / Grain Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </motion.div>
  );
}
