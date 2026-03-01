"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Sparkle } from "@phosphor-icons/react";

const SIGNALS_TOP = [
  "Next.js 16",
  "React 19",
  "Tailwind CSS",
  "Framer Motion",
  "Vercel AI SDK",
  "Supabase",
  "TypeScript Strict",
  "Radix UI",
];

const SIGNALS_BOTTOM = [
  "Guardian Architecture",
  "Ten Gates System",
  "Library Intelligence",
  "Creator Workflows",
  "Arcanean Canon",
  "Glass Morphism",
  "Cosmic Motion",
  "Accessible by default",
];

interface SignalRowProps {
  items: string[];
  reverse?: boolean;
  shouldReduceMotion: boolean;
}

function SignalRow({ items, reverse = false, shouldReduceMotion }: SignalRowProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-cosmic-surface/35 px-4 py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-cosmic-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-cosmic-surface to-transparent" />
      <motion.div
        className="flex min-w-max items-center gap-3"
        animate={
          shouldReduceMotion
            ? undefined
            : reverse
              ? { x: ["-50%", "0%"] }
              : { x: ["0%", "-50%"] }
        }
        transition={{
          duration: reverse ? 34 : 28,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-cosmic-void/70 px-4 py-2 font-sans text-sm text-text-secondary transition-colors hover:border-atlantean-teal-aqua/40 hover:text-text-primary"
          >
            <Sparkle className="h-3.5 w-3.5 text-atlantean-teal-aqua" aria-hidden="true" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function LogosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/5 py-20"
      aria-labelledby="signal-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-cosmic-mesh opacity-60" />
      <div className="pointer-events-none absolute left-1/4 top-10 -z-10 h-64 w-64 rounded-full bg-atlantean-teal-aqua/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-64 w-64 rounded-full bg-creation-prism-purple/10 blur-3xl" />

      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-atlantean-teal-aqua/25 bg-atlantean-teal-aqua/10 px-4 py-2 font-sans text-xs uppercase tracking-[0.22em] text-atlantean-teal-aqua">
            Signal Matrix
          </span>
          <h2 id="signal-heading" className="font-display text-fluid-3xl font-bold text-text-primary">
            Engineered for depth, not templates
          </h2>
          <p className="mx-auto mt-3 max-w-3xl font-body text-text-secondary">
            Arcanea is forged from modern web infrastructure and a mythic creative
            architecture. Every surface you see is connected to a living system.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="space-y-4"
        >
          <SignalRow items={SIGNALS_TOP} shouldReduceMotion={!!shouldReduceMotion} />
          <SignalRow
            items={SIGNALS_BOTTOM}
            reverse
            shouldReduceMotion={!!shouldReduceMotion}
          />
        </motion.div>
      </div>
    </section>
  );
}
