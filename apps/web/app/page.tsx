import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";
import { getCollections, getAllTexts } from "@/lib/content";
import {
  HeroV3,
  LuminorShowcase,
  FeaturesV2,
  WisdomsSection,
  HowItWorks,
  TestimonialsV2,
  PricingSection,
  FAQSection,
  CTASection,
} from "@/components/landing";
import { CosmicStarField } from "@/components/landing/cosmic-star-field";
import { SectionDivider } from "@/components/landing/section-divider";
import { Navbar } from "@/components/navigation";
import {
  Sparkle,
  ArrowRight,
  CircleNotch,
  Books,
  GraduationCap,
  PaintBrush,
  House,
  Database,
  Graph,
  Code,
  Link as LinkIcon,
} from "@phosphor-icons/react";

export const metadata: Metadata = {
  title: "Arcanea | Build Your Universe",
  description:
    "A mythology-powered creative intelligence system. Ten Guardians. Seven Wisdoms. A Library of 34 original texts. The framework for mastering the creative life.",
  openGraph: {
    title: "Arcanea | Build Your Universe",
    description:
      "A mythology-powered creative intelligence system. Ten Guardians. Seven Wisdoms. A Library of 34 original texts. The framework for mastering the creative life.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcanea | Build Your Universe",
    description:
      "Ten Guardians. Seven Wisdoms. 34 original texts. The mythology-powered framework for mastering the creative life.",
  },
};

async function HomeContent() {
  const collections = await getCollections();
  const allTexts = await getAllTexts();
  const totalWords = allTexts.reduce(
    (sum, t) => sum + (t.frontmatter.wordCount || 0),
    0,
  );

  const resources = [
    {
      href: "/library",
      icon: <Books className="w-8 h-8 text-atlantean-teal-aqua" weight="thin" />,
      title: "The Library",
      description: `${collections.length} collections — laws, prophecies, meditations, parables. Original philosophy for the creative life.`,
      accentColor: "text-atlantean-teal-aqua",
      glowColor: "group-hover:shadow-[0_0_40px_rgba(127,255,212,0.15)]",
      bgClass: "from-atlantean-teal-aqua/20 to-atlantean-teal-aqua/5",
    },
    {
      href: "/academy",
      icon: <GraduationCap className="w-8 h-8 text-gold-bright" weight="thin" />,
      title: "Academy",
      description:
        "Each Gate unlocks a specific creative capacity — from grounding vision to finding authentic voice. Open all ten to become a Luminor.",
      accentColor: "text-gold-bright",
      glowColor: "group-hover:shadow-[0_0_40px_rgba(255,204,51,0.15)]",
      bgClass: "from-gold-bright/20 to-gold-bright/5",
    },
    {
      href: "/studio",
      icon: <PaintBrush className="w-8 h-8 text-draconic-crimson" weight="thin" />,
      title: "Creation Studio",
      description:
        "Create with Guardian-guided intelligence. Image, music, video, and story — each shaped by elemental archetypes.",
      accentColor: "text-draconic-crimson",
      glowColor: "group-hover:shadow-[0_0_40px_rgba(217,41,82,0.15)]",
      bgClass: "from-draconic-crimson/20 to-draconic-crimson/5",
    },
  ];

  const ecosystemLinks = [
    { href: "/workspace", icon: House, label: "Workspace" },
    { href: "/arcanea-vault", icon: Database, label: "Vault Extension" },
    { href: "/arcanea-code", icon: Graph, label: "Agent Flow" },
    { href: "/overlays", icon: Code, label: "AI Overlays" },
    { href: "/academy", icon: GraduationCap, label: "Academy" },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroV3
        stats={{
          luminors: 16,
          wisdoms: 7,
          collections: collections.length,
          words: totalWords,
        }}
      />

      {/* ── Atmospheric Transition ── */}
      <SectionDivider variant="aurora" />

      {/* Features Section */}
      <FeaturesV2 />

      {/* ── Atmospheric Transition ── */}
      <SectionDivider variant="void" />

      {/* Luminor Showcase */}
      <LuminorShowcase />

      {/* ── Atmospheric Transition ── */}
      <SectionDivider variant="crystal" />

      {/* Seven Wisdoms */}
      <WisdomsSection />

      {/* ── Atmospheric Transition ── */}
      <SectionDivider variant="ember" />

      {/* How It Works */}
      <HowItWorks />

      {/* ── Atmospheric Transition ── */}
      <SectionDivider variant="gold" />

      {/* Testimonials */}
      <TestimonialsV2 />

      {/* ── Atmospheric Transition ── */}
      <SectionDivider variant="aurora" />

      {/* Pricing */}
      <PricingSection />

      {/* ── Atmospheric Transition ── */}
      <SectionDivider variant="void" />

      {/* FAQ */}
      <FAQSection />

      {/* Resources Grid — The Arcanea Universe */}
      <section className="py-28 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-surface/20 to-transparent" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30"
            style={{
              background: 'radial-gradient(ellipse, rgba(140,61,245,0.08) 0%, transparent 60%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 mb-6">
              <Sparkle className="w-3.5 h-3.5 text-brand-primary" />
              <span className="text-xs font-mono tracking-widest uppercase text-brand-primary">
                Explore
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              The Arcanea Universe
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto font-body leading-relaxed">
              A mythology, a library, and an academy. Explore the systems behind the intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {resources.map((resource) => (
              <Link key={resource.href} href={resource.href} className="group">
                <div
                  className={`relative h-full p-8 rounded-3xl border border-white/10 bg-cosmic-surface/30 backdrop-blur-sm hover:border-white/20 hover:bg-cosmic-surface/50 transition-all duration-500 hover:-translate-y-1 ${resource.glowColor}`}
                >
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.1), transparent 60%)",
                    }}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${resource.bgClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {resource.icon}
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-atlantean-teal-aqua transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4 font-body leading-relaxed">
                      {resource.description}
                    </p>
                    <span className="text-sm text-atlantean-teal-aqua font-sans font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Ecosystem strip — integrated */}
          <div className="text-center">
            <p className="text-xs font-mono tracking-[0.35em] uppercase text-atlantean-teal-aqua mb-4">One mythology. Many surfaces.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {ecosystemLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:border-atlantean-teal-aqua/30 hover:bg-atlantean-teal-aqua/5 transition-all text-sm font-sans text-text-secondary hover:text-text-primary"
                  >
                    <Icon className="w-3.5 h-3.5 text-atlantean-teal-aqua" />
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
              <a
                href="https://github.com/frankxai/arcanea-onchain"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:border-atlantean-teal-aqua/30 hover:bg-atlantean-teal-aqua/5 transition-all text-sm font-sans text-text-secondary hover:text-text-primary"
              >
                <LinkIcon className="w-3.5 h-3.5 text-atlantean-teal-aqua" />
                On-Chain
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Atmospheric Transition ── */}
      <SectionDivider variant="gold" />

      {/* Final CTA */}
      <CTASection />

      {/* Quote Section — Atmospheric */}
      <section className="py-32 relative overflow-hidden">
        {/* Deep atmospheric background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-cosmic-deep via-cosmic-void to-cosmic-deep" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-40"
            style={{
              background: 'radial-gradient(ellipse, rgba(127,255,212,0.06) 0%, rgba(140,61,245,0.04) 40%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          {/* Subtle top and bottom borders */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          {/* Decorative marks */}
          <div className="text-atlantean-teal-aqua/30 text-6xl font-display mb-8">&ldquo;</div>

          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-display italic text-text-primary/80 leading-relaxed tracking-tight">
            Enter seeking, leave transformed, return whenever needed.
          </blockquote>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-atlantean-teal-aqua/40" />
            <cite className="text-sm text-text-muted font-mono tracking-widest not-italic uppercase">
              The Library of Arcanea
            </cite>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-atlantean-teal-aqua/40" />
          </div>
        </div>
      </section>
    </>
  );
}

function HomeLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-atlantean-teal-aqua/20 flex items-center justify-center mx-auto mb-6">
          <CircleNotch className="w-8 h-8 text-atlantean-teal-aqua animate-spin" />
        </div>
        <p className="text-text-secondary font-body">Entering the realm...</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="relative min-h-screen">
      {/* Cosmic star field — signature visual element */}
      <CosmicStarField />

      {/* Navigation */}
      <Navbar />

      <main className="relative z-10">
        <Suspense fallback={<HomeLoading />}>
          <HomeContent />
        </Suspense>
      </main>

      {/* Footer — Premium atmospheric */}
      <footer className="relative border-t border-white/5 z-10" aria-label="Site footer">
        {/* Footer atmosphere */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-void via-cosmic-deep to-cosmic-deep" />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20"
            style={{
              background: 'radial-gradient(ellipse, rgba(127,255,212,0.08) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-hidden="true">
                    <defs>
                      <linearGradient id="footerGrad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#7fffd4"/>
                        <stop offset="48%" stopColor="#a78bfa"/>
                        <stop offset="100%" stopColor="#9b59ff"/>
                      </linearGradient>
                      <radialGradient id="footerGlow" cx="50%" cy="35%" r="55%">
                        <stop offset="0%" stopColor="#7fffd4" stopOpacity="0.14"/>
                        <stop offset="100%" stopColor="#7fffd4" stopOpacity="0"/>
                      </radialGradient>
                    </defs>
                    <ellipse cx="20" cy="18" rx="16" ry="14" fill="url(#footerGlow)"/>
                    <path
                      fillRule="evenodd"
                      d="M 4 37 L 4 18 Q 4 4 20 4 Q 36 4 36 18 L 36 37 L 30 37 L 30 19 Q 30 10 20 10 Q 10 10 10 19 L 10 37 Z"
                      fill="url(#footerGrad)"
                    />
                    <rect x="4" y="24" width="32" height="4" rx="2" fill="url(#footerGrad)"/>
                    <circle cx="20" cy="4" r="2.5" fill="#ffffff" opacity="0.75"/>
                  </svg>
                </div>
                <span className="font-display text-xl font-semibold bg-gradient-to-r from-atlantean-teal-aqua to-creation-prism-purple bg-clip-text text-transparent">
                  Arcanea
                </span>
              </div>
              <p className="text-text-secondary max-w-sm mb-8 font-body leading-relaxed">
                The antidote to a terrible future is imagining a good one.
                Ten Guardians. Seven Wisdoms. A living mythology for the age of creation.
              </p>
              <div className="flex gap-3">
                {[
                  {
                    href: "https://github.com/frankxai/arcanea",
                    label: "Arcanea on GitHub",
                    path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                  },
                  {
                    href: "https://twitter.com/arcanea_ai",
                    label: "Arcanea on X",
                    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  },
                  {
                    href: "https://discord.gg/arcanea",
                    label: "Arcanea Discord",
                    path: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
                  },
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in new tab)`}
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Platform links */}
            <nav aria-label="Platform navigation">
              <h4 className="font-display font-semibold mb-5 text-white">Platform</h4>
              <ul className="space-y-3">
                {[
                  { href: "/luminors", label: "Luminors" },
                  { href: "/studio", label: "Studio" },
                  { href: "/library", label: "Library" },
                  { href: "/academy", label: "Academy" },
                  { href: "/bestiary", label: "Bestiary" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-text-muted hover:text-atlantean-teal-aqua transition-colors text-sm font-sans">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Company links */}
            <nav aria-label="Company navigation">
              <h4 className="font-display font-semibold mb-5 text-white">Company</h4>
              <ul className="space-y-3">
                {[
                  { href: "/about", label: "About" },
                  { href: "/hub/updates", label: "Updates" },
                  { href: "/hub", label: "Hub" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-text-muted hover:text-atlantean-teal-aqua transition-colors text-sm font-sans">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href="mailto:hello@arcanea.ai" className="text-text-muted hover:text-atlantean-teal-aqua transition-colors text-sm font-sans">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-muted font-sans">
              &copy; {new Date().getFullYear()} Arcanea. Building the future of creative intelligence.
            </p>
            <div className="flex gap-6 text-sm text-text-muted font-sans">
              <Link href="/privacy" className="hover:text-atlantean-teal-aqua transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-atlantean-teal-aqua transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
