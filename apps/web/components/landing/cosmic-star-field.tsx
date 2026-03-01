'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  hue: number;
}

export function CosmicStarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);
  const scrollRef = useRef(0);

  const initStars = useCallback((width: number, height: number) => {
    const density = Math.min(width * height / 8000, 200);
    const stars: Star[] = [];

    for (let i = 0; i < density; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.7 + 0.1,
        speed: Math.random() * 0.3 + 0.05,
        hue: Math.random() > 0.7 ? 160 : Math.random() > 0.5 ? 270 : 45,
      });
    }

    starsRef.current = stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = document.documentElement.scrollHeight * dpr;
      canvas.style.width = '100%';
      canvas.style.height = `${document.documentElement.scrollHeight}px`;
      ctx.scale(dpr, dpr);
      initStars(window.innerWidth, document.documentElement.scrollHeight);
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let time = 0;
    const animate = () => {
      if (!ctx || !canvas) return;

      const width = window.innerWidth;
      const height = document.documentElement.scrollHeight;

      ctx.clearRect(0, 0, width, height);

      const scroll = scrollRef.current;
      time += 0.005;

      starsRef.current.forEach((star) => {
        const parallaxY = star.y - scroll * star.speed * 0.15;

        const twinkle = prefersReducedMotion
          ? star.opacity
          : star.opacity * (0.6 + 0.4 * Math.sin(time * star.speed * 8 + star.x));

        ctx.beginPath();
        ctx.arc(star.x, parallaxY, star.size, 0, Math.PI * 2);

        const saturation = star.hue === 160 ? 80 : star.hue === 270 ? 60 : 90;
        const lightness = star.hue === 45 ? 70 : 65;
        ctx.fillStyle = `hsla(${star.hue}, ${saturation}%, ${lightness}%, ${twinkle})`;
        ctx.fill();

        if (star.size > 1 && twinkle > 0.5) {
          ctx.beginPath();
          ctx.arc(star.x, parallaxY, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${star.hue}, ${saturation}%, ${lightness}%, ${twinkle * 0.08})`;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
