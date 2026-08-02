"use client";

/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check, ChevronDown, Diamond, Mail } from "lucide-react";
import { type CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { clientLogos, faqs, logoRail, metrics, navItems, pricingTiers, principles, processSteps, projects, projectTypes, services } from "@/lib/content";

type Project = (typeof projects)[number];

const audienceCards = [
  { label: "01", title: "Founders", copy: "Make momentum credible.", tone: "pill-0", imagePosition: "0% 0%" },
  { label: "02", title: "AI products", copy: "Explain the system fast.", tone: "pill-1", imagePosition: "50% 0%" },
  { label: "03", title: "SaaS teams", copy: "Feel mature. Stay clear.", tone: "pill-2", imagePosition: "100% 0%" },
  { label: "04", title: "Creator-led brands", copy: "Turn expertise into rhythm.", tone: "pill-0", imagePosition: "0% 100%" },
  { label: "05", title: "Enterprise GTM", copy: "Launch one clean story.", tone: "pill-1", imagePosition: "50% 100%" },
  { label: "06", title: "Productized services", copy: "Make the offer obvious.", tone: "pill-2", imagePosition: "100% 100%" },
];

const principleIcons = ["/icons/brain-circuit.svg", "/icons/focus.svg", "/icons/badge-check.svg", "/icons/workflow.svg"];

export function FoldGlyph({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "fold-glyph fold-glyph--small" : "fold-glyph"} aria-hidden="true">
      <span />
    </span>
  );
}

export function PremiumButton({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return (
    <a href={href} className={secondary ? "premium-button premium-button--secondary" : "premium-button"}>
      <span>{children}</span>
      <span className="cta-arrow" aria-hidden="true">
        <img src="/right-arrow.svg" alt="" width={20} height={20} />
      </span>
    </a>
  );
}

export function SectionFrame({
  title,
  copy,
  children,
  accent = "yellow",
  compact = false,
  className,
  replayMotion = false,
}: {
  title: React.ReactNode;
  copy?: string;
  children: React.ReactNode;
  accent?: "yellow" | "blue" | "brown" | "orange";
  compact?: boolean;
  className?: string;
  replayMotion?: boolean;
}) {
  const reduced = useReducedMotion();
  const classes = ["section-frame", compact ? "section-frame--compact" : "", `theme-${accent}`, className ?? ""].filter(Boolean).join(" ");
  const heading = (
    <>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </>
  );

  return (
    <section className={classes}>
      {replayMotion ? (
        <motion.div
          className="section-heading"
          initial={reduced ? false : { opacity: 0.25, y: 72 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-18% 0px -18% 0px" }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
        >
          {heading}
        </motion.div>
      ) : (
        <div className="section-heading">{heading}</div>
      )}
      {children}
    </section>
  );
}

export function MotionText({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0.2, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function HomePage() {
  return (
    <main>
      <Hero />
      <WorkPreview />
      <WhoFor />
      <PricingPreview />
      <ToolRail />
      <ProcessTeaser />
      <FullBleedMoment />
      <FounderNote />
      <FAQAccordion />
    </main>
  );
}

function Hero() {
  return (
    <section className="hero-shell hero-shell--landing theme-yellow">
      <div className="hero-grid">
        <div className="hero-copy">
          <h1>
            We make the first fold feel
            <span> alive.</span>
          </h1>
          <p className="hero-lede">Crisp AI-native sites for founders who need trust from the first screen.</p>
        </div>
        <div className="hero-info">
          <p className="hero-proof-copy">A clear promise, visible work, and a page built to move the call forward.</p>
          <div className="hero-actions">
            <PremiumButton href="/contact">Book a strategy call</PremiumButton>
            <PremiumButton href="/work" secondary>
              See our work
            </PremiumButton>
          </div>
        </div>
        <div className="hero-reel" aria-label="Previous work video showcase">
          <div className="hero-reel__stage">
            <img src="/human-hero.png" alt="AI-generated fictional founder reviewing previous website work" width={1536} height={1024} fetchPriority="high" />
            <button type="button" aria-label="Play FirstFold work reel">
              <span />
            </button>
            <div className="work-peek">
              {projects.slice(0, 3).map((project) => (
                <span key={project.slug}>{project.title}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <LogoStrip label="Major clients" logos={clientLogos} className="client-logo-strip" />
    </section>
  );
}

function ToolRail() {
  return (
    <section className="tool-rail-section" aria-label="Tools FirstFold builds with">
      <LogoStrip label="Tools we build with" logos={logoRail} moving />
    </section>
  );
}

function LogoStrip({
  label,
  logos,
  moving = false,
  className,
}: {
  label: string;
  logos: { name: string; src: string; wordmark?: string }[];
  moving?: boolean;
  className?: string;
}) {
  const list = moving ? [...logos, ...logos] : logos;

  return (
    <div className={["logo-strip", moving ? "logo-strip--moving" : "", className ?? ""].filter(Boolean).join(" ")}>
      <strong>{label}</strong>
      <div className="logo-strip__divider" aria-hidden="true" />
      <div className={moving ? "logo-marquee" : "logo-strip__logos"}>
        <div className={moving ? "logo-marquee__track" : "logo-strip__track"}>
          {list.map((logo, index) => (
            <span key={`${logo.name}-${index}`} className="logo-strip__item" aria-hidden={moving && index >= logos.length}>
              <img src={logo.src} alt={!moving || index < logos.length ? logo.name : ""} width={180} height={46} loading="lazy" />
              {logo.wordmark ? <em>{logo.wordmark}</em> : null}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  useEffect(() => {
    const updateDistance = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      setScrollDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };

    updateDistance();
    const observer = new ResizeObserver(updateDistance);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", updateDistance);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDistance);
    };
  }, []);

  return (
    <section ref={sectionRef} className="work-horizontal-section" style={{ "--work-scroll-distance": `${scrollDistance}px` } as CSSProperties}>
      <div className="work-horizontal-sticky">
        <SectionFrame title="Proof sits right below the fold." copy="Clear promise. Visible proof." accent="yellow" compact className="work-proof-section">
          <div ref={viewportRef} className="work-scroll-viewport" aria-label="Featured case studies">
            <motion.div
              ref={trackRef}
              className="work-scroll"
              style={{ x: reduced ? 0 : x }}
            >
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </motion.div>
          </div>
        </SectionFrame>
      </div>
    </section>
  );
}

function WhoFor() {
  return (
    <SectionFrame
      title={
        <>
          Built for sharp
          <br />
          first impressions.
        </>
      }
      copy="Six ways to earn trust fast."
      accent="blue"
      compact
      className="audience-section"
    >
      <div className="pill-cloud">
        {audienceCards.map((item) => (
          <article key={item.title} className={item.tone}>
            <span>{item.label}</span>
            <div className="audience-card__media" aria-hidden="true">
              <i style={{ backgroundPosition: item.imagePosition }} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

function PricingPreview() {
  return (
    <SectionFrame
      title="Pick the sprint that matches the stage."
      copy="Start focused. Grow the system. Scope custom when the site becomes infrastructure."
      accent="yellow"
      className="pricing-preview-section"
    >
      <div className="pricing-preview" aria-label="Website sprint pricing preview">
        {pricingTiers.map((tier, index) => {
          const isFeatured = index === 1;
          const isCustom = tier.price === "Talk to us";

          return (
            <article
              className={[
                "pricing-preview-card",
                isFeatured ? "is-featured" : "",
                isCustom ? "is-custom" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={tier.name}
            >
              <div className="pricing-preview-card__head">
                <h3>{tier.name}</h3>
                <div className="pricing-preview-card__price">
                  <strong>{isCustom ? "Custom" : tier.price}</strong>
                  <div className="pricing-preview-card__meta">
                    {isFeatured ? (
                      <span className="pricing-preview-card__popular">
                        <Diamond size={13} aria-hidden="true" />
                        Popular
                      </span>
                    ) : null}
                    <span>{tier.timeline}</span>
                  </div>
                </div>
              </div>
              <p>{tier.summary}</p>
              <PremiumButton href="/contact" secondary={!isFeatured}>
                {isCustom ? "Book custom call" : "Start here"}
              </PremiumButton>
              <div className="pricing-preview-card__rule" aria-hidden="true" />
              <ul>
                {tier.includes.slice(0, 5).map((item) => (
                  <li key={item}>
                    <Check size={15} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className="pricing-proof-strip" aria-label="Every sprint includes">
        {["Strategy included", "Design + build", "Launch QA"].map((item) => (
          <span key={item}>
            <Check size={15} aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </SectionFrame>
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
      <a href="/services" className="text-cta">
        View service
        <span className="cta-arrow" aria-hidden="true">
          <img src="/right-arrow.svg" alt="" width={18} height={18} />
        </span>
      </a>
    </motion.article>
  );
}

function ProcessTeaser() {
  return (
    <SectionFrame title="AI creates speed. Humans keep taste." copy="Fast drafts are useful. Final judgment is still human." accent="yellow">
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

function FullBleedMoment() {
  return (
    <section className="full-bleed-moment">
      <div className="full-bleed-moment__inner">
        <h2>
          Sharp is easy.
          <br />
          The fold has to work.
        </h2>
        <p>AI can make a hundred options. FirstFold helps ship the one that matters.</p>
      </div>
    </section>
  );
}

function FounderNote() {
  return (
    <SectionFrame title="The site is the first proof." accent="brown" compact>
      <div className="founder-band">
        <img src="/human-team.png" alt="AI-generated fictional studio team arranging launch materials" width={1792} height={1024} loading="lazy" />
        <figure>
          <blockquote>AI should make the work feel more alive, not less personal.</blockquote>
          <figcaption>FirstFold Studio philosophy</figcaption>
        </figure>
      </div>
      <div className="principle-row">
        {principles.map((principle, index) => (
          <span key={principle}>
            <img src={principleIcons[index]} alt="" width={28} height={28} loading="lazy" />
            {principle}
          </span>
        ))}
      </div>
    </SectionFrame>
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
          <article className={index === 0 ? `service-detail service-detail--primary ${service.color}` : `service-detail ${service.color}`} key={service.name}>
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
      <PageHero title="Less manual work. More intelligent execution." copy="A five-step path from discovery to launch, with real timing and clear AI/human responsibility." />
      <div className="process-list">
        {processSteps.map((step) => (
          <article className="process-row" key={step.label}>
            <span>{step.meta}</span>
            <h2>{step.label}</h2>
            <p>{step.copy}</p>
            <strong>{step.time}</strong>
          </article>
        ))}
      </div>
      <section className="split-panel">
        <div>
          <h2>AI handles volume.</h2>
          <p>Research scans, structure options, copy variants, production checklists, and quality passes.</p>
        </div>
        <div>
          <h2>Humans handle meaning.</h2>
          <p>Positioning, visual taste, story, approvals, edge cases, and final decisions before launch.</p>
        </div>
      </section>
    </main>
  );
}

export function PricingPage() {
  return (
    <main className="page-shell">
      <PageHero title="Transparent website tiers. Custom paths for bigger systems." copy="At minimum, every site sprint includes strategy, design, implementation, responsive QA, and a clear launch handoff." />
      <div className="pricing-grid">
        {pricingTiers.map((tier, index) => (
          <article className={index === 1 ? "pricing-card is-featured" : "pricing-card"} key={tier.name}>
            <span>{tier.timeline}</span>
            <h2>{tier.name}</h2>
            <strong>{tier.price}</strong>
            <p>{tier.summary}</p>
            <ul>
              {tier.includes.map((item) => (
                <li key={item}>
                  <Check size={15} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <PremiumButton href="/contact" secondary={index !== 1}>
              Start here
            </PremiumButton>
          </article>
        ))}
      </div>
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
      <PageHero title="Book the first call. Bring the messy version." copy="Tell us what you are launching. The form opens a ready-to-send email draft so the first note already has useful context." />
      <section className="booking-panel" aria-label="Book a call">
        <div>
          <FoldGlyph />
          <h2>Book a call</h2>
          <p>Use these sample windows as a guide, then send the form below. We reply with a real scheduling link once we understand the sprint shape.</p>
        </div>
        <div className="calendar-embed" aria-label="Calendar availability preview">
          {["Tue", "Wed", "Thu"].map((day, index) => (
            <button type="button" key={day} className={index === 1 ? "is-active" : ""}>
              <span>{day}</span>
              <strong>{index === 0 ? "11:00" : index === 1 ? "14:30" : "16:00"}</strong>
            </button>
          ))}
        </div>
      </section>
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
        <span className="cta-arrow" aria-hidden="true">
          <img src="/right-arrow.svg" alt="" width={18} height={18} />
        </span>
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
      <h1>{title}</h1>
      <span>{copy}</span>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer theme-yellow">
      <div>
        <h2>Make the first fold worth believing.</h2>
      </div>
      <div className="footer-cta">
        <PremiumButton href="/contact">Book a call</PremiumButton>
        <PremiumButton href="/work" secondary>
          See work
        </PremiumButton>
      </div>
      <div className="footer-bottom">
        <span>© 2026 FirstFold Studio</span>
        <nav className="footer-links" aria-label="Footer navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="mailto:hello@firstfold.studio">hello@firstfold.studio</a>
      </div>
      <img className="footer-wordmark" src="/firstfold-wordmark.svg" alt="FirstFold" width={1476} height={319} loading="lazy" />
    </footer>
  );
}
