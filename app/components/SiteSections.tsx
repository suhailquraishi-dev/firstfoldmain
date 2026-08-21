"use client";

/* eslint-disable @next/next/no-img-element */
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check, ChevronDown, Mail, Minus, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, FormEvent, type ReactNode, useState } from "react";
import { faqs, launchCapabilities, logoRail, pricingTiers, processSteps, projects, projectTypes, resourceGuides, sharedBuildIncludes, websiteOutcomes } from "@/lib/content";
import { CtaArrow, FoldGlyph, MotionText, PremiumButton, SectionFrame, StatusBadge, TextCta } from "./UIPrimitives";

type Project = (typeof projects)[number];

const showcaseTemplates = [
  {
    title: "Transaction data intelligence",
    category: "Fintech Infrastructure",
    filters: ["B2B SaaS", "Regulated"],
    image: "/images/showcase/spade.png",
    href: "https://spade.com/?utm_source=landing.gallery",
  },
  {
    title: "Agentic web CMS",
    category: "Headless CMS",
    filters: ["B2B SaaS"],
    image: "/images/showcase/prismic.png",
    href: "https://prismic.io/?utm_source=landing.gallery",
  },
  {
    title: "AI support QA",
    category: "CX Enablement",
    filters: ["B2B SaaS"],
    image: "/images/showcase/solidroad.png",
    href: "https://solidroad.com/?utm_source=landing.gallery",
  },
  {
    title: "Business identity verification",
    category: "Compliance Infrastructure",
    filters: ["Regulated"],
    image: "/images/showcase/duna.png",
    href: "https://duna.com/?utm_source=landing.gallery",
  },
  {
    title: "Secure code sandboxes",
    category: "Developer Infrastructure",
    filters: ["Developer"],
    image: "/images/showcase/daytona.png",
    href: "https://www.daytona.io/?utm_source=landing.gallery",
  },
  {
    title: "Personal wellness companion",
    category: "Consumer Health",
    filters: ["Consumer", "Regulated"],
    image: "/images/showcase/holo.png",
    href: "https://tryholo.com/?utm_source=landing.gallery",
  },
];

const showcaseFilters = ["All", "B2B SaaS", "Developer", "Regulated", "Consumer"];

const pricingFaqs = [
  { question: "Can the scope change after we start?", answer: "Yes, but the impact on timing and plan level is agreed before extra work begins." },
  { question: "Do I need finished copy?", answer: "No. Bring the raw material; writing and structure are part of shaping the website." },
  { question: "Is hosting included?", answer: "Launch support is included. Third-party hosting, domains, and paid services remain in your account." },
  { question: "What happens after launch?", answer: "Every plan includes a support window, with longer and higher-priority support in Plus and Master." },
];

const processDeliverables = [
  "A focused launch brief",
  "Approved structure and first draft",
  "A polished visual direction",
  "A launch-ready revision",
  "Live website and handoff notes",
];

const audienceRows = [
  {
    title: "Founders",
    summary: "From idea to something people can actually use.",
    description:
      "Launching a new business or testing an idea? We help you get the essentials live with the right website, proof, and launch path.",
  },
  {
    title: "AI products",
    summary: "Make the product feel as good as the technology behind it.",
    description:
      "We help AI products launch with clearer positioning, polished product visuals, useful demos, and pages that explain the value without flattening the technology.",
  },
  {
    title: "SaaS teams",
    summary: "Everything you need to ship the next version.",
    description:
      "Whether you are launching V1, a feature, or a repositioning, we shape the website, launch pages, visuals, and supporting assets needed to get it out quickly.",
  },
  {
    title: "Creator-led brands",
    summary: "Turn an audience into a brand.",
    description:
      "For creators launching products, communities, courses, or businesses. We build the digital presence around the launch without making it feel like a generic template.",
  },
  {
    title: "Enterprise GTM",
    summary: "Move faster without waiting on another internal cycle.",
    description:
      "We support GTM teams with focused launch pages, product visuals, sales materials, and execution-heavy web work inside the current brand.",
  },
  {
    title: "Productized services",
    summary: "Package what you do. Make it easier to buy.",
    description:
      "For agencies, consultants, studios, and service businesses turning expertise into a repeatable offer. We help structure, position, and launch it with a sharper website.",
  },
];

const capabilityColumns = [
  {
    title: "Product",
    icon: "product",
    items: ["Offer clarity", "V1 positioning", "Launch pages", "Product visuals", "Demo structure", "Feature stories"],
  },
  {
    title: "Brand",
    icon: "brand",
    items: ["Founder voice", "Visual direction", "Proof language", "Content angles", "Social assets", "Launch narrative"],
  },
  {
    title: "Website",
    icon: "website",
    items: ["Homepage", "Core pages", "Responsive build", "SEO basics", "Animations", "Launch QA"],
  },
  {
    title: "Systems",
    icon: "systems",
    items: ["Reusable sections", "Analytics setup", "Handoff notes", "Iteration map", "Updates", "Post-launch support"],
  },
];
const credsDeckSlides = [
  { title: "Creds slide 1", src: "/images/creds/s1.jpg" },
  { title: "Creds slide 2", src: "/images/creds/s2.jpg" },
  { title: "Creds slide 3", src: "/images/creds/s3.jpg" },
  { title: "Creds slide 4", src: "/images/creds/s4.jpg" },
  { title: "Creds slide 5", src: "/images/creds/s5.jpg" },
];

export function HomePage() {
  return (
    <main className="home-main">
      <Hero />
      <div className="home-scroll-surface">
        <FounderNote />
        <HowWeWorkSection />
        <HomepageBanner />
        <AudienceFitSection />
        <ProcessTeaser />
        <ToolRail />
        <HomePricingSection />
        <TeamSection />
        <FAQAccordion />
      </div>
    </main>
  );
}

export function CredsDeck() {
  return (
    <section className="creds-deck-section" aria-label="FirstFold creds deck preview">
      <div className="creds-deck__copy">
        <h2>Proof, packaged.</h2>
        <PremiumButton href="/contact" secondary>
          View full creds deck
        </PremiumButton>
      </div>
      <div className="creds-deck__rail" aria-hidden="true">
        <div className="creds-deck__track">
          {[...credsDeckSlides, ...credsDeckSlides].map((slide, index) => (
            <figure className="creds-deck__card" key={`${slide.title}-deck-${index}`}>
              <img src={slide.src} alt="" width={1920} height={1080} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const artworkY = useTransform(scrollY, [0, 900], [0, -112]);

  return (
    <section className="hero-shell hero-shell--landing theme-yellow">
      <div className="hero-grid">
        <motion.div className="hero-copy" style={reducedMotion ? undefined : { y: artworkY }}>
          <h1 aria-label="Helping founders raise their next million in funding, revenue, or customers">
            <span className="hero-title-line hero-title-line--sans hero-title-line--ink">Helping</span>
            <span className="hero-title-line hero-title-line--sans hero-title-line--ink">Founders Raise</span>
            <span className="hero-title-line hero-title-line--editorial hero-title-line--orange">Their Next Million</span>
          </h1>
          <p className="hero-subtitle">
            Launch-ready websites for funding, revenue, or first customers — starting in 5–7 days.
          </p>
          <div className="hero-actions">
            <PremiumButton href="/contact" hideArrow>
              Book a Call
            </PremiumButton>
            <PremiumButton href="/pricing" secondary hideArrow>
              Plans at $99
            </PremiumButton>
          </div>
        </motion.div>
        <motion.div className="hero-artwork" aria-hidden="true" style={reducedMotion ? undefined : { y: artworkY }}>
          <img src="/images/hero/firstfold-vision-craft.webp" alt="" width={1341} height={1351} />
        </motion.div>
      </div>
    </section>
  );
}

function ToolRail() {
  const featuredTools = logoRail;

  return (
    <section className="tool-rail-section" aria-label="Tools FirstFold builds with">
      <div className="tool-ui-visual">
        <div className="tool-ui-orbit tool-ui-orbit--outer" />
        <div className="tool-ui-orbit tool-ui-orbit--inner" />
        <div className="tool-ui-center">Our Stack</div>
        {featuredTools.map((logo, index) => (
          <span className={`tool-ui-node ${index < 8 ? "tool-ui-node--outer" : "tool-ui-node--inner"} tool-ui-node--${index}`} key={logo.name} tabIndex={0} aria-label={logo.name}>
            <img src={logo.src} alt="" width={42} height={42} loading="lazy" />
            <span className="tool-ui-node__label" aria-hidden="true">{logo.name}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function HowWeWorkSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleTemplates = activeFilter === "All" ? showcaseTemplates : showcaseTemplates.filter((item) => item.filters.includes(activeFilter));

  return (
    <section className="showcase-section" aria-labelledby="showcase-title">
      <div className="showcase-heading">
        <span className="showcase-eyebrow">Independent website references</span>
        <div>
          <h2 id="showcase-title">
            <MotionText>Patterns we can learn from, not copy.</MotionText>
          </h2>
          <p>These examples help us discuss useful direction, hierarchy, and proof. The work we build for you stays original to your offer.</p>
        </div>
      </div>

      <div className="showcase-filters" aria-label="Template categories">
        {showcaseFilters.map((filter) => (
          <button
            className={activeFilter === filter ? "is-active" : ""}
            type="button"
            aria-pressed={activeFilter === filter}
            key={filter}
            onClick={() => setActiveFilter(filter)}
          >
            <span>{filter}</span>
          </button>
        ))}
      </div>

      <div className="showcase-grid" aria-label="Template library">
        {visibleTemplates.map((item) => (
          <a href={item.href} className="showcase-card" key={item.title} target="_blank" rel="noreferrer">
            <div className="showcase-card__preview">
              <img src={item.image} alt={`${item.title} landing page screenshot`} width={1440} height={900} loading="lazy" />
              <span className="showcase-card__overlay" aria-hidden="true">
                <CtaArrow />
              </span>
            </div>
            <div className="showcase-card__meta">
              <div>
                <span className="showcase-card__source">External reference</span>
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>
              <span className="showcase-card__badge">{item.filters[0]}</span>
            </div>
          </a>
        ))}
      </div>
      <Link href="/work" className="showcase-more-link">
        See FirstFold concept work
        <CtaArrow />
      </Link>
    </section>
  );
}

function HomepageBanner() {
  return (
    <section className="homepage-banner-section" aria-label="Curated website plans">
      <Link href="/pricing" className="homepage-banner-link">
        <picture>
          <source srcSet="/images/homepage-banner-mobile.webp" media="(max-width: 700px)" width={236} height={324} />
          <img src="/images/homepage-banner.webp" alt="Looking for something more curated? Personalized design, priced for founders. Check Our Plans." width={1200} height={400} loading="lazy" />
        </picture>
      </Link>
    </section>
  );
}

function AudienceFitSection() {
  const [openAudienceIndex, setOpenAudienceIndex] = useState<number | null>(null);

  return (
    <section className="audience-fit-section" aria-labelledby="audience-fit-title">
      <div className="audience-fit-copy">
        <h2 id="audience-fit-title">
          <MotionText>Built for the first version that has to work.</MotionText>
        </h2>
        <p>Different launch situations, one website system underneath. Pro, Plus, and Master change the room and support level.</p>
      </div>
      <div className="audience-fit-list" aria-label="Who FirstFold websites are for">
        {audienceRows.map((item, index) => (
          <div className={openAudienceIndex === index ? "audience-fit-row is-open" : "audience-fit-row"} key={item.title}>
            <button
              type="button"
              aria-expanded={openAudienceIndex === index}
              aria-controls={`audience-panel-${index}`}
              id={`audience-trigger-${index}`}
              onClick={() => setOpenAudienceIndex((current) => (current === index ? null : index))}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <span className="audience-fit-row__icon" aria-hidden="true" />
            </button>
            <div
              id={`audience-panel-${index}`}
              role="region"
              aria-labelledby={`audience-trigger-${index}`}
              className="audience-fit-row__panel"
            >
              <div>
                <p>
                  <strong>{item.summary}</strong>
                  <span>{item.description}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingCards({ showProofStrip = false }: { showProofStrip?: boolean }) {
  return (
    <>
      <div className="pricing-preview" aria-label="Website sprint pricing preview">
        {pricingTiers.map((tier) => {
          const isFeatured = tier.name === "Plus";

          return (
            <article
              id={tier.name.toLowerCase()}
              className={[
                "pricing-preview-card",
                isFeatured ? "is-featured" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={tier.name}
            >
              {isFeatured ? (
                <StatusBadge className="pricing-preview-card__popular">
                  <span aria-hidden="true">★</span>
                  Most Popular
                </StatusBadge>
              ) : null}
              <div className="pricing-preview-card__head">
                <div>
                  <h2>{tier.name}</h2>
                  <p className="pricing-preview-card__summary">{tier.summary}</p>
                </div>
                <div className="pricing-preview-card__price-row">
                  <div className="pricing-preview-card__price">
                    <strong>{tier.price}</strong>
                    <div className="pricing-preview-card__meta">
                      <span>{tier.timeline}</span>
                    </div>
                  </div>
                </div>
              </div>
              {"lead" in tier ? <p className="pricing-preview-card__lead">{tier.lead}</p> : null}
              <div className="pricing-inclusion-groups">
                {tier.groups.map((group) => (
                  <div className="pricing-inclusion-group" key={group.label}>
                    <span>{group.label}</span>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>
                          <Check size={15} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <PremiumButton href="/contact" secondary={!isFeatured}>
                {tier.cta}
              </PremiumButton>
            </article>
          );
        })}
      </div>
      {showProofStrip ? (
        <div className="pricing-proof-strip" aria-label="Every sprint includes">
          {["Signal / Orbit / Zero / Mono", "Strategy included", "Design + build", "Launch QA"].map((item) => (
            <span key={item}>
              <Check size={15} aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );
}

function ProcessTeaser() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="process-runway" className="process-runway" aria-labelledby="process-runway-title">
      <header className="process-runway__header">
        <div className="process-runway__intro">
          <span className="process-runway__eyebrow">How we launch</span>
          <h2 id="process-runway-title">
            <MotionText>Strong foundations. A clearer path to launch.</MotionText>
          </h2>
          <p>AI creates speed. Human judgment keeps every screen focused, useful, and ready to ship.</p>
        </div>
        <div className="process-runway__window" aria-label="Typical launch window: 5 to 14 days">
          <span>Typical launch window</span>
          <strong>5–14 days</strong>
        </div>
      </header>

      <div className="process-runway__track">
        <div className="process-runway__rail" aria-hidden="true">
          <motion.span
            initial={reducedMotion ? false : { scaleX: 0 }}
            whileInView={reducedMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <ol className="process-runway__steps">
          {processSteps.map((step, index) => (
            <li key={step.label}>
              <Link href={`/process#launch-step-${index + 1}`} className="process-runway__step">
                <span className="process-runway__number">{String(index + 1).padStart(2, "0")}</span>
                <div className="process-runway__step-top">
                  <span>Stage {index + 1}</span>
                  <strong>{step.time}</strong>
                </div>
                <h3>{step.label}</h3>
                <p>{step.copy}</p>
                <div className="process-runway__deliverable">
                  <span>You leave with</span>
                  <strong>{processDeliverables[index]}</strong>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

    </section>
  );
}

function FounderNote() {
  return (
    <section className="capabilities-section" aria-label="FirstFold capabilities">
      <div className="capabilities-grid">
        {capabilityColumns.map((column) => (
          <article className="capability-column" key={column.title}>
            <h2>{column.title}</h2>
            <ul>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function HomePricingSection() {
  return (
    <section className="home-pricing-section" aria-labelledby="home-pricing-title">
      <div className="home-pricing-header">
        <div className="home-pricing-copy">
          <h2 id="home-pricing-title">
            <MotionText>Choose your plan</MotionText>
          </h2>
          <p>Built for where you are, and where you are going.</p>
        </div>
        <Link href="/contact" className="home-pricing-sales-link">
          Looking for something custom? <strong>Contact us</strong>
          <CtaArrow />
        </Link>
      </div>
      <PricingCards />
    </section>
  );
}

function TeamSection() {
  return (
    <section className="team-section founder-spotlight" aria-labelledby="team-title">
      <figure className="founder-note" aria-labelledby="team-title">
        <div className="founder-note__copy">
          <figcaption className="founder-note__heading">
            <span aria-hidden="true">“</span>
            <h2 id="team-title">Hear from the founder</h2>
          </figcaption>
          <blockquote>
            A lot of founders start with big ambitions, but turning an idea into something real is often the hardest part.
            That’s where we come in—to help them take their first step, and take it right.
          </blockquote>
          <p>- Suhail Quraishi</p>
        </div>
        <div className="founder-note__media" aria-hidden="true">
          <img src="/images/team/founder-note-frame.webp" alt="" width={2032} height={2036} loading="lazy" />
        </div>
      </figure>
    </section>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a href={`/work/${project.slug}`} className={`project-card ${project.accent}`}>
      <div
        className="project-card__visual"
        aria-hidden="true"
        style={
          {
            "--image-x": project.imageX,
            "--image-y": project.imageY,
          } as CSSProperties
        }
      >
        <img
          src={project.image}
          alt=""
          width={1536}
          height={1024}
          loading="lazy"
        />
        <i>FirstFold {project.status}</i>
      </div>
      <div className="project-card__copy">
        <p>{project.status} / {project.type}</p>
        <h2>{project.title}</h2>
        <span>{project.summary}</span>
        <span className="project-card__link">Explore the direction <CtaArrow size={16} /></span>
      </div>
    </a>
  );
}

export function WorkPage() {
  const [filter, setFilter] = useState<(typeof projectTypes)[number]>("All");
  const visible = filter === "All" ? projects : projects.filter((project) => project.type === filter);

  return (
    <main className="page-shell secondary-page">
      <PageHero eyebrow="Concept work" title="Website directions built to make an idea easier to see." copy="These are transparent concept studies, not client case studies. Each one explores how a different founder offer could become a clear, responsive launch system." />
      <div className="filter-bar secondary-filter-bar" role="group" aria-label="Filter concept work by type">
        {projectTypes.map((type) => (
          <button
            key={type}
            type="button"
            className={filter === type ? "is-active" : ""}
            aria-pressed={filter === type}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <p className="work-filter-status" role="status" aria-live="polite">
        {visible.length} website {visible.length === 1 ? "direction" : "directions"} shown.
      </p>
      <div className="project-grid">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}

export function ServicesPage() {
  return (
    <main className="page-shell secondary-page">
      <PageHero
        eyebrow="Websites"
        title="A launch-ready website that makes the offer easier to buy."
        copy="FirstFold shapes the offer, story, design, responsive build, and release path together so your first version is useful from day one."
        actions={<><PremiumButton href="/pricing">See Plans</PremiumButton><PremiumButton href="/contact" secondary>Book a Call</PremiumButton></>}
      />

      <section className="secondary-section secondary-outcomes" aria-labelledby="website-outcomes-title">
        <div className="secondary-section__heading">
          <span>What the website must do</span>
          <h2 id="website-outcomes-title">Clarity first. Proof close behind.</h2>
        </div>
        <div className="secondary-outcome-grid">
          {websiteOutcomes.map((outcome, index) => <article key={outcome.title}><span>0{index + 1}</span><h3>{outcome.title}</h3><p>{outcome.copy}</p></article>)}
        </div>
      </section>

      <section className="secondary-section" aria-labelledby="website-capabilities-title">
        <div className="secondary-section__heading secondary-section__heading--split">
          <div><span>One connected build</span><h2 id="website-capabilities-title">From rough material to a working public site.</h2></div>
          <p>AI creates useful speed in research and drafting. Human judgment owns positioning, hierarchy, visual taste, accuracy, and the decision to ship.</p>
        </div>
        <div className="secondary-capability-grid">
          {launchCapabilities.map((capability, index) => (
            <article key={capability.label}>
              <span>{String(index + 1).padStart(2, "0")} / {capability.label}</span>
              <h3>{capability.title}</h3>
              <p>{capability.copy}</p>
              <ul>{capability.items.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <TextCta href="/process" className="secondary-section__link">See the full process</TextCta>
      </section>

      <section className="secondary-section secondary-plan-fit" aria-labelledby="website-plans-title">
        <div className="secondary-section__heading"><span>Support levels</span><h2 id="website-plans-title">The foundation stays consistent. The room around it grows.</h2></div>
        <div className="secondary-plan-fit__layout">
          <div className="secondary-shared-list"><h3>Every plan includes</h3><ul>{sharedBuildIncludes.map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul></div>
          <div className="secondary-plan-steps">
            {pricingTiers.map((tier, index) => <article key={tier.name}><span>{tier.price} / {tier.timeline}</span><h3>{tier.name}</h3><p>{index === 0 ? "For a focused first version with the essential launch path." : index === 1 ? "For more pages, interaction, analytics, and a longer support window." : "For a broader launch with strategy, advanced interaction, and priority support."}</p><TextCta href={`/pricing#${tier.name.toLowerCase()}`}>See {tier.name}</TextCta></article>)}
          </div>
        </div>
      </section>

      <section className="secondary-section secondary-fit-check" aria-label="Website sprint fit">
        <article className="secondary-fit-check__positive"><div><Check size={18} aria-hidden="true" /><span>Good fit</span></div><h2>You have something real to launch.</h2><p>A product, service, or founder-led offer exists, but the public story and website need to become clearer and more usable.</p></article>
        <article className="secondary-fit-check__negative"><div><Minus size={18} aria-hidden="true" /><span>Not the right fit</span></div><h2>You need a long discovery program first.</h2><p>FirstFold is built for focused launch work, not open-ended transformation, speculative branding, or unsupported outcome promises.</p></article>
      </section>
    </main>
  );
}

export function ProcessPage() {
  return (
    <main className="page-shell secondary-page">
      <PageHero eyebrow="Process" title="Five visible stages. No mystery at the end." copy="The work moves through clear decisions, working screens, and specific review points so you always know what is ready and what needs your input." actions={<><PremiumButton href="/pricing">Choose a Plan</PremiumButton><PremiumButton href="/contact" secondary>Book a Call</PremiumButton></>} />
      <section className="secondary-section secondary-process" aria-labelledby="full-process-title">
        <div className="secondary-section__heading secondary-section__heading--split"><div><span>From first call to live site</span><h2 id="full-process-title">A delivery path built around useful decisions.</h2></div><p>Timing varies by plan, but the sequence stays stable. Each stage ends with something concrete enough to review.</p></div>
        <nav className="secondary-process-index" aria-label="Process stages">
          {processSteps.map((step, index) => <a href={`#launch-step-${index + 1}`} key={step.label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step.label}</strong></a>)}
        </nav>
        <ol className="secondary-process-list">
          {processSteps.map((step, index) => (
            <li id={`launch-step-${index + 1}`} key={step.label}>
              <div className="secondary-process-list__lead"><span>{String(index + 1).padStart(2, "0")}</span><strong>{step.time}</strong></div>
              <div className="secondary-process-list__summary"><h3>{step.label}</h3><p>{step.copy}</p></div>
              <dl><div><dt>Your input</dt><dd>{step.clientInput}</dd></div><div><dt>FirstFold output</dt><dd>{step.output}</dd></div><div><dt>Review point</dt><dd>{step.reviewPoint}</dd></div></dl>
            </li>
          ))}
        </ol>
      </section>
      <section className="secondary-section secondary-principles" aria-labelledby="working-principles-title">
        <div className="secondary-section__heading"><span>Working principles</span><h2 id="working-principles-title">Speed works when the review system is clear.</h2></div>
        <div>{[
          ["Visible work", "You review working structure and screens, not a surprise presentation at the end."],
          ["Focused feedback", "Each review is tied to the agreed audience, page job, and launch decision."],
          ["Human approval", "AI can accelerate options; a person owns every public claim and design decision."],
          ["Launch QA", "Responsive behavior, actions, metadata, and handoff are checked before release."],
        ].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>
      <section className="secondary-section process-responsibility-split" aria-labelledby="process-responsibility-title">
        <div className="secondary-section__heading"><span>One operating system</span><h2 id="process-responsibility-title">AI handles volume. Humans handle meaning.</h2></div>
        <div className="process-responsibility-split__grid">
          <article><Sparkles aria-hidden="true" /><span>AI contributes</span><h3>Research, routes, variants, and repeatable checks.</h3><p>It compresses the mechanical work so more time can go into comparison and refinement.</p></article>
          <article><UserRound aria-hidden="true" /><span>Human-owned</span><h3>Positioning, hierarchy, taste, accuracy, and approval.</h3><p>A person makes the decisions that shape what the audience understands and what goes live.</p></article>
        </div>
        <p className="process-plan-link">The five-stage sequence stays consistent. Plan choice changes the room for pages, review, and post-launch support. <TextCta href="/pricing">Compare the plans</TextCta></p>
      </section>
    </main>
  );
}

function PricingPageNav() {
  const items = [
    ...pricingTiers.map((tier) => ({ label: tier.name, detail: tier.price, href: `#${tier.name.toLowerCase()}`, recommended: tier.name === "Plus" })),
    { label: "Included", detail: "Every plan", href: "#included", recommended: false },
    { label: "FAQ", detail: "Plan answers", href: "#faq", recommended: false },
  ];

  return (
    <nav className="pricing-page-nav" aria-label="Jump to a pricing plan">
      {items.map((item) => (
        <a href={item.href} key={item.label} className={item.recommended ? "is-recommended" : ""}>
          <span>{item.label}{item.recommended ? <small>Recommended</small> : null}</span>
          <strong>{item.detail}</strong>
        </a>
      ))}
    </nav>
  );
}

export function PricingPage() {
  return (
    <main className="page-shell secondary-page pricing-secondary-page">
      <PageHero eyebrow="Plans" title="Plans Starting at $99" copy="Pick the support level. We shape the website, build it responsively, and bring the first version live." />
      <PricingPageNav />
      <PricingCards />
      <section id="choosing" className="secondary-section secondary-buying-guide" aria-labelledby="buying-guide-title">
        <div className="secondary-section__heading"><span>Choosing well</span><h2 id="buying-guide-title">Choose for the amount of support, not a bigger-looking card.</h2></div>
        <div>{pricingTiers.map((tier, index) => <article key={tier.name}><span>{tier.name}</span><h3>{index === 0 ? "A focused launch" : index === 1 ? "More story and backup" : "A broader, hands-on release"}</h3><p>{index === 0 ? "Best when the offer is clear and the first site can stay compact." : index === 1 ? "Best when the site needs more pages, custom interactions, analytics, and iteration time." : "Best when launch strategy, advanced interactions, and priority post-launch support matter."}</p></article>)}</div>
      </section>
      <section id="included" className="secondary-section secondary-pricing-clarity" aria-label="Pricing clarity">
        <article><span>Included in every plan</span><ul>{sharedBuildIncludes.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul></article>
        <article><span>Scoped separately</span><ul>{["Ongoing content production", "Large application backends", "Paid media management", "Guaranteed performance outcomes"].map((item) => <li key={item}>{item}</li>)}</ul></article>
      </section>
      <section id="faq" className="secondary-section secondary-plan-faq" aria-labelledby="plan-faq-title"><div className="secondary-section__heading"><span>Before you choose</span><h2 id="plan-faq-title">Useful plan answers.</h2></div><AccordionList items={pricingFaqs} idPrefix="pricing-faq" /></section>
    </main>
  );
}

export function ResourcesPage() {
  return (
    <main className="page-shell secondary-page">
      <PageHero eyebrow="Resources" title="Practical notes for a clearer first launch." copy="Use the same checks FirstFold applies to story, AI-assisted production, responsive hierarchy, and launch readiness." />
      <section className="resource-preview-grid secondary-resource-grid" aria-label="FirstFold resource guides">
        {resourceGuides.map((resource, index) => (
          <Link className={`resource-card resource-card--${index + 1}`} href={`/resources/${resource.slug}`} key={resource.title}>
            <div><span>{resource.label}</span><strong>{resource.readingTime} · {resource.updated}</strong></div>
            <h2>{resource.title}</h2>
            <p>{resource.summary}</p>
            <span className="resource-card__link">Read the guide <CtaArrow size={17} /></span>
          </Link>
        ))}
      </section>
    </main>
  );
}

export function AboutPage() {
  return (
    <main className="page-shell secondary-page">
      <PageHero eyebrow="About FirstFold" title="A founder-led studio for getting the first version right." copy="FirstFold helps founders turn useful ideas, messy material, and strong ambition into a clear website people can understand and act on." actions={<><PremiumButton href="/contact">Book a Call</PremiumButton><PremiumButton href="/pricing" secondary>See Plans</PremiumButton></>} />
      <section className="secondary-section about-statement"><FoldGlyph /><h2>AI accelerates the making. Human judgment decides what deserves to exist.</h2><p>The studio uses AI for research, structure, variants, and repeatable checks. Positioning, factual accuracy, hierarchy, visual taste, and launch approval stay human-owned.</p></section>
      <section className="secondary-section about-reasons" aria-labelledby="about-reasons-title"><div className="secondary-section__heading"><span>Why the studio exists</span><h2 id="about-reasons-title">The first public version should create momentum, not another unfinished system.</h2></div><div>{[
        ["Start from the decision", "A page exists to help someone understand, trust, compare, or act. That job comes before decoration."],
        ["Build the real thing", "Working responsive pages reveal problems that static presentations hide."],
        ["Keep claims honest", "Specific proof and clear limits create more trust than inflated outcome language."],
        ["Leave room to grow", "The first version is focused, but its sections and content rules should support the next one."],
      ].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
      <section className="secondary-section about-expectations">
        {[
          {
            eyebrow: "What clients bring",
            title: "Context, conviction, and timely decisions.",
            points: ["Truthful product context", "Current material and references", "Access to the decision-maker", "Focused feedback at each review"],
          },
          {
            eyebrow: "What FirstFold brings",
            title: "Structure, design judgment, and a path to live.",
            points: ["A clear website story", "AI-assisted structure and QA", "Human visual and copy judgment", "Responsive launch checks before release"],
          },
        ].map((item, index) => (
          <article className={index === 0 ? "about-expectations__client" : "about-expectations__studio"} key={item.eyebrow}>
            <div><UserRound size={18} aria-hidden="true" /><span>{item.eyebrow}</span></div>
            <h2>{item.title}</h2>
            <ul>
              {item.points.map((point, pointIndex) => (
                <li key={point}><strong>{String(index * 4 + pointIndex + 1).padStart(2, "0")}</strong>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <section className="secondary-section about-founder-note" aria-labelledby="about-founder-note-title">
        <div className="about-founder-note__copy"><div><span aria-hidden="true">“</span><h2 id="about-founder-note-title">Hear from the founder</h2></div><blockquote>A lot of founders start with big ambitions, but turning an idea into something real is often the hardest part. That is where FirstFold comes in: to help make the first step clear, useful, and ready to launch.</blockquote><p>- Suhail Quraishi</p></div>
        <img src="/images/team/founder-note-frame.webp" alt="Suhail Quraishi, founder of FirstFold" width={2032} height={2036} loading="lazy" />
      </section>
    </main>
  );
}

export function ContactPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();

  return (
    <main className="page-shell secondary-page contact-page">
      <PageHero eyebrow="Start here" title="Tell us what needs to go live." copy="Choose a call when a booking link is available, or send a short brief. We will reply with the clearest next step and the plan that fits." />
      <section className="contact-paths">
        {bookingUrl ? <article className="contact-booking"><span>Talk it through</span><h2>Book a focused intro call.</h2><p>Use 20 minutes to share the offer, current material, timing, and what the website needs to change.</p><a className="premium-button" href={bookingUrl} target="_blank" rel="noreferrer"><span>Choose a Time</span><CtaArrow size={20} /></a></article> : null}
        <article className={bookingUrl ? "contact-brief" : "contact-brief contact-brief--wide"}><span>Send a brief</span><h2>A few useful details are enough.</h2><p className="contact-email-disclosure"><Mail size={18} aria-hidden="true" />Opens a draft in your email app. This form does not submit or store your details on this website.</p><ContactForm /></article>
      </section>
    </main>
  );
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const field = (name: string) => String(form.get(name) ?? "").trim();
    const plan = field("plan") || "Not sure";
    const body = [
      `Name: ${field("name")}`,
      `Email: ${field("email")}`,
      `Plan interest: ${plan}`,
      `Timeline: ${field("timeline") || "Not specified"}`,
      "",
      "Brief:",
      field("brief"),
    ].join("\n");

    window.location.href = `mailto:hello@firstfold.studio?subject=${encodeURIComponent(`FirstFold website inquiry: ${plan}`)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" autoComplete="name" required placeholder="Your name" />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
      </label>
      <label>
        Plan interest
        <select name="plan" defaultValue="Not sure">
          <option>Pro</option>
          <option>Plus</option>
          <option>Master</option>
          <option>Not sure</option>
        </select>
      </label>
      <label>
        Launch timing
        <select name="timeline" defaultValue="As soon as possible">
          <option>As soon as possible</option>
          <option>Within a month</option>
          <option>1-3 months</option>
          <option>Flexible</option>
        </select>
      </label>
      <label className="contact-form__wide">
        What needs to go live?
        <textarea name="brief" required placeholder="What are you launching, who is it for, and what material already exists?" rows={6} />
      </label>
      <button type="submit" className="submit-button">
        <span>Send the Brief</span>
        <CtaArrow />
      </button>
      <a className="email-fallback" href="mailto:hello@firstfold.studio">
        <Mail size={16} aria-hidden="true" />
        hello@firstfold.studio
      </a>
      <div className={submitted ? "form-status is-visible" : "form-status"} role="status">
        Opening your email draft. You can also write to hello@firstfold.studio.
      </div>
    </form>
  );
}

function AccordionList({ items, idPrefix, className = "" }: { items: ReadonlyArray<{ question: string; answer: string }>; idPrefix: string; className?: string }) {
  const [open, setOpen] = useState(0);

  return (
    <div className={`faq-list ${className}`.trim()}>
      {items.map((item, index) => {
        const active = open === index;
        const answerId = `${idPrefix}-answer-${index}`;
        return (
          <div className="faq-item" key={item.question}>
            <button type="button" aria-expanded={active} aria-controls={answerId} onClick={() => setOpen(active ? -1 : index)}>
              <span>{item.question}</span>
              <ChevronDown size={18} aria-hidden="true" />
            </button>
            <div id={answerId} className="faq-answer" hidden={!active}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FAQAccordion() {

  return (
    <SectionFrame title="Straight answers. No theatre." accent="yellow" compact className="home-faq-section">
      <AccordionList items={faqs} idPrefix="home-faq" />
    </SectionFrame>
  );
}

export function PageHero({ title, copy, actions }: { eyebrow?: string; title: string; copy: string; actions?: ReactNode }) {
  return (
    <section className="page-hero secondary-hero">
      <div className="secondary-hero__title">
        <h1><MotionText>{title}</MotionText></h1>
      </div>
      <div className="secondary-hero__aside">
        <p>{copy}</p>
        {actions ? <div className="secondary-hero__actions">{actions}</div> : null}
      </div>
    </section>
  );
}

export function FinalCTA() {
  const pathname = usePathname();
  const routeCopy: Record<string, { eyebrow: string; line: string; accent: string; copy: string }> = {
    "/services": { eyebrow: "Know what the website needs to do?", line: "Choose the right", accent: "support level.", copy: "Compare the three plans or tell us what you are launching." },
    "/process": { eyebrow: "Ready to begin the first stage?", line: "Bring the context.", accent: "We will shape the path.", copy: "Start with a plan or a focused conversation about the launch." },
    "/pricing": { eyebrow: "Still deciding between plans?", line: "Choose for the", accent: "support you need.", copy: "Tell us the scope and timing. We will point you to the cleanest fit." },
    "/work": { eyebrow: "Have a direction worth making real?", line: "Turn the concept", accent: "into a live site.", copy: "Share the idea, audience, and material you already have." },
    "/about": { eyebrow: "Have something useful to launch?", line: "Make the first", accent: "version count.", copy: "FirstFold can help turn the raw material into a clear public website." },
    "/resources": { eyebrow: "Found a useful starting point?", line: "Apply it to", accent: "your own launch.", copy: "Use the guides yourself or bring the material into a focused website sprint." },
    "/contact": { eyebrow: "Prefer to compare first?", line: "See the support", accent: "behind each plan.", copy: "Review the scope, timing, and post-launch support before reaching out." },
  };
  const key = Object.keys(routeCopy).find((route) => pathname === route || pathname.startsWith(`${route}/`));
  const content = key ? routeCopy[key] : { eyebrow: "Have an idea worth launching?", line: "Make the first", accent: "version count.", copy: "Tell us what you are building. We will help shape the clearest way to launch it." };
  const isContact = pathname === "/contact";

  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__copy">
        <h2 id="final-cta-title">
          <span>{content.line}</span>
          <strong>{content.accent}</strong>
        </h2>
        <span>{content.copy}</span>
        <PremiumButton href={isContact ? "/pricing" : "/contact"} secondary hideArrow>
          {isContact ? "See Plans" : "Book a Call"}
        </PremiumButton>
      </div>
      <img src="/images/hero/bottom-cta-image.webp" alt="" width={3840} height={1966} loading="lazy" />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-directory">
        <nav aria-label="Footer products">
          <h2>Websites</h2>
          <Link href="/services">What we build</Link>
          <Link href="/process">How we launch</Link>
          <Link href="/pricing">Pro, Plus &amp; Master</Link>
          <Link href="/work">Concept work</Link>
        </nav>
        <nav aria-label="Footer company">
          <h2>Company</h2>
          <Link href="/about">About</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <nav aria-label="Footer contact">
          <h2>Contact</h2>
          <Link href="/contact">Book a Call</Link>
          <a href="mailto:hello@firstfold.studio">Email us</a>
          <Link href="/work">Website directions</Link>
        </nav>
        <div className="footer-statement">
          <h2>Making first folds feel alive.</h2>
          <p>Launch-ready founder websites with clear proof, responsive thinking, and human judgment.</p>
        </div>
      </div>
      <div className="footer-brand-row">
        <span>© 2026 FirstFold Studio</span>
        <a href="mailto:hello@firstfold.studio">hello@firstfold.studio</a>
      </div>
      <img className="footer-wordmark" src="/firstfold-logo-nav.svg" alt="FirstFold" width={745} height={121} loading="lazy" />
    </footer>
  );
}
