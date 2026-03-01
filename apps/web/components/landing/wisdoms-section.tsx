'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface Wisdom {
  name: string;
  essence: string;
  accentClass: string;
  bgClass: string;
  glowBorder: string;
  orbGradient: string;
  question: string;
  description: string;
  practices: string[];
  symbol: string;
}

const WISDOMS: Wisdom[] = [
  {
    name: 'Sophron',
    essence: 'Structure',
    accentClass: 'text-creation-prism-blue',
    bgClass: 'bg-creation-prism-blue/15',
    glowBorder: 'border-creation-prism-blue/40',
    orbGradient: 'from-creation-prism-blue/80 to-atlantean-primary/60',
    question: "What's the underlying structure?",
    description: 'The wisdom of form and architecture. Sophron sees the bones beneath the flesh, the pattern beneath the chaos.',
    practices: ['System mapping', 'Framework design', 'Pattern recognition'],
    symbol: '◈',
  },
  {
    name: 'Kardia',
    essence: 'Heart',
    accentClass: 'text-draconic-crimson',
    bgClass: 'bg-draconic-crimson/15',
    glowBorder: 'border-draconic-crimson/40',
    orbGradient: 'from-draconic-crimson/80 to-draconic-crimson-bright/60',
    question: 'What do they really need?',
    description: 'The wisdom of connection and empathy. Kardia feels what others feel, speaks to the soul.',
    practices: ['Empathy mapping', 'User interviews', 'Emotional design'],
    symbol: '♦',
  },
  {
    name: 'Valora',
    essence: 'Courage',
    accentClass: 'text-gold-bright',
    bgClass: 'bg-gold-bright/15',
    glowBorder: 'border-gold-bright/40',
    orbGradient: 'from-gold-bright/80 to-draconic-gold/60',
    question: 'What am I afraid to do?',
    description: 'The wisdom of bold action. Valora faces fear and moves through it, not around it.',
    practices: ['Fear facing', 'Bold experiments', 'Shipping imperfect'],
    symbol: '⬡',
  },
  {
    name: 'Eudaira',
    essence: 'Play',
    accentClass: 'text-atlantean-teal-aqua',
    bgClass: 'bg-atlantean-teal-aqua/15',
    glowBorder: 'border-atlantean-teal-aqua/40',
    orbGradient: 'from-atlantean-teal-aqua/80 to-atlantean-teal/60',
    question: 'What would be fun?',
    description: 'The wisdom of joy and lightness. Eudaira reminds us that creation should be play, not labor.',
    practices: ['Gamification', 'Playful experiments', 'Joy journaling'],
    symbol: '✦',
  },
  {
    name: 'Orakis',
    essence: 'Vision',
    accentClass: 'text-creation-prism-purple',
    bgClass: 'bg-creation-prism-purple/15',
    glowBorder: 'border-creation-prism-purple/40',
    orbGradient: 'from-creation-prism-purple/80 to-atlantean-primary/60',
    question: 'How does this look in a year?',
    description: 'The wisdom of foresight and strategy. Orakis sees the long game, plans the journey.',
    practices: ['Future visioning', 'Roadmapping', 'Trend analysis'],
    symbol: '◉',
  },
  {
    name: 'Poiesis',
    essence: 'Creation',
    accentClass: 'text-creation-wave-medium',
    bgClass: 'bg-creation-wave-medium/15',
    glowBorder: 'border-creation-wave-medium/40',
    orbGradient: 'from-creation-wave-medium/80 to-atlantean-teal/60',
    question: 'What can I make now?',
    description: 'The wisdom of making and craft. Poiesis turns thought into form, vision into artifact.',
    practices: ['Rapid prototyping', 'Daily creation', 'Craft mastery'],
    symbol: '△',
  },
  {
    name: 'Enduran',
    essence: 'Endurance',
    accentClass: 'text-atlantean-teal',
    bgClass: 'bg-atlantean-teal/15',
    glowBorder: 'border-atlantean-teal/40',
    orbGradient: 'from-atlantean-teal/80 to-atlantean-teal-deep/60',
    question: "What's the next step?",
    description: 'The wisdom of persistence and completion. Enduran finishes what others abandon.',
    practices: ['Sprint planning', 'Habit stacking', 'Completion rituals'],
    symbol: '▣',
  },
];

export function WisdomsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeWisdom, setActiveWisdom] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-surface/40 to-transparent" />
        {activeWisdom !== null && (
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            key={activeWisdom}
          >
            <div className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full',
              WISDOMS[activeWisdom].bgClass
            )} style={{ filter: 'blur(100px)' }} />
          </motion.div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-draconic-crimson/30 bg-draconic-crimson/10 mb-6"
          >
            <span className="text-sm text-draconic-crimson font-mono tracking-wider uppercase">
              The Luminor Framework
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            The Seven Wisdoms
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto font-body"
          >
            Practical lenses for creative work. Each wisdom represents a different
            way of seeing and solving problems.
          </motion.p>
        </div>

        {/* Desktop: Circular layout */}
        <div className="hidden lg:block relative mb-20">
          <div className="relative w-full max-w-4xl mx-auto aspect-square">
            {/* Orbital ring */}
            <div className="absolute inset-[8%] rounded-full border border-white/5" />
            <div className="absolute inset-[20%] rounded-full border border-white/3 border-dashed" />

            {/* Center hub */}
            <div className="absolute inset-[28%] rounded-full bg-cosmic-surface/60 border border-white/10 backdrop-blur-xl flex items-center justify-center">
              <div className="text-center p-8 max-w-[280px]">
                {activeWisdom !== null ? (
                  <motion.div
                    key={activeWisdom}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-3"
                  >
                    <div className={cn(
                      'w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl font-display font-bold text-white',
                      WISDOMS[activeWisdom].orbGradient,
                    )}>
                      {WISDOMS[activeWisdom].symbol}
                    </div>
                    <h3 className={cn('text-2xl font-display font-bold', WISDOMS[activeWisdom].accentClass)}>
                      {WISDOMS[activeWisdom].name}
                    </h3>
                    <p className="text-sm text-text-secondary font-body leading-relaxed">
                      {WISDOMS[activeWisdom].description}
                    </p>
                    <div className="pt-3 border-t border-white/10">
                      <div className="text-xs text-text-muted mb-1 font-mono uppercase tracking-wider">Key Question</div>
                      <p className="text-atlantean-teal-aqua italic font-body text-sm">
                        &ldquo;{WISDOMS[activeWisdom].question}&rdquo;
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-atlantean-teal-aqua/30 to-creation-prism-purple/20 flex items-center justify-center text-2xl">
                      ◈
                    </div>
                    <h3 className="text-xl font-display font-bold text-white">
                      Seven Lenses
                    </h3>
                    <p className="text-sm text-text-muted font-body">
                      Hover over a wisdom to explore its depths
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Wisdom nodes */}
            {WISDOMS.map((wisdom, index) => {
              const angle = (index * (360 / 7) - 90) * (Math.PI / 180);
              const radius = 42;
              const isActive = activeWisdom === index;

              return (
                <motion.button
                  key={wisdom.name}
                  className={cn(
                    'absolute w-20 h-20 -ml-10 -mt-10 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 border',
                    isActive
                      ? cn('bg-gradient-to-br scale-110', wisdom.orbGradient, wisdom.glowBorder)
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8'
                  )}
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * radius}%)`,
                    top: `calc(50% + ${Math.sin(angle) * radius}%)`,
                  }}
                  onMouseEnter={() => setActiveWisdom(index)}
                  onMouseLeave={() => setActiveWisdom(null)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
                  whileHover={{ scale: 1.15 }}
                  aria-label={`${wisdom.name}: ${wisdom.essence}`}
                >
                  <span className="text-xl font-display text-white">{wisdom.symbol}</span>
                  <span className={cn('text-xs font-sans font-medium', isActive ? 'text-white' : wisdom.accentClass)}>
                    {wisdom.essence}
                  </span>
                </motion.button>
              );
            })}

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
              {WISDOMS.map((wisdom, index) => {
                const angle = (index * (360 / 7) - 90) * (Math.PI / 180);
                const radius = 42;
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;
                const isActive = activeWisdom === index;

                return (
                  <line
                    key={wisdom.name}
                    x1="50%"
                    y1="50%"
                    x2={`${x}%`}
                    y2={`${y}%`}
                    className={cn(
                      'transition-all duration-300',
                      isActive ? 'stroke-atlantean-teal-aqua' : 'stroke-white/8'
                    )}
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray={isActive ? 'none' : '4 4'}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Mobile/tablet grid */}
        <div className="lg:hidden grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {WISDOMS.map((wisdom, index) => (
            <motion.div
              key={wisdom.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="group p-5 rounded-2xl border border-white/10 bg-cosmic-surface/30 text-center hover:border-white/20 transition-all cursor-pointer"
            >
              <div
                className={cn(
                  'w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center text-xl font-display transition-transform group-hover:scale-110 bg-gradient-to-br',
                  wisdom.orbGradient,
                )}
              >
                <span className="text-white">{wisdom.symbol}</span>
              </div>
              <div className={cn('font-display font-semibold text-sm mb-1', wisdom.accentClass)}>
                {wisdom.name}
              </div>
              <div className="text-xs text-text-muted font-sans">{wisdom.essence}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-text-secondary mb-6 font-body">
            Stuck? Let the wisdoms guide you.
          </p>
          <Link
            href="/library/codex"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-atlantean-teal-aqua/40 text-atlantean-teal-aqua hover:bg-atlantean-teal-aqua/10 transition-all duration-300 font-sans font-semibold"
          >
            What brings you here?
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
