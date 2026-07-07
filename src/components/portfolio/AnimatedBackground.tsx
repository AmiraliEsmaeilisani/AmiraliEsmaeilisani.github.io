'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
}

const COLORS = {
  electricBlue: '#0066FF',
  persianBlue: '#1C39BB',
  orangeTint: '#FF5E00',
  lineColor: '#1C39BB',
} as const;

const CONNECTION_DISTANCE = 150;
const PARTICLE_COUNT_DESKTOP = 80;
const PARTICLE_COUNT_MOBILE = 40;
const MOBILE_BREAKPOINT = 768;

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function createParticle(width: number, height: number): Particle {
  const isOrange = Math.random() < 0.1;
  const baseColor = isOrange
    ? COLORS.orangeTint
    : Math.random() < 0.5
      ? COLORS.electricBlue
      : COLORS.persianBlue;

  const baseRadius = Math.random() * 1.5 + 1;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: baseRadius,
    baseRadius,
    color: baseColor,
    pulsePhase: Math.random() * Math.PI * 2,
    pulseSpeed: 0.005 + Math.random() * 0.01,
  };
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const dprRef = useRef<number>(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const particleCount = isMobile
      ? PARTICLE_COUNT_MOBILE
      : PARTICLE_COUNT_DESKTOP;

    // Set canvas size
    const setCanvasSize = () => {
      const currentDpr = window.devicePixelRatio || 1;
      dprRef.current = currentDpr;
      canvas.width = window.innerWidth * currentDpr;
      canvas.height = window.innerHeight * currentDpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    setCanvasSize();

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(window.innerWidth, window.innerHeight)
    );

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      const isMobileNow = window.innerWidth < MOBILE_BREAKPOINT;
      const targetCount = isMobileNow
        ? PARTICLE_COUNT_MOBILE
        : PARTICLE_COUNT_DESKTOP;

      // Adjust particle count on resize
      if (particlesRef.current.length > targetCount) {
        particlesRef.current = particlesRef.current.slice(0, targetCount);
      } else if (particlesRef.current.length < targetCount) {
        const additional = Array.from(
          { length: targetCount - particlesRef.current.length },
          () => createParticle(window.innerWidth, window.innerHeight)
        );
        particlesRef.current.push(...additional);
      }

      // Clamp existing particles within new bounds
      for (const p of particlesRef.current) {
        p.x = Math.min(p.x, window.innerWidth);
        p.y = Math.min(p.y, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const particles = particlesRef.current;
      const currentDpr = dprRef.current;
      const displayWidth = canvas.width / currentDpr;
      const displayHeight = canvas.height / currentDpr;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(currentDpr, currentDpr);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Soft bounce off edges
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > displayWidth) {
          p.x = displayWidth;
          p.vx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > displayHeight) {
          p.y = displayHeight;
          p.vy *= -1;
        }

        // Pulse size effect (ease-in-out via sine)
        p.pulsePhase += p.pulseSpeed;
        const pulseFactor = 1 + Math.sin(p.pulsePhase) * 0.3;
        p.radius = p.baseRadius * pulseFactor;

        // Draw particle
        const rgb = hexToRgb(p.color);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
        ctx.fill();
      }

      // Draw connection lines
      const lineRgb = hexToRgb(COLORS.lineColor);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            // Opacity decreases with distance (ease-out feel)
            const opacity = 1 - distance / CONNECTION_DISTANCE;
            // Apply ease-in-out curve to opacity for softer transitions
            const easedOpacity = opacity * opacity * (3 - 2 * opacity);

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${lineRgb.r}, ${lineRgb.g}, ${lineRgb.b}, ${easedOpacity * 0.4})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}