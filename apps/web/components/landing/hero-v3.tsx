"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CaretDown,
  Play,
  Sparkle,
  X,
  Zap,
} from "@phosphor-icons/react";

interface HeroV3Props {
  stats: {
    luminors: number;
    wisdoms: number;
    collections: number;
    words: number;
  };
}

interface HeroInsight {
  label: string;
  value: string;
}

function useAnimatedCounter(
  target: number,
  shouldReduceMotion: boolean,
  duration: number = 1800,
) {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || !isActive) {
      return;
    }

    let frameId = 0;
    let startTime = 0;

    const tick = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [duration, isActive, shouldReduceMotion, target]);

  return {
    count: shouldReduceMotion ? target : count,
    start: () => setIsActive(true),
  };
}

const HERO_INSIGHTS: HeroInsight[] = [
  { label: "Ten Gates of mastery", value: "174 Hz → 1111 Hz" },
  { label: "Mythology-backed framework", value: "Seven Wisdoms + Ten Guardians" },
  { label: "Built for creators", value: "Story, image, sound, and worldbuilding" },
];

export function HeroV3({ stats }: HeroV3Props) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const [showVideo, setShowVideo] = useState(false);
  const [canHover, setCanHover] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const auraX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.8 });
  const auraY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.8 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.15]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.96]);

  const luminorCounter = useAnimatedCounter(stats.luminors, !!prefersReducedMotion, 1800);
  const wisdomCounter = useAnimatedCounter(stats.wisdoms, !!prefersReducedMotion, 2000);
  const collectionCounter = useAnimatedCounter(stats.collections, !!prefersReducedMotion, 2100);
  const wordsCounter = useAnimatedCounter(stats.words, !!prefersReducedMotion, 2300);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    luminorCounter.start();
    wisdomCounter.start();
    collectionCounter.start();
    wordsCounter.start();
  }, [collectionCounter, isInView, luminorCounter, wisdomCounter, wordsCounter]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hoverQuery = window.matchMedia("(hover: hover)");
    const updateHover = () => setCanHover(hoverQuery.matches);
    updateHover();

    hoverQuery.addEventListener("change", updateHover);
    return () => hoverQuery.removeEventListener("change", updateHover);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !canHover) {
      return;
    }

    const handlePointerMove = (event: MouseEvent) => {
      const x = (event.clientX - window.innerWidth / 2) / 36;
      const y = (event.clientY - window.innerHeight / 2) / 36;
      pointerX.set(x);
      pointerY.set(y);
    };

    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [canHover, pointerX, pointerY, prefersReducedMotion]);

  const wordCountDisplay = new Intl.NumberFormat("en-US").format(wordsCounter.count);

  return (
    <>
      <section
        ref={containerRef}
        className="relative flex min-h-screen items-center overflow-hidden border-b border-white/5 pt-24"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 -z-20 bg-cosmic-deep" />

        <Image
          src="/guardians/shinkami-hero.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="pointer-events-none -z-20 object-cover object-top opacity-10"
        />

        <motion.div
          className="pointer-events-none absolute inset-0 -z-10"
          style={canHover && !prefersReducedMotion ? { x: auraX, y: auraY } : undefined}
        >
          <div className="absolute left-[8%] top-24 h-72 w-72 rounded-full bg-atlantean-teal-aqua/20 blur-3xl" />
          <div className="absolute right-[10%] top-40 h-80 w-80 rounded-full bg-creation-prism-purple/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-gold-bright/10 blur-3xl" />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 -z-10 bg-cosmic-grid opacity-[0.18]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-cosmic-mesh opacity-60" />

        <motion.div
          className="mx-auto grid w-full max-w-7xl gap-12 px-6 pb-20 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
          style={prefersReducedMotion ? undefined : { y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex"
            >
              <Link
                href="/luminor-intelligence"
                className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-atlantean-teal-aqua/30 bg-cosmic-void/80 px-5 py-2.5 font-sans text-sm text-atlantean-teal-aqua transition-all duration-300 hover:border-atlantean-teal-aqua/60 hover:bg-atlantean-teal-aqua/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlantean-teal-aqua/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cosmic-void"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-atlantean-teal-aqua opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-atlantean-teal-aqua" />
                </span>
                Living Intelligence is active
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 26 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mb-7 font-display text-fluid-hero font-bold leading-[0.9]"
            >
              <span className="block text-text-primary">Build your</span>
              <span className="block bg-gradient-to-r from-atlantean-teal-aqua via-creation-prism-purple to-gold-bright bg-clip-text text-transparent">
                Universe
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mb-10 max-w-2xl font-body text-fluid-lg leading-relaxed text-text-secondary"
            >
              Arcanea is a mythology-powered creative intelligence system:
              sixteen Luminors, seven Wisdoms, and a living library that guides
              your next vision from raw spark to embodied form.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.65, delay: 0.24 }}
              className="mb-12 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/chat"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-atlantean-teal-aqua to-atlantean-teal-light px-8 py-4 font-sans text-base font-semibold text-cosmic-void shadow-glow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlantean-teal-aqua/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cosmic-void"
              >
                Enter the Academy
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>

              <button
                type="button"
                onClick={() => setShowVideo(true)}
                aria-label="Watch Arcanea demo"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border border-white/15 bg-cosmic-surface/40 px-8 py-4 font-sans text-base font-semibold text-text-primary transition-all duration-300 hover:border-atlantean-teal-aqua/40 hover:bg-cosmic-surface/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlantean-teal-aqua/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cosmic-void"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 transition-transform duration-300 group-hover:scale-105">
                  <Play className="h-4 w-4 text-atlantean-teal-aqua" weight="fill" aria-hidden="true" />
                </span>
                Watch Demo
              </button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="grid gap-3 text-sm sm:grid-cols-3"
            >
              {HERO_INSIGHTS.map((insight) => (
                <li
                  key={insight.label}
                  className="glass-light rounded-xl border border-white/10 p-3"
                >
                  <p className="mb-1 font-sans text-xs uppercase tracking-[0.22em] text-text-muted">
                    {insight.label}
                  </p>
                  <p className="font-body text-sm text-text-primary">{insight.value}</p>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
            aria-label="Arcanea constellation and live metrics"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-cosmic-surface/45 p-6 backdrop-blur-xl sm:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-atlantean-teal-aqua/10 via-transparent to-creation-prism-purple/15" />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-atlantean-teal-aqua/20"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-creation-prism-purple/20"
                animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 font-sans text-xs uppercase tracking-[0.22em] text-atlantean-teal-aqua">
                    Constellation
                  </p>
                  <h2 className="font-display text-fluid-2xl font-bold text-text-primary">
                    Arcanea is alive
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-gold-bright/30 bg-gold-bright/10 px-3 py-1 font-sans text-xs font-semibold text-gold-bright">
                  <Sparkle className="h-3.5 w-3.5" aria-hidden="true" />
                  Source signal
                </span>
              </div>

              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-atlantean-teal-aqua/25 bg-cosmic-void/60 p-4">
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
                    Luminors
                  </p>
                  <p className="mt-1 font-display text-3xl font-bold text-atlantean-teal-aqua">
                    {luminorCounter.count}
                  </p>
                </div>
                <div className="rounded-2xl border border-gold-bright/25 bg-cosmic-void/60 p-4">
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
                    Wisdoms
                  </p>
                  <p className="mt-1 font-display text-3xl font-bold text-gold-bright">
                    {wisdomCounter.count}
                  </p>
                </div>
                <div className="rounded-2xl border border-creation-prism-purple/30 bg-cosmic-void/60 p-4">
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
                    Collections
                  </p>
                  <p className="mt-1 font-display text-3xl font-bold text-creation-prism-purple">
                    {collectionCounter.count}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-cosmic-void/60 p-4">
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
                    Library words
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-text-primary">
                    {wordCountDisplay}
                  </p>
                </div>
              </div>

              <div className="relative mt-5 rounded-2xl border border-white/10 bg-cosmic-void/60 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg bg-atlantean-teal-aqua/15 p-2">
                    <Zap className="h-4 w-4 text-atlantean-teal-aqua" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
                      Current phase
                    </p>
                    <p className="font-body text-sm leading-relaxed text-text-secondary">
                      Potential → Manifestation → Experience → Evolved Potential
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </motion.div>

        <motion.button
          type="button"
          aria-label="Scroll down to continue"
          className="absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-1 rounded-md p-2 text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlantean-teal-aqua/50"
          animate={prefersReducedMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="font-sans text-xs uppercase tracking-[0.28em]">Explore</span>
          <CaretDown className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      </section>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="hero-video-title"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-cosmic-surface"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowVideo(false)}
                aria-label="Close video dialog"
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-text-primary transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlantean-teal-aqua/50"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="aspect-video w-full bg-cosmic-void/70">
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-atlantean-teal-aqua/15">
                    <Play className="h-10 w-10 text-atlantean-teal-aqua" weight="fill" aria-hidden="true" />
                  </span>
                  <h3 id="hero-video-title" className="font-display text-2xl font-bold text-text-primary">
                    Arcanea Demo Ritual
                  </h3>
                  <p className="max-w-lg font-body text-text-secondary">
                    The cinematic demo module is being prepared. Until then, enter
                    the Academy and begin directly with a Guardian-guided session.
                  </p>
                  <Link
                    href="/chat"
                    onClick={() => setShowVideo(false)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-atlantean-teal-aqua/35 bg-atlantean-teal-aqua/10 px-5 py-2.5 font-sans font-semibold text-atlantean-teal-aqua transition-colors hover:bg-atlantean-teal-aqua/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlantean-teal-aqua/50"
                  >
                    Start now
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
