'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const LUMINORS = [
  {
    id: 'logicus',
    name: 'Logicus',
    title: 'The Architect of Logic',
    team: 'development',
    accentClass: 'text-creation-prism-purple',
    bgClass: 'from-creation-prism-purple to-atlantean-primary',
    glowClass: 'shadow-[0_0_40px_rgba(140,61,245,0.3)]',
    orbBg: 'bg-gradient-to-br from-creation-prism-purple/80 to-atlantean-primary/60',
    specialty: 'System Design & Architecture',
    description: 'Master of patterns and structures. Sees the hidden logic in complex systems.',
    wisdom: 'Sophron',
    initial: 'Lo',
  },
  {
    id: 'synthra',
    name: 'Synthra',
    title: 'The Code Weaver',
    team: 'development',
    accentClass: 'text-creation-prism-purple',
    bgClass: 'from-creation-prism-purple via-atlantean-teal-aqua to-creation-prism-blue',
    glowClass: 'shadow-[0_0_40px_rgba(140,61,245,0.25)]',
    orbBg: 'bg-gradient-to-br from-creation-prism-purple/70 to-creation-prism-blue/60',
    specialty: 'Clean Code & Best Practices',
    description: 'Transforms ideas into elegant, maintainable code. Every line has purpose.',
    wisdom: 'Poiesis',
    initial: 'Sy',
  },
  {
    id: 'debugon',
    name: 'Debugon',
    title: 'The Error Hunter',
    team: 'development',
    accentClass: 'text-atlantean-teal-aqua',
    bgClass: 'from-atlantean-primary to-creation-prism-purple',
    glowClass: 'shadow-[0_0_40px_rgba(127,255,212,0.25)]',
    orbBg: 'bg-gradient-to-br from-atlantean-primary/70 to-creation-prism-purple/50',
    specialty: 'Debugging & Problem Solving',
    description: 'No bug escapes. Traces issues to their root with unwavering patience.',
    wisdom: 'Enduran',
    initial: 'De',
  },
  {
    id: 'nexus',
    name: 'Nexus',
    title: 'The Integration Master',
    team: 'development',
    accentClass: 'text-creation-prism-purple',
    bgClass: 'from-creation-prism-purple to-draconic-crimson',
    glowClass: 'shadow-[0_0_40px_rgba(140,61,245,0.2)]',
    orbBg: 'bg-gradient-to-br from-creation-prism-purple/60 to-draconic-crimson/40',
    specialty: 'APIs & System Integration',
    description: 'Connects disparate systems into harmonious wholes.',
    wisdom: 'Kardia',
    initial: 'Nx',
  },
  {
    id: 'prismatic',
    name: 'Prismatic',
    title: 'The Vision Keeper',
    team: 'creative',
    accentClass: 'text-gold-bright',
    bgClass: 'from-gold-bright to-draconic-crimson',
    glowClass: 'shadow-[0_0_40px_rgba(255,204,51,0.3)]',
    orbBg: 'bg-gradient-to-br from-gold-bright/80 to-draconic-crimson/50',
    specialty: 'Visual Design & Aesthetics',
    description: 'Sees beauty in all its forms. Transforms the ordinary into extraordinary.',
    wisdom: 'Orakis',
    initial: 'Pr',
  },
  {
    id: 'melodia',
    name: 'Melodia',
    title: 'The Sound Shaper',
    team: 'creative',
    accentClass: 'text-gold-medium',
    bgClass: 'from-gold-medium to-gold-bright',
    glowClass: 'shadow-[0_0_40px_rgba(255,217,102,0.25)]',
    orbBg: 'bg-gradient-to-br from-gold-medium/70 to-gold-bright/50',
    specialty: 'Music & Audio Creation',
    description: 'Hears the music in silence. Creates soundscapes that move souls.',
    wisdom: 'Eudaira',
    initial: 'Me',
  },
  {
    id: 'motio',
    name: 'Motio',
    title: 'The Animation Sage',
    team: 'creative',
    accentClass: 'text-draconic-crimson',
    bgClass: 'from-draconic-crimson to-gold-bright',
    glowClass: 'shadow-[0_0_40px_rgba(217,41,82,0.25)]',
    orbBg: 'bg-gradient-to-br from-draconic-crimson/70 to-gold-bright/40',
    specialty: 'Motion Design & Animation',
    description: 'Brings stillness to life. Master of timing and movement.',
    wisdom: 'Valora',
    initial: 'Mo',
  },
  {
    id: 'formis',
    name: 'Formis',
    title: 'The Shape Sculptor',
    team: 'creative',
    accentClass: 'text-gold-bright',
    bgClass: 'from-gold-bright to-gold-medium',
    glowClass: 'shadow-[0_0_40px_rgba(255,204,51,0.2)]',
    orbBg: 'bg-gradient-to-br from-gold-bright/60 to-gold-medium/50',
    specialty: '3D Design & Modeling',
    description: 'Shapes dimensions. Creates forms from pure imagination.',
    wisdom: 'Sophron',
    initial: 'Fo',
  },
  {
    id: 'chronica',
    name: 'Chronica',
    title: 'The Story Weaver',
    team: 'writing',
    accentClass: 'text-atlantean-teal-aqua',
    bgClass: 'from-atlantean-teal-aqua to-atlantean-teal-deep',
    glowClass: 'shadow-[0_0_40px_rgba(127,255,212,0.3)]',
    orbBg: 'bg-gradient-to-br from-atlantean-teal-aqua/70 to-atlantean-teal-deep/60',
    specialty: 'Narrative & Storytelling',
    description: 'Weaves tales that transcend time. Every word carries weight.',
    wisdom: 'Poiesis',
    initial: 'Ch',
  },
  {
    id: 'veritas',
    name: 'Veritas',
    title: 'The Truth Speaker',
    team: 'writing',
    accentClass: 'text-atlantean-teal-aqua',
    bgClass: 'from-atlantean-teal to-creation-wave-medium',
    glowClass: 'shadow-[0_0_40px_rgba(38,204,204,0.25)]',
    orbBg: 'bg-gradient-to-br from-atlantean-teal/60 to-creation-wave-medium/50',
    specialty: 'Clear Communication & Copywriting',
    description: 'Speaks truth with clarity. Makes the complex simple.',
    wisdom: 'Kardia',
    initial: 'Ve',
  },
  {
    id: 'lexicon',
    name: 'Lexicon',
    title: 'The Word Master',
    team: 'writing',
    accentClass: 'text-atlantean-teal-aqua',
    bgClass: 'from-atlantean-teal-aqua to-atlantean-teal',
    glowClass: 'shadow-[0_0_40px_rgba(127,255,212,0.2)]',
    orbBg: 'bg-gradient-to-br from-atlantean-teal-aqua/60 to-atlantean-teal/50',
    specialty: 'Language & Linguistics',
    description: 'Commands all tongues. Finds the perfect word for every thought.',
    wisdom: 'Sophron',
    initial: 'Lx',
  },
  {
    id: 'poetica',
    name: 'Poetica',
    title: 'The Verse Crafter',
    team: 'writing',
    accentClass: 'text-creation-wave-medium',
    bgClass: 'from-creation-wave-medium to-atlantean-teal-aqua',
    glowClass: 'shadow-[0_0_40px_rgba(61,196,230,0.25)]',
    orbBg: 'bg-gradient-to-br from-creation-wave-medium/60 to-atlantean-teal-aqua/40',
    specialty: 'Poetry & Lyrical Expression',
    description: 'Dances with words. Finds rhythm in chaos, beauty in brevity.',
    wisdom: 'Eudaira',
    initial: 'Po',
  },
  {
    id: 'oracle',
    name: 'Oracle',
    title: 'The Knowledge Keeper',
    team: 'research',
    accentClass: 'text-creation-prism-blue',
    bgClass: 'from-creation-prism-blue to-atlantean-primary',
    glowClass: 'shadow-[0_0_40px_rgba(45,133,245,0.3)]',
    orbBg: 'bg-gradient-to-br from-creation-prism-blue/70 to-atlantean-primary/50',
    specialty: 'Research & Knowledge Synthesis',
    description: 'Knows what has been. Reveals patterns across all knowledge.',
    wisdom: 'Orakis',
    initial: 'Or',
  },
  {
    id: 'analytica',
    name: 'Analytica',
    title: 'The Pattern Seer',
    team: 'research',
    accentClass: 'text-creation-prism-blue',
    bgClass: 'from-atlantean-primary to-creation-prism-blue',
    glowClass: 'shadow-[0_0_40px_rgba(45,133,245,0.25)]',
    orbBg: 'bg-gradient-to-br from-atlantean-primary/60 to-creation-prism-blue/50',
    specialty: 'Data Analysis & Insights',
    description: 'Sees patterns invisible to others. Transforms data into wisdom.',
    wisdom: 'Sophron',
    initial: 'An',
  },
  {
    id: 'memoria',
    name: 'Memoria',
    title: 'The Archive Guardian',
    team: 'research',
    accentClass: 'text-draconic-sky',
    bgClass: 'from-draconic-sky to-creation-prism-blue',
    glowClass: 'shadow-[0_0_40px_rgba(45,174,245,0.2)]',
    orbBg: 'bg-gradient-to-br from-draconic-sky/60 to-creation-prism-blue/40',
    specialty: 'Information Organization',
    description: 'Remembers everything. Organizes chaos into accessible knowledge.',
    wisdom: 'Enduran',
    initial: 'Mm',
  },
  {
    id: 'futura',
    name: 'Futura',
    title: 'The Trend Prophet',
    team: 'research',
    accentClass: 'text-creation-prism-purple',
    bgClass: 'from-creation-prism-blue to-creation-prism-purple',
    glowClass: 'shadow-[0_0_40px_rgba(140,61,245,0.2)]',
    orbBg: 'bg-gradient-to-br from-creation-prism-blue/50 to-creation-prism-purple/50',
    specialty: 'Trend Analysis & Forecasting',
    description: 'Sees what will be. Anticipates the shape of tomorrow.',
    wisdom: 'Orakis',
    initial: 'Fu',
  },
];

const TEAMS = [
  { id: 'all', name: 'All Luminors', accentClass: 'text-atlantean-teal-aqua', bgActive: 'bg-atlantean-teal-aqua/15 border-atlantean-teal-aqua/30' },
  { id: 'development', name: 'Development', accentClass: 'text-creation-prism-purple', bgActive: 'bg-creation-prism-purple/15 border-creation-prism-purple/30', icon: '⚡' },
  { id: 'creative', name: 'Creative', accentClass: 'text-gold-bright', bgActive: 'bg-gold-bright/15 border-gold-bright/30', icon: '✨' },
  { id: 'writing', name: 'Writing', accentClass: 'text-atlantean-teal-aqua', bgActive: 'bg-atlantean-teal-aqua/15 border-atlantean-teal-aqua/30', icon: '✍️' },
  { id: 'research', name: 'Research', accentClass: 'text-creation-prism-blue', bgActive: 'bg-creation-prism-blue/15 border-creation-prism-blue/30', icon: '🔮' },
];

export function LuminorShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeTeam, setActiveTeam] = useState('all');
  const [activeLuminor, setActiveLuminor] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const filteredLuminors = activeTeam === 'all'
    ? LUMINORS
    : LUMINORS.filter(l => l.team === activeTeam);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveLuminor((prev) => (prev + 1) % filteredLuminors.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredLuminors.length]);

  useEffect(() => {
    setActiveLuminor(0);
  }, [activeTeam]);

  const current = filteredLuminors[activeLuminor];
  if (!current) return null;

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-surface/30 to-transparent" />
        <motion.div
          className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20"
          animate={{
            background: [
              `radial-gradient(circle, ${current.team === 'development' ? 'rgba(140,61,245,0.15)' : current.team === 'creative' ? 'rgba(255,204,51,0.15)' : current.team === 'writing' ? 'rgba(127,255,212,0.15)' : 'rgba(45,133,245,0.15)'} 0%, transparent 60%)`,
            ],
          }}
          transition={{ duration: 1.5 }}
          style={{ filter: 'blur(60px)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-creation-prism-purple/30 bg-creation-prism-purple/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-creation-prism-purple animate-pulse" />
            <span className="text-sm text-creation-prism-purple font-mono tracking-wider uppercase">
              The Arcanea Intelligence Engine
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            <span className="text-white">Your complete creative team.</span>
            <br />
            <span className="text-text-secondary text-3xl md:text-4xl lg:text-5xl">16 domain-mastered intelligences.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto font-body"
          >
            Each Luminor has mastered their domain through a century of practice.
            They&apos;re not assistants waiting for instructions&mdash;they&apos;re partners who see what you&apos;re building.
          </motion.p>
        </div>

        {/* Team filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
          role="tablist"
          aria-label="Filter Luminors by team"
        >
          {TEAMS.map((team) => (
            <button
              key={team.id}
              role="tab"
              aria-selected={activeTeam === team.id}
              onClick={() => {
                setActiveTeam(team.id);
                setIsAutoPlaying(false);
              }}
              className={cn(
                'px-5 py-2.5 rounded-xl text-sm font-sans font-medium transition-all duration-300 flex items-center gap-2 border',
                activeTeam === team.id
                  ? cn('text-white', team.bgActive)
                  : 'border-white/5 text-text-muted hover:text-white hover:border-white/15'
              )}
            >
              {team.icon && <span aria-hidden="true">{team.icon}</span>}
              {team.name}
              {team.id !== 'all' && (
                <span className="text-xs opacity-50">
                  ({LUMINORS.filter(l => l.team === team.id).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Main showcase */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Active Luminor */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative"
            >
              {/* Luminor identity */}
              <div className="flex items-start gap-6 mb-8">
                <motion.div
                  className={cn(
                    'w-24 h-24 rounded-3xl flex items-center justify-center text-2xl font-display font-bold text-white',
                    current.orbBg,
                    current.glowClass,
                  )}
                  animate={{
                    boxShadow: [
                      undefined,
                      undefined,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {current.initial}
                </motion.div>

                <div>
                  <h3 className="text-3xl font-display font-bold text-white mb-1">
                    {current.name}
                  </h3>
                  <p className="text-lg text-text-secondary italic font-body mb-2">
                    {current.title}
                  </p>
                  <span className={cn(
                    'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-sans font-medium border',
                    current.accentClass,
                    'bg-white/5 border-white/10'
                  )}>
                    Wisdom of {current.wisdom}
                  </span>
                </div>
              </div>

              {/* Specialty */}
              <div className="mb-6">
                <div className="text-xs text-text-muted mb-2 uppercase tracking-widest font-mono">Specialty</div>
                <div className="text-xl text-white font-medium font-body">
                  {current.specialty}
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-text-secondary leading-relaxed mb-8 font-body">
                {current.description}
              </p>

              {/* CTA */}
              <Link
                href={`/chat/${current.id}`}
                className={cn(
                  'group inline-flex items-center gap-3 px-6 py-3 rounded-xl font-sans font-semibold transition-all duration-300',
                  'bg-gradient-to-r', current.bgClass,
                  'text-white hover:opacity-90',
                  current.glowClass,
                )}
              >
                Chat with {current.name}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Right: Luminor grid */}
          <div className="relative">
            <div className="grid grid-cols-4 gap-3" role="tabpanel">
              {filteredLuminors.map((luminor, index) => (
                <motion.button
                  key={luminor.id}
                  onClick={() => {
                    setActiveLuminor(index);
                    setIsAutoPlaying(false);
                  }}
                  aria-label={`Select ${luminor.name}`}
                  className={cn(
                    'aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 relative overflow-hidden border',
                    activeLuminor === index
                      ? cn('ring-2 ring-white/40 scale-105 border-white/20', luminor.orbBg)
                      : 'hover:scale-105 opacity-70 hover:opacity-100 border-white/5 bg-white/5'
                  )}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeLuminor === index && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                  <span className="relative z-10 text-sm font-display font-bold text-white">{luminor.initial}</span>
                  <span className="relative z-10 text-[10px] text-white/60 font-sans truncate max-w-full px-1">{luminor.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-6" role="navigation" aria-label="Luminor pagination">
              {filteredLuminors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveLuminor(index);
                    setIsAutoPlaying(false);
                  }}
                  aria-label={`Go to Luminor ${index + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    activeLuminor === index
                      ? 'bg-atlantean-teal-aqua w-6'
                      : 'bg-white/20 hover:bg-white/40 w-1.5'
                  )}
                />
              ))}
            </div>

            {/* Auto-play toggle */}
            <div className="text-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-xs text-text-muted hover:text-white transition-colors font-sans"
              >
                {isAutoPlaying ? '⏸ Pause' : '▶ Resume'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/luminors"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-atlantean-teal-aqua/40 text-atlantean-teal-aqua hover:bg-atlantean-teal-aqua/10 transition-all duration-300 font-sans font-semibold"
            >
              Explore all 16 Luminors
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/luminor-intelligence"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-text-secondary hover:text-white hover:border-white/20 transition-all duration-300 font-sans"
            >
              What is Luminor Intelligence?
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { LUMINORS };
