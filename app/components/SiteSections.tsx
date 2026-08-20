"use client";

/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Check, ChevronDown, Clock, Globe2, Mail } from "lucide-react";
import Link from "next/link";
import { type CSSProperties, FormEvent, type PointerEvent as ReactPointerEvent, useRef, useState } from "react";
import { faqs, logoRail, metrics, pricingTiers, processSteps, projects, projectTypes, services } from "@/lib/content";
import { CtaArrow, FoldGlyph, MeetingIcons, MotionText, PremiumButton, SectionFrame, StatusBadge, TextCta } from "./UIPrimitives";

type Project = (typeof projects)[number];

const showcaseTemplates = [
  {
    title: "Transaction data intelligence",
    category: "Fintech Infrastructure",
    image: "/images/showcase/spade.png",
    href: "https://spade.com/?utm_source=landing.gallery",
  },
  {
    title: "Agentic web CMS",
    category: "Headless CMS",
    image: "/images/showcase/prismic.png",
    href: "https://prismic.io/?utm_source=landing.gallery",
  },
  {
    title: "AI support QA",
    category: "CX Enablement",
    image: "/images/showcase/solidroad.png",
    href: "https://solidroad.com/?utm_source=landing.gallery",
  },
  {
    title: "Business identity verification",
    category: "Compliance Infrastructure",
    image: "/images/showcase/duna.png",
    href: "https://duna.com/?utm_source=landing.gallery",
  },
  {
    title: "Secure code sandboxes",
    category: "Developer Infrastructure",
    image: "/images/showcase/daytona.png",
    href: "https://www.daytona.io/?utm_source=landing.gallery",
  },
  {
    title: "Personal wellness companion",
    category: "Consumer Health",
    image: "/images/showcase/holo.png",
    href: "https://tryholo.com/?utm_source=landing.gallery",
  },
];

const audienceRows = [
  {
    title: "Founders",
    summary: "From idea to something people can actually use.",
    description:
      "Launching a new business or testing an idea? We help you get the essentials live — from your first website and brand presence to the assets you need to start selling, sharing, and validating.",
  },
  {
    title: "AI products",
    summary: "Make the product feel as good as the technology behind it.",
    description:
      "We help AI products launch with clear positioning, polished websites, product visuals, demos, and launch assets — without spending months building a full brand system.",
  },
  {
    title: "SaaS teams",
    summary: "Everything you need to ship the next version.",
    description:
      "Whether you're launching your V1, a new feature, or repositioning the product, we build the website, launch pages, visuals, and supporting assets needed to get it out quickly.",
  },
  {
    title: "Creator-led brands",
    summary: "Turn an audience into a brand.",
    description:
      "For creators launching products, communities, courses, or businesses. We build the digital presence around the launch — from landing pages and social assets to the visual system tying everything together.",
  },
  {
    title: "Enterprise GTM",
    summary: "Move faster without waiting on another internal cycle.",
    description:
      "We support GTM teams with campaign pages, launch assets, sales visuals, event creatives, and other execution-heavy work — built quickly and within your existing brand.",
  },
  {
    title: "Productized services",
    summary: "Package what you do. Make it easier to buy.",
    description:
      "For agencies, consultants, studios, and service businesses turning expertise into a repeatable offer. We help structure, position, and launch it with the right website and supporting assets.",
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
const bookingCalendarDays = [
  null,
  null,
  null,
  null,
  null,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
];
const bookingAvailableDays = new Set([6, 7, 8, 10, 11, 12, 13, 14, 15]);

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

function BookingPreview() {
  return (
    <section className="booking-panel" aria-label="Book a call">
      <div className="booking-card">
        <h2>Intro with FirstFold</h2>
        <p>Tell us what you are building. We will help map the next move.</p>
        <div className="booking-card__meta">
          <span>
            <Clock size={18} aria-hidden="true" />
            20m
          </span>
          <span>
            <MeetingIcons size={18} />
            Google Meet
          </span>
          <span>
            <Globe2 size={18} aria-hidden="true" />
            Asia/Kolkata
          </span>
        </div>
      </div>
      <div className="calendar-embed" aria-label="Calendar availability preview">
        <div className="calendar-embed__header">
          <strong>
            August <span>2026</span>
          </strong>
          <span className="calendar-embed__slot">Next open: 14:30</span>
        </div>
        <div className="calendar-embed__weekdays" aria-hidden="true">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="calendar-embed__grid">
          {bookingCalendarDays.map((day, index) =>
            day ? (
              <button
                type="button"
                key={`${day}-${index}`}
                className={bookingAvailableDays.has(day) ? (day === 6 ? "is-active" : "is-available") : ""}
                aria-label={`${day} August 2026${bookingAvailableDays.has(day) ? ", available" : ""}`}
                disabled={!bookingAvailableDays.has(day)}
              >
                {day}
              </button>
            ) : (
              <span key={`blank-${index}`} aria-hidden="true" />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function TrackLink({ href, label, meta, meeting = false }: { href: string; label: string; meta: string; meeting?: boolean }) {
  return (
    <li>
      <a href={href}>
        <span className={meeting ? "track-link-list__call" : undefined}>
          {meeting ? <MeetingIcons size={18} /> : null}
          {label}
        </span>
        <strong>{meta}</strong>
        <CtaArrow size={16} />
      </a>
    </li>
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
  return (
    <section className="hero-shell hero-shell--landing theme-yellow">
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 aria-label="Helping Founders Raise Next Million">
            <span className="hero-title-line hero-title-line--editorial">Helping</span>
            <span className="hero-title-line hero-title-line--sans">Founders Raise</span>
            <span className="hero-title-line hero-title-line--editorial hero-title-line--ink">Next Million</span>
          </h1>
          <p className="hero-subtitle">
            Launch-ready websites for your first version, built in 5–7 days.
          </p>
          <div className="hero-actions">
            <PremiumButton href="/contact" hideArrow>
              Book a Call
            </PremiumButton>
            <PremiumButton href="/pricing" secondary hideArrow>
              View Plans
            </PremiumButton>
          </div>
        </div>
        <div className="hero-artwork" aria-hidden="true">
          <img src="/images/hero/firstfold-vision-craft.webp" alt="" width={1341} height={1351} />
        </div>
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
  return (
    <section className="showcase-section" aria-labelledby="showcase-title">
      <div className="showcase-heading">
        <div>
          <h2 id="showcase-title">
            <MotionText>Need to launch soon? Explore these.</MotionText>
          </h2>
          <p>Select from best library, specially curated for you.</p>
        </div>
      </div>

      <div className="showcase-grid" aria-label="Template library">
        {showcaseTemplates.map((item) => (
          <a href={item.href} className="showcase-card" key={item.title} target="_blank" rel="noreferrer">
            <div className="showcase-card__preview">
              <img src={item.image} alt={`${item.title} landing page screenshot`} width={1440} height={900} loading="lazy" />
              <span className="showcase-card__overlay" aria-hidden="true">
                <span>
                  Create Yours
                  <CtaArrow />
                </span>
              </span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.category}</p>
          </a>
        ))}
      </div>
      <Link href="/work" className="showcase-more-link">
        More Options
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
          <img src="/images/homepage-banner.webp" alt="Looking for something more curated? Personalised design, priced for founders. Check Our Plans." width={1200} height={400} loading="lazy" />
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
          <MotionText>Start with what actually matters.</MotionText>
        </h2>
        <p>Made for people starting something.</p>
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
        {pricingTiers.map((tier, index) => {
          const isFeatured = index === 0;

          return (
            <article
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
                  <h3>{tier.name}</h3>
                  <p className="pricing-preview-card__summary">{tier.summary}</p>
                </div>
                <div className="pricing-preview-card__price-row">
                  <div className="pricing-preview-card__price">
                    <strong>{tier.price}</strong>
                    <div className="pricing-preview-card__meta">
                      <span>{tier.timeline}</span>
                    </div>
                  </div>
                  <PremiumButton href="/contact" secondary={!isFeatured}>
                    {tier.cta}
                  </PremiumButton>
                </div>
              </div>
              <div className="pricing-benefit-list" aria-label={`${tier.name} key benefits`}>
                {tier.benefits.map((benefit) => (
                  <span key={benefit}>
                    <Check size={14} aria-hidden="true" />
                    {benefit}
                  </span>
                ))}
              </div>
              <div className="pricing-preview-card__rule" aria-hidden="true" />
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

export function ServicePanel({ service, index, primary = false }: { service: (typeof services)[number]; index: number; primary?: boolean }) {
  return (
    <motion.article
      className={primary ? `service-panel service-panel--primary ${service.color}` : `service-panel ${service.color}`}
      initial={{ opacity: 0.35, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
    >
      <span>{service.eyebrow}</span>
      <h3>{service.name}</h3>
      <p>{service.summary}</p>
      <div className="service-meta">
        <strong>{service.turnaround}</strong>
        <strong>{service.price}</strong>
      </div>
      <ul>
        {service.included.slice(0, 4).map((item) => (
          <li key={item}>
            <Check size={15} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <TextCta href="/services">
        View service
      </TextCta>
    </motion.article>
  );
}

function ProcessTeaser() {
  return (
    <SectionFrame title="Strong foundations, adapted - not rebuilt from zero every time." copy="That's how we keep it fast without cutting corners. AI creates speed; humans keep taste." accent="yellow">
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.value}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </div>
      <div className="process-mini">
        {processSteps.slice(0, 3).map((step) => (
          <a href="/process" className="process-step" key={step.label}>
            <span>{step.meta}</span>
            <h3>{step.label}</h3>
            <p>{step.copy}</p>
            <strong>{step.time}</strong>
          </a>
        ))}
      </div>
    </SectionFrame>
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
  const proTier = pricingTiers[0];
  const plusTier = pricingTiers[1];
  const included = proTier.includes.slice(0, 4);
  const paidIncluded = plusTier.includes.slice(0, 4);

  return (
    <section className="home-pricing-section" aria-labelledby="home-pricing-title">
      <div className="home-pricing-copy">
        <h2 id="home-pricing-title">
          <MotionText>Choose your plan</MotionText>
        </h2>
        <p>Built for where you are, and where you are going.</p>
      </div>
      <div className="home-pricing-cards">
        <article className="home-pricing-card home-pricing-card--light">
          <div className="home-pricing-card__top">
            <div>
              <span className="home-pricing-card__eyebrow">Launch essentials</span>
              <h3>{proTier.name}</h3>
            </div>
            <div className="home-pricing-card__price">
              <strong>{proTier.price}</strong>
              <small>{proTier.timeline}</small>
            </div>
          </div>
          <p className="home-pricing-card__summary">{proTier.summary}</p>
          <ul className="home-pricing-card__features">
            {included.map((item) => (
              <li key={item}>
                <Check size={15} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <PremiumButton href="/contact" secondary hideArrow>
            {proTier.cta}
          </PremiumButton>
        </article>
        <article className="home-pricing-card home-pricing-card--orange">
          <div className="home-pricing-card__top">
            <div>
              <span className="home-pricing-card__eyebrow">More room to build</span>
              <h3>{plusTier.name}</h3>
            </div>
            <div className="home-pricing-card__price">
              <strong>{plusTier.price}</strong>
              <small>{plusTier.timeline}</small>
            </div>
          </div>
          <p className="home-pricing-card__summary">{plusTier.summary}</p>
          <ul className="home-pricing-card__features">
            {paidIncluded.map((item) => (
              <li key={item}>
                <Check size={15} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <PremiumButton href="/pricing" hideArrow>
            See all plans
          </PremiumButton>
        </article>
      </div>
      <Link href="/contact" className="home-pricing-sales-link">
        Looking for something custom? <strong>Contact us</strong>
        <CtaArrow />
      </Link>
    </section>
  );
}

function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(-600);
  const pointerY = useMotionValue(-600);
  const glowX = useSpring(pointerX, { stiffness: 110, damping: 24, mass: 0.45 });
  const glowY = useSpring(pointerY, { stiffness: 110, damping: 24, mass: 0.45 });
  const trailX = useSpring(pointerX, { stiffness: 58, damping: 22, mass: 0.8 });
  const trailY = useSpring(pointerY, { stiffness: 58, damping: 22, mass: 0.8 });

  const moveGlow = (event: ReactPointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const bounds = sectionRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set(event.clientX - bounds.left - 260);
    pointerY.set(event.clientY - bounds.top - 260);
  };

  const hideGlow = () => {
    pointerX.set(-600);
    pointerY.set(-600);
  };

  return (
    <section
      ref={sectionRef}
      className="team-section founder-spotlight"
      aria-labelledby="team-title"
      onPointerMove={moveGlow}
      onPointerLeave={hideGlow}
    >
      <motion.div
        className="founder-spotlight__glow founder-spotlight__glow--primary"
        style={{ x: glowX, y: glowY }}
        aria-hidden="true"
      />
      <motion.div
        className="founder-spotlight__glow founder-spotlight__glow--trail"
        style={{ x: trailX, y: trailY }}
        aria-hidden="true"
      />
      <div className="team-section__copy">
        <span className="team-section__eyebrow">Founder note / 01</span>
        <h2 id="team-title">
          <MotionText>Hear from the founder</MotionText>
        </h2>
        <p>Why FirstFold exists.</p>
      </div>
      <figure className="founder-note">
        <div className="founder-note__identity">
          <img src="/images/team/orange-profile.png" alt="" width={192} height={192} loading="lazy" />
          <figcaption>
            <strong>Suhail Quraishi</strong>
            <span>CEO &amp; Founder</span>
          </figcaption>
        </div>
        <blockquote>
          <span aria-hidden="true">“</span>
          A lot of founders start with big ambitions, but turning an idea into something real is often the hardest part.
          That’s where we come in—to help them take their first step, and take it right.
        </blockquote>
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
        <i>{project.type}</i>
      </div>
      <div>
        <p>{project.type}</p>
        <h3>{project.title}</h3>
        <span>{project.summary}</span>
      </div>
    </a>
  );
}

export function WorkPage() {
  const [filter, setFilter] = useState<(typeof projectTypes)[number]>("All");
  const visible = filter === "All" ? projects : projects.filter((project) => project.type === filter);

  return (
    <main className="page-shell">
      <PageHero title="Case studies with the work doing the talking." copy="Filter by Website, Creator Pack, or Enterprise. Each thumbnail opens into a full case-study structure." />
      <div className="filter-bar" aria-label="Filter work by type">
        {projectTypes.map((type) => (
          <button key={type} type="button" className={filter === type ? "is-active" : ""} onClick={() => setFilter(type)}>
            {type}
          </button>
        ))}
      </div>
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
    <main className="page-shell">
      <PageHero title="AI-native websites lead. Creator and enterprise packs extend the system." copy="Each product shows what is included, who it is for, starting price, turnaround, and how AI and human judgment divide the work." />
        <div className="service-detail-grid">
        {services.map((service, index) => (
          <article id={service.slug} className={index === 0 ? `service-detail service-detail--primary ${service.color}` : `service-detail ${service.color}`} key={service.name}>
            <span>{service.eyebrow}</span>
            <h2>{service.name}</h2>
            <p>{service.summary}</p>
            <div className="service-meta">
              <strong>{service.price}</strong>
              <strong>{service.turnaround}</strong>
            </div>
            <h3>Included</h3>
            <ul>
              {service.included.map((item) => (
                <li key={item}>
                  <Check size={15} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <h3>Who it is for</h3>
            <p>{service.who}</p>
            <h3>AI / human split</h3>
            <p>{service.split}</p>
            <PremiumButton href="/contact" secondary={index !== 0}>
              Book this sprint
            </PremiumButton>
          </article>
        ))}
      </div>
    </main>
  );
}

export function ProcessPage() {
  return (
    <main className="page-shell">
      <section className="page-hero process-page-hero">
        <h1>
          <MotionText>Two tracks. One clear way in.</MotionText>
        </h1>
        <span>Browse the asset you need, then choose how much support you want around the launch.</span>
      </section>
      <section className="track-system" aria-label="FirstFold tracks">
        <article>
          <span className="track-system__tag">Track A / Assets</span>
          <h2>
            <MotionText>Products you can understand before the call.</MotionText>
          </h2>
          <p>Websites, creator packs, and enterprise systems are framed as deliverables: what they are, what is inside, who they are for, and where pricing starts.</p>
          <ul className="track-link-list">
            <TrackLink href="/services#ai-native-websites" label="AI-Native Websites" meta="from $4.8k" />
            <TrackLink href="/services#creator-packs" label="Creator Packs" meta="from $1.6k" />
            <TrackLink href="/services#enterprise-packs" label="Enterprise Systems" meta="custom" />
          </ul>
          <PremiumButton href="/services">
            Browse the Folds
          </PremiumButton>
        </article>
        <article>
          <span className="track-system__tag">Track B / Calls & Plans</span>
          <h2>
            <MotionText>What you get once you book.</MotionText>
          </h2>
          <p>Discovery calls and Pro, Plus, Master plans explain how much of us you get: sprint duration, revision depth, post-launch support, and access.</p>
          <ul className="track-link-list">
            <TrackLink href="/contact" label="Discovery Call" meta="30 min" meeting />
            <TrackLink href="/pricing" label="Pro, Plus, Master" meta="plans" />
            <TrackLink href="/process" label="Process" meta="after booking" />
          </ul>
          <PremiumButton href="/contact" meeting>
            Book a Discovery Call
          </PremiumButton>
        </article>
      </section>
      <section className="process-heading">
        <h2>
          <MotionText>What happens after you book.</MotionText>
        </h2>
        <p>The sprint mechanics stay simple: discovery, AI-assisted structure, human design judgment, review, and launch.</p>
      </section>
      <div className="process-metrics" aria-label="Sprint facts">
        <article>
          <span>Launch window</span>
          <strong>10-21d</strong>
        </article>
        <article>
          <span>Core offers</span>
          <strong>3</strong>
        </article>
        <article>
          <span>Clear story per screen</span>
          <strong>1</strong>
        </article>
      </div>
      <div className="process-list">
        {processSteps.map((step) => (
          <article className="process-row" key={step.label}>
            <div className="process-row__visual" aria-hidden="true">
              <strong>{step.time}</strong>
            </div>
            <div className="process-row__body">
              <span className="process-row__meta">{step.meta}</span>
              <h2>{step.label}</h2>
              <p>{step.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export function PricingPage() {
  return (
    <main className="page-shell">
      <section className="page-hero pricing-page-hero">
        <h1>
          <MotionText>Simple pricing. Clear paths.</MotionText>
        </h1>
        <span>Pick the support level. We bring the site live.</span>
      </section>
      <PricingCards />
    </main>
  );
}

export function ResourcesPage() {
  const resourcePreviews = [
    {
      label: "Checklist",
      title: "First-fold checklist",
      copy: "A practical preflight for the first screen: promise, proof, call to action, mobile hierarchy, and launch QA.",
    },
    {
      label: "Stack notes",
      title: "AI launch stack",
      copy: "The working stack behind fast site sprints: research, writing, prototyping, quality checks, and handoff.",
    },
    {
      label: "Teardown",
      title: "Founder website teardown",
      copy: "A sharp review format for spotting where a founder site loses clarity, trust, or momentum before the first call.",
    },
  ];

  return (
    <main className="page-shell">
      <PageHero title="Field Notes are coming." copy="Useful checklists, teardown formats, and launch notes are being shaped from the same system we use inside client sprints." />
      <section className="resource-preview-grid" aria-label="Upcoming FirstFold resources">
        {resourcePreviews.map((resource, index) => (
          <article className={`resource-card resource-card--${index + 1}`} key={resource.title}>
            <span>{resource.label}</span>
            <h2>{resource.title}</h2>
            <p>{resource.copy}</p>
          </article>
        ))}
      </section>
      <section className="resource-cta">
        <div>
          <h2>Want the first checklist?</h2>
          <p>Ask for it now and we will send the first-fold preflight when the first note is ready.</p>
        </div>
        <PremiumButton href="/contact">Ask for the checklist</PremiumButton>
      </section>
    </main>
  );
}

export function AboutPage() {
  return (
    <main className="page-shell">
      <PageHero title="A studio for the first fold and everything it implies." copy="FirstFold is built around one belief: the first screen should reveal the quality of the entire company." />
      <section className="about-system">
        <div>
          <FoldGlyph />
          <h2>AI accelerates the making. Humans decide what deserves to exist.</h2>
        </div>
        <p>FirstFold exists for founders who have the raw material already: sharp taste, useful ideas, messy notes, and not enough time to turn them into a launch system. The studio combines strategy, editorial taste, interaction design, and fast AI-assisted production so the first screen feels clear from the opening moment.</p>
      </section>
      <div className="about-photo">
        <img src="/human-team.png" alt="AI-generated fictional FirstFold studio process scene" width={1792} height={1024} loading="lazy" />
      </div>
    </main>
  );
}

export function ContactPage() {
  return (
    <main className="page-shell contact-page">
      <PageHero title="Book a call." copy="Pick the sprint shape. We will reply with the cleanest next step." />
      <BookingPreview />
      <ContactForm />
    </main>
  );
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const field = (name: string) => String(form.get(name) ?? "").trim();
    const projectType = field("projectType") || "Project";
    const body = [
      `Name: ${field("name")}`,
      `Email: ${field("email")}`,
      `Project type: ${projectType}`,
      `Budget: ${field("budget")}`,
      `Timeline: ${field("timeline") || "Not specified"}`,
      "",
      "Brief:",
      field("brief"),
    ].join("\n");

    window.location.href = `mailto:hello@firstfold.studio?subject=${encodeURIComponent(`FirstFold inquiry: ${projectType}`)}&body=${encodeURIComponent(body)}`;
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
        Project type
        <select name="projectType" defaultValue="AI-Native Website">
          <option>AI-Native Website</option>
          <option>Creator Pack</option>
          <option>Enterprise Pack</option>
        </select>
      </label>
      <label>
        Budget
        <select name="budget" defaultValue="$4.8k-$8.5k">
          <option>$4.8k-$8.5k</option>
          <option>$8.5k-$15k</option>
          <option>$15k+</option>
        </select>
      </label>
      <label>
        Timeline
        <input name="timeline" placeholder="10-21 days, next month, flexible..." />
      </label>
      <label className="contact-form__wide">
        What are you launching?
        <textarea name="brief" required placeholder="A new site, sharper creator system, enterprise workflow, or something still taking shape..." rows={6} />
      </label>
      <button type="submit" className="submit-button">
        <span>Send inquiry</span>
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

export function FAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <SectionFrame title="Straight answers. No theatre." accent="yellow" compact>
      <div className="faq-list">
        {faqs.map((item, index) => {
          const active = open === index;
          return (
            <div className="faq-item" key={item.question}>
              <button type="button" aria-expanded={active} onClick={() => setOpen(active ? -1 : index)}>
                <span>{item.question}</span>
                <ChevronDown size={18} aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {active ? (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}>
                    <p>{item.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </SectionFrame>
  );
}

export function PageHero({ title, copy }: { title: string; copy: string }) {
  return (
    <section className="page-hero">
      <h1>
        <MotionText>{title}</MotionText>
      </h1>
      <span>{copy}</span>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__copy">
        <p>Have an idea worth launching?</p>
        <h2 id="final-cta-title">
          <span>Make the first</span>
          <strong>version count.</strong>
        </h2>
        <span>Tell us what you are building. We will help shape the clearest way to launch it.</span>
        <PremiumButton href="/contact" secondary hideArrow>
          Book a Call
        </PremiumButton>
      </div>
      <img src="/images/hero/firstfold-vision-craft.webp" alt="" width={1341} height={1351} loading="lazy" />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-directory">
        <nav aria-label="Footer products">
          <h2>Products</h2>
          <Link href="/services">AI-native websites</Link>
          <Link href="/services">Creator packs</Link>
          <Link href="/services">Enterprise systems</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <nav aria-label="Footer company">
          <h2>Company</h2>
          <Link href="/work">Work</Link>
          <Link href="/process">Process</Link>
          <Link href="/about">About</Link>
          <Link href="/resources">Resources</Link>
        </nav>
        <nav aria-label="Footer contact">
          <h2>Contact</h2>
          <Link href="/contact">Book a call</Link>
          <a href="mailto:hello@firstfold.studio">Email us</a>
          <Link href="/work">Case studies</Link>
        </nav>
        <div className="footer-statement">
          <h2>Making first folds feel alive.</h2>
          <p>AI-native websites with human taste, clear proof, and launch-ready systems.</p>
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
