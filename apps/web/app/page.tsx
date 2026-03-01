import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getCollections, getAllTexts } from "@/lib/content";
import {
  HeroV3,
  LogosSection,
  LuminorShowcase,
  FeaturesV2,
  WisdomsSection,
  HowItWorks,
  SocialProof,
  TestimonialsV2,
  PricingSection,
  FAQSection,
  CTASection,
} from "@/components/landing";
import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/navigation/footer";
import {
  PhArrowRight,
  PhBooks,
  PhCircleNotch,
  PhCode,
  PhDatabase,
  PhGraphNetwork,
  PhGraduationCap,
  PhHouse,
  PhLink,
  PhPaintBrush,
  PhSparkle,
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

type ResourceTone = "atlantean" | "gold" | "draconic";

interface ResourceCard {
  href: string;
  icon: JSX.Element;
  title: string;
  description: string;
  highlights: string[];
  tone: ResourceTone;
}

interface EcosystemSurface {
  href: string;
  label: string;
  icon: JSX.Element;
  external?: boolean;
}

const RESOURCE_TONE_STYLES: Record<
  ResourceTone,
  {
    border: string;
    glow: string;
    iconBg: string;
    iconColor: string;
    linkColor: string;
  }
> = {
  atlantean: {
    border: "border-atlantean-teal-aqua/30 hover:border-atlantean-teal-aqua/55",
    glow: "from-atlantean-teal-aqua/20 via-atlantean-teal-aqua/5 to-transparent",
    iconBg: "from-atlantean-teal-aqua/25 to-atlantean-teal-aqua/5",
    iconColor: "text-atlantean-teal-aqua",
    linkColor: "text-atlantean-teal-aqua",
  },
  gold: {
    border: "border-gold-bright/30 hover:border-gold-bright/55",
    glow: "from-gold-bright/20 via-gold-bright/5 to-transparent",
    iconBg: "from-gold-bright/25 to-gold-bright/5",
    iconColor: "text-gold-bright",
    linkColor: "text-gold-bright",
  },
  draconic: {
    border: "border-draconic-crimson/30 hover:border-draconic-crimson/55",
    glow: "from-draconic-crimson/20 via-draconic-crimson/5 to-transparent",
    iconBg: "from-draconic-crimson/25 to-draconic-crimson/5",
    iconColor: "text-draconic-crimson",
    linkColor: "text-draconic-crimson",
  },
};

const ECOSYSTEM_SURFACES: EcosystemSurface[] = [
  {
    href: "/workspace",
    label: "Workspace",
    icon: <PhHouse className="h-4 w-4" />,
  },
  {
    href: "/arcanea-vault",
    label: "Vault Extension",
    icon: <PhDatabase className="h-4 w-4" />,
  },
  {
    href: "/arcanea-code",
    label: "Agent Flow",
    icon: <PhGraphNetwork className="h-4 w-4" />,
  },
  {
    href: "/overlays",
    label: "AI Overlays",
    icon: <PhCode className="h-4 w-4" />,
  },
  {
    href: "/academy",
    label: "Academy",
    icon: <PhGraduationCap className="h-4 w-4" />,
  },
  {
    href: "https://github.com/frankxai/arcanea-onchain",
    label: "On-Chain",
    icon: <PhLink className="h-4 w-4" />,
    external: true,
  },
];

async function HomeContent() {
  const collections = await getCollections();
  const allTexts = await getAllTexts();
  const totalWords = allTexts.reduce(
    (sum, t) => sum + (t.frontmatter.wordCount || 0),
    0,
  );

  const resources: ResourceCard[] = [
    {
      href: "/library",
      icon: <PhBooks className="h-8 w-8" weight="thin" />,
      title: "The Living Library",
      description:
        "Original texts, rituals, and mythic frameworks. Not generic content — a coherent body of practical creative philosophy.",
      highlights: [
        `${collections.length} curated collections`,
        "34 original longform texts",
        "Searchable by creative situation",
      ],
      tone: "atlantean",
    },
    {
      href: "/academy",
      icon: <PhGraduationCap className="h-8 w-8" weight="thin" />,
      title: "Academy",
      description:
        "The Ten Gates map real creative development — from Foundation to Source. A progression system with mythic precision.",
      highlights: [
        "Ten frequencies of mastery",
        "Seven Wisdom diagnostics",
        "Guardian-aligned progression",
      ],
      tone: "gold",
    },
    {
      href: "/studio",
      icon: <PhPaintBrush className="h-8 w-8" weight="thin" />,
      title: "Creation Studio",
      description:
        "Multi-modal creation with Guardian guidance: image, music, worldbuilding, and narrative flows that stay coherent.",
      highlights: [
        "Prompt books and overlays",
        "Visual + narrative workflows",
        "Elemental stylistic control",
      ],
      tone: "draconic",
    },
  ];

  const formattedWords = new Intl.NumberFormat("en-US").format(totalWords);

  return (
    <>
      <HeroV3
        stats={{
          luminors: 16,
          wisdoms: 7,
          collections: collections.length,
          words: totalWords,
        }}
      />
      <LogosSection />
      <SocialProof />
      <FeaturesV2 />
      <LuminorShowcase />
      <WisdomsSection />
      <HowItWorks />
      <TestimonialsV2 />
      <PricingSection />
      <FAQSection />
      <section
        className="relative overflow-hidden border-y border-white/5 py-28"
        aria-labelledby="universe-heading"
      >
        <div className="pointer-events-none absolute inset-0 -z-20 bg-cosmic-void" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-cosmic-mesh opacity-70" />
        <div className="pointer-events-none absolute left-0 top-0 -z-10 h-96 w-96 rounded-full bg-atlantean-teal-aqua/12 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-creation-prism-purple/12 blur-3xl" />

        <div className="mx-auto w-full max-w-7xl px-6">
          <header className="mb-12 text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-atlantean-teal-aqua/25 bg-atlantean-teal-aqua/10 px-4 py-2 font-sans text-xs uppercase tracking-[0.22em] text-atlantean-teal-aqua">
              <PhSparkle className="h-3.5 w-3.5" />
              Explore the universe
            </span>
            <h2 id="universe-heading" className="font-display text-fluid-4xl font-bold text-text-primary">
              One mythology. Multiple worlds.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl font-body text-fluid-base leading-relaxed text-text-secondary">
              The Arcanea experience is layered by design: philosophy in the
              Library, growth in the Academy, and manifestation in the Studio.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-12">
            <Link
              href={resources[0].href}
              className={`group relative overflow-hidden rounded-[2rem] border bg-cosmic-surface/45 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${RESOURCE_TONE_STYLES[resources[0].tone].border} lg:col-span-5`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80 ${RESOURCE_TONE_STYLES[resources[0].tone].glow}`}
              />
              <div className="relative">
                <div
                  className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${RESOURCE_TONE_STYLES[resources[0].tone].iconBg} ${RESOURCE_TONE_STYLES[resources[0].tone].iconColor}`}
                >
                  {resources[0].icon}
                </div>
                <h3 className="mb-3 font-display text-fluid-2xl font-bold text-text-primary">
                  {resources[0].title}
                </h3>
                <p className="mb-6 font-body leading-relaxed text-text-secondary">
                  {resources[0].description}
                </p>
                <ul className="space-y-2">
                  {resources[0].highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="font-sans text-sm text-text-secondary before:mr-2 before:text-atlantean-teal-aqua before:content-['✦']"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
                <span
                  className={`mt-6 inline-flex items-center gap-1 font-sans text-sm font-semibold ${RESOURCE_TONE_STYLES[resources[0].tone].linkColor}`}
                >
                  Enter
                  <PhArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>

            <div className="grid gap-6 md:grid-cols-2 lg:col-span-7">
              {resources.slice(1).map((resource) => {
                const toneStyles = RESOURCE_TONE_STYLES[resource.tone];
                return (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className={`group relative overflow-hidden rounded-3xl border bg-cosmic-surface/35 p-7 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 ${toneStyles.border}`}
                  >
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${toneStyles.glow}`} />
                    <div className="relative">
                      <div
                        className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${toneStyles.iconBg} ${toneStyles.iconColor}`}
                      >
                        {resource.icon}
                      </div>
                      <h3 className="mb-2 font-display text-xl font-bold text-text-primary">
                        {resource.title}
                      </h3>
                      <p className="mb-4 font-body text-sm leading-relaxed text-text-secondary">
                        {resource.description}
                      </p>
                      <ul className="space-y-1.5">
                        {resource.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="font-sans text-xs uppercase tracking-[0.08em] text-text-muted"
                          >
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <span className={`mt-5 inline-flex items-center gap-1 font-sans text-sm font-semibold ${toneStyles.linkColor}`}>
                        Explore
                        <PhArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="glass rounded-2xl border border-white/10 p-5">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
                Collections
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-atlantean-teal-aqua">
                {collections.length}
              </p>
            </div>
            <div className="glass rounded-2xl border border-white/10 p-5">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
                Library words
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-text-primary">
                {formattedWords}
              </p>
            </div>
            <div className="glass rounded-2xl border border-white/10 p-5">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
                Wisdom pathways
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-gold-bright">7</p>
            </div>
            <div className="glass rounded-2xl border border-white/10 p-5">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
                Mastery gates
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-creation-prism-purple">10</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden border-b border-white/5 py-16"
        aria-labelledby="ecosystem-heading"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-cosmic-void" />
        <div className="mx-auto w-full max-w-7xl px-6">
          <header className="mb-8 text-center">
            <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-atlantean-teal-aqua">
              The Ecosystem
            </p>
            <h2 id="ecosystem-heading" className="font-display text-fluid-2xl font-bold text-text-primary">
              A single creative spine across every surface
            </h2>
          </header>

          <div className="flex flex-wrap justify-center gap-3">
            {ECOSYSTEM_SURFACES.map((surface) => {
              const commonClassName =
                "group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-cosmic-surface/40 px-4 py-2 font-sans text-sm text-text-secondary transition-all duration-300 hover:border-atlantean-teal-aqua/40 hover:bg-atlantean-teal-aqua/10 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlantean-teal-aqua/50";

              if (surface.external) {
                return (
                  <a
                    key={surface.href}
                    href={surface.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={commonClassName}
                    aria-label={`${surface.label} (opens in new tab)`}
                  >
                    <span className="text-atlantean-teal-aqua" aria-hidden="true">
                      {surface.icon}
                    </span>
                    {surface.label}
                    <PhArrowRight className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                );
              }

              return (
                <Link key={surface.href} href={surface.href} className={commonClassName}>
                  <span className="text-atlantean-teal-aqua" aria-hidden="true">
                    {surface.icon}
                  </span>
                  {surface.label}
                  <PhArrowRight className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />

      <section className="relative overflow-hidden py-28" aria-label="Arcanea closing statement">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-cosmic-void" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-cosmic-mesh opacity-70" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-atlantean-teal-aqua/10 via-creation-prism-purple/10 to-gold-bright/10 blur-3xl" />

        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-bright/25 bg-gold-bright/10 px-4 py-2 font-sans text-xs uppercase tracking-[0.22em] text-gold-bright">
            <PhSparkle className="h-3.5 w-3.5" />
            The Arcanea Promise
          </span>
          <blockquote className="font-display text-fluid-4xl font-bold leading-tight text-text-primary">
            “Enter seeking, leave transformed, return whenever needed.”
          </blockquote>
          <p className="mx-auto mt-6 max-w-2xl font-body text-fluid-base leading-relaxed text-text-secondary">
            The future is shaped by creators who can hold vision, discipline, and
            wonder in the same breath. Arcanea exists to train exactly that.
          </p>
          <cite className="mt-8 block font-mono text-xs uppercase tracking-[0.24em] text-text-muted">
            — The Library of Arcanea
          </cite>
        </div>
      </section>
    </>
  );
}

// Loading component
function HomeLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-atlantean-teal-aqua/20">
          <PhCircleNotch className="h-8 w-8 animate-spin text-atlantean-teal-aqua" />
        </div>
        <p className="font-body text-text-secondary">Entering the realm...</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="relative left-1/2 right-1/2 min-h-screen w-screen -translate-x-1/2 overflow-x-clip">
      <Navbar />
      <Suspense fallback={<HomeLoading />}>
        <HomeContent />
      </Suspense>
      <Footer />
    </div>
  );
}
