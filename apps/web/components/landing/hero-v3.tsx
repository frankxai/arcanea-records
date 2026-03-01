"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  X,
  Sparkle,
  Star,
  Lightning,
  CaretDown,
} from "@phosphor-icons/react";

interface HeroV3Props {
  stats: {
    luminors: number;
    wisdoms: number;
    collections: number;
    words: number;
  };
}

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, hasStarted]);

  return { count, start: () => setHasStarted(true) };
}

export function HeroV3({ stats }: HeroV3Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);
  const blur = useTransform(scrollYProgress, [0, 0.4], [0, 10]);

  // Smooth spring for mouse movement
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springX = useSpring(mousePos.x, { stiffness: 50, damping: 20 });
  const springY = useSpring(mousePos.y, { stiffness: 50, damping: 20 });

  // Animated counters — real system numbers, not fabricated metrics
  const gatesCounter = useAnimatedCounter(10, 2500);
  const collectionsCounter = useAnimatedCounter(17, 2500);

  useEffect(() => {
    setIsLoaded(true);
    gatesCounter.start();
    collectionsCounter.start();

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX - innerWidth / 2) / 30,
        y: (e.clientY - innerHeight / 2) / 30,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Advanced Gradient Background */}
        <div className="absolute inset-0 -z-20">
          {/* Base dark with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-cosmic-void via-cosmic-deep to-cosmic-surface/80" />

          {/* Atmospheric Guardian — Shinkami, Source consciousness */}
          <img
            src="/guardians/shinkami-hero.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-[0.06] pointer-events-none mix-blend-luminosity"
          />

          {/* Primary aurora - top sweep */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 120% 80% at 50% -30%, rgba(127,255,212,0.18) 0%, transparent 55%),
                radial-gradient(ellipse 70% 70% at 85% 40%, rgba(140,61,245,0.12) 0%, transparent 55%),
                radial-gradient(ellipse 50% 60% at 15% 75%, rgba(255,204,51,0.08) 0%, transparent 55%),
                radial-gradient(ellipse 90% 40% at 50% 100%, rgba(127,255,212,0.06) 0%, transparent 40%)
              `,
              x: springX,
              y: springY,
            }}
          />

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Subtle grid lines fading from top */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(127,255,212,0.4) 1px, transparent 1px),
                linear-gradient(rgba(127,255,212,0.4) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
              maskImage:
                "radial-gradient(ellipse 80% 50% at 50% 0%, black 20%, transparent 60%)",
            }}
          />

          {/* Deep atmospheric orbs with richer colors */}
          {[
            { size: 350, x: '15%', y: '20%', color: 'rgba(127,255,212,0.07)', dur: 18 },
            { size: 280, x: '75%', y: '15%', color: 'rgba(140,61,245,0.06)', dur: 22 },
            { size: 400, x: '60%', y: '65%', color: 'rgba(255,204,51,0.04)', dur: 25 },
            { size: 220, x: '30%', y: '70%', color: 'rgba(127,255,212,0.05)', dur: 20 },
            { size: 320, x: '85%', y: '55%', color: 'rgba(45,133,245,0.04)', dur: 28 },
            { size: 180, x: '50%', y: '10%', color: 'rgba(255,204,51,0.06)', dur: 16 },
          ].map((orb, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: orb.size,
                height: orb.size,
                left: orb.x,
                top: orb.y,
                background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                filter: "blur(50px)",
              }}
              animate={{
                x: [0, 25, 0, -25, 0],
                y: [0, -18, 0, 18, 0],
                scale: [1, 1.08, 1, 0.92, 1],
              }}
              transition={{
                duration: orb.dur,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Horizon glow — the distant cosmic light */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[40%]"
            style={{
              background: 'linear-gradient(to top, rgba(127,255,212,0.03) 0%, transparent 100%)',
            }}
          />
        </div>

        {/* Main Content */}
        <motion.div
          className="relative max-w-7xl mx-auto px-6 py-32"
          style={{
            y,
            opacity,
            scale,
            filter: blur.get() > 0 ? `blur(${blur.get()}px)` : undefined,
          }}
        >
          <div className="text-center">
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex mb-10"
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple to-atlantean-teal-aqua rounded-full opacity-50 group-hover:opacity-100 blur transition-opacity" />
                <Link
                  href="/luminor-intelligence"
                  className="relative flex items-center gap-3 px-5 py-2.5 rounded-full bg-cosmic-deep border border-white/10"
                >
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-atlantean-teal-aqua opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-atlantean-teal-aqua" />
                  </span>
                  <span className="text-sm font-medium bg-gradient-to-r from-atlantean-teal-aqua to-creation-prism-purple bg-clip-text text-transparent">
                    Living Intelligence
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight leading-[0.9] mb-8">
                <span className="block text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.08)]">Build Your</span>
                <span className="relative inline-block">
                  <motion.span
                    className="relative z-10 bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple via-50% to-gold-bright bg-[length:200%_auto] bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% center", "200% center"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    Universe
                  </motion.span>
                  {/* Animated underline */}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={isLoaded ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <motion.div
                      className="h-full w-full bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple to-gold-bright"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl lg:text-3xl text-text-secondary max-w-4xl mx-auto mb-14 leading-relaxed font-body"
            >
              A mythology-powered creative intelligence system.
              <span className="block text-white/90 font-normal mt-3">
                Ten Guardians. Seven Wisdoms. One framework for mastering the
                creative life.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              {/* Primary CTA */}
              <Link
                href="/chat"
                className="group relative px-10 py-5 rounded-2xl font-semibold text-lg overflow-hidden"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-atlantean-teal-aqua via-atlantean-teal-light to-atlantean-teal-aqua"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "200% 100%" }}
                />
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-atlantean-teal-aqua/50 blur-xl -z-10" />
                <span className="relative z-10 text-cosmic-deep flex items-center gap-2">
                  Enter the Academy
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              {/* Video CTA */}
              <button
                type="button"
                onClick={() => setShowVideo(true)}
                aria-label="Watch Arcanea demo video"
                className="group px-10 py-5 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/5 hover:border-white/30 transition-all flex items-center gap-4"
              >
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-0.5 text-white" />
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-white/30"
                    animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <span className="text-white font-semibold text-lg">
                  Watch Demo
                </span>
              </button>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-atlantean-teal-aqua/10 flex items-center justify-center">
                  <Lightning className="w-5 h-5 text-atlantean-teal-aqua" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">
                    {gatesCounter.count}
                  </div>
                  <div className="text-xs text-text-muted">Gates of Mastery</div>
                </div>
              </div>

              <div className="w-px h-10 bg-white/10 hidden md:block" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-bright/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-gold-bright" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">
                    7
                  </div>
                  <div className="text-xs text-text-muted">Wisdoms</div>
                </div>
              </div>

              <div className="w-px h-10 bg-white/10 hidden md:block" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-creation-prism-purple/10 flex items-center justify-center">
                  <Sparkle className="w-5 h-5 text-creation-prism-purple" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">
                    {collectionsCounter.count}
                  </div>
                  <div className="text-xs text-text-muted">Library Collections</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            type="button"
            aria-label="Scroll down to explore"
            className="flex flex-col items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlantean-teal-aqua rounded-md"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <span className="text-xs text-text-muted uppercase tracking-widest">
              Explore
            </span>
            <CaretDown className="w-5 h-5 text-text-muted" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-cosmic-surface rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowVideo(false)}
                aria-label="Close video"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Placeholder for video - replace with actual video embed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-atlantean-teal-aqua/20 flex items-center justify-center mx-auto mb-4">
                    <Play className="w-10 h-10 text-atlantean-teal-aqua ml-1" />
                  </div>
                  <p className="text-text-secondary">Demo video coming soon</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
