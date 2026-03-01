'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

type DividerVariant = 'aurora' | 'crystal' | 'ember' | 'void' | 'gold';

interface SectionDividerProps {
  variant?: DividerVariant;
  className?: string;
}

const DIVIDER_CONFIGS: Record<DividerVariant, {
  colors: string[];
  blur: string;
  lineColor: string;
}> = {
  aurora: {
    colors: ['rgba(127,255,212,0.12)', 'rgba(140,61,245,0.08)', 'rgba(127,255,212,0.06)'],
    blur: 'blur-[80px]',
    lineColor: 'from-transparent via-atlantean-teal-aqua/20 to-transparent',
  },
  crystal: {
    colors: ['rgba(127,255,212,0.15)', 'rgba(45,133,245,0.1)', 'rgba(127,255,212,0.08)'],
    blur: 'blur-[60px]',
    lineColor: 'from-transparent via-atlantean-teal-aqua/30 to-transparent',
  },
  ember: {
    colors: ['rgba(255,204,51,0.1)', 'rgba(217,41,82,0.08)', 'rgba(255,204,51,0.05)'],
    blur: 'blur-[80px]',
    lineColor: 'from-transparent via-gold-bright/20 to-transparent',
  },
  void: {
    colors: ['rgba(140,61,245,0.1)', 'rgba(127,255,212,0.06)', 'rgba(140,61,245,0.04)'],
    blur: 'blur-[100px]',
    lineColor: 'from-transparent via-creation-prism-purple/20 to-transparent',
  },
  gold: {
    colors: ['rgba(255,204,51,0.12)', 'rgba(255,215,0,0.08)', 'rgba(255,204,51,0.04)'],
    blur: 'blur-[70px]',
    lineColor: 'from-transparent via-gold-bright/25 to-transparent',
  },
};

export function SectionDivider({ variant = 'aurora', className }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const config = DIVIDER_CONFIGS[variant];

  return (
    <div
      ref={ref}
      className={cn('relative h-32 md:h-40 overflow-hidden', className)}
      aria-hidden="true"
    >
      {/* Central nebula glow */}
      <motion.div
        className={cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full', config.blur)}
        style={{ background: `radial-gradient(ellipse, ${config.colors[0]} 0%, ${config.colors[1]} 40%, transparent 70%)` }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Thin luminous line */}
      <motion.div
        className={cn('absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r', config.lineColor)}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
      />

      {/* Orbital accent dots */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: config.colors[0], boxShadow: `0 0 12px ${config.colors[0]}` }} />
      </motion.div>
    </div>
  );
}
