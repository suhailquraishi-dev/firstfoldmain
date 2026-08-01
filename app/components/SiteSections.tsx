"use client";

/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Mail, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { faqs, logoRail, metrics, pricingTiers, principles, processSteps, projects, projectTypes, services } from "@/lib/content";

type Project = (typeof projects)[number];

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
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}

export function SectionFrame({
  eyebrow,
  title,
  copy,
  children,
  accent = "yellow",
  compact = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  children: React.ReactNode;
  accent?: "yellow" | "blue" | "brown" | "orange";
  compact?: boolean;
}) {
  return (
    <section className={compact ? `section-frame section-frame--compact theme-${accent}` : `section-frame theme-${accent}`}>
      <div className="section-kicker">
        <FoldGlyph small />
        {eyebrow}
      </div>
      <div className="section-heading">
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
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
      <ServicesPreview />
      <ProcessTeaser />
      <FounderNote />
      <FAQAccordion />
    </main>
  );
}

function Hero() {
  return (
    <section className="hero-shell theme-yellow">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <FoldGlyph small />
            FirstFold Studio / AI-native websites
          </p>
          <h1>Websites that make the first five seconds count.</h1>
          <p className="hero-lede">FirstFold turns founder clarity, AI-assisted production, and human taste into launch-ready websites, creator systems, and enterprise packs.</p>
          <div className="hero-actions">
            <PremiumButton href="/contact">Book a call</PremiumButton>
            <PremiumButton href="/work" secondary>
              See our work
            </PremiumButton>
          </div>
        </div>
        <div className="hero-proof" aria-label="FirstFold operating proof">
          <div className="hero-proof__top">
            <FoldGlyph />
            <span>AI draft</span>
            <span>Human pass</span>
          </div>
          <img src="/human-hero.png" alt="AI-generated fictional founder reviewing a website launch system" width={1536} height={1024} fetchPriority="high" />
          <div className="hero-proof__card">
            <strong>10-21d</strong>
            <span>typical site launch</span>
          </div>
        </div>
      </div>
      <div className="logo-rail" aria-label="Tools and teams FirstFold is designed to sit beside">
        {logoRail.map((logo) => (
          <span key={logo}>{logo}</span>
        ))}
      </div>
    </section>
  );
}

function WorkPreview() {
  return (
    <SectionFrame eyebrow="Selected work" title="Proof sits right below the fold." copy="The public portfolio can grow later. This first site already shows the case-study pattern clients will expect." accent="yellow" compact>
      <div className="work-scroll" aria-label="Featured case studies">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionFrame>
  );
}

function WhoFor() {
  return (
    <SectionFrame eyebrow="Who it is for" title="Built for teams who cannot afford a vague first impression." accent="blue" compact>
      <div className="pill-cloud">
        {["Founders", "AI products", "SaaS teams", "Creator-led brands", "Enterprise GTM", "Productized services"].map((item, index) => (
          <span key={item} className={`pill-${index % 3}`}>
            {item}
          </span>
        ))}
      </div>
    </SectionFrame>
  );
}

function ServicesPreview() {
  return (
    <SectionFrame eyebrow="What FirstFold does" title="Three products. One calm operating system." copy="The website offer leads. Creator and enterprise packs extend the same strategy into media and scaled production." accent="brown">
      <div className="service-grid service-grid--three">
        {services.map((service, index) => (
          <ServicePanel key={service.name} service={service} index={index} primary={index === 0} />
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
      <a href="/services">View service <ArrowRight size={15} aria-hidden="true" /></a>
    </motion.article>
  );
}

function ProcessTeaser() {
  return (
    <SectionFrame eyebrow="Process preview" title="AI creates speed. Humans keep taste." copy="The split is explicit once, then the site lets the work feel premium without overexplaining the tools." accent="yellow">
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.value}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
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
    <SectionFrame eyebrow="Founder note" title="The site is the first proof." accent="brown" compact>
      <div className="founder-band">
        <img src="/human-team.png" alt="AI-generated fictional studio team arranging launch materials" width={1792} height={1024} loading="lazy" />
        <MotionText>
          <figure>
            <blockquote>“AI should make the work feel more alive, not less personal.”</blockquote>
            <figcaption>FirstFold Studio philosophy</figcaption>
          </figure>
        </MotionText>
      </div>
      <div className="principle-row">
        {principles.map((principle) => (
          <span key={principle}>
            <FoldGlyph small />
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
      <div className="project-card__visual" aria-hidden="true">
        <span>{project.stat}</span>
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
      <PageHero eyebrow="Work" title="Case studies with the work doing the talking." copy="Filter by Website, Creator Pack, or Enterprise. Each thumbnail opens into a full case-study structure." />
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
      <PageHero eyebrow="Services" title="AI-native websites lead. Creator and enterprise packs extend the system." copy="Each product shows what is included, who it is for, starting price, turnaround, and how AI and human judgment divide the work." />
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
      <PageHero eyebrow="Process" title="Less manual work. More intelligent execution." copy="A five-step path from discovery to launch, with real timing and clear AI/human responsibility." />
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
      <PageHero eyebrow="Pricing" title="Transparent website tiers. Custom paths for bigger systems." copy="At minimum, every site sprint includes strategy, design, implementation, responsive QA, and a clear launch handoff." />
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
  return (
    <main className="page-shell">
      <PageHero eyebrow="Resources" title="Resources are planned for phase two." copy="The current rebuild keeps the main product focused on Home, Work, Services, Process, Pricing, About, and Contact." />
      <section className="split-panel">
        <div>
          <h2>Coming next</h2>
          <p>Guides, templates, and a client portal can live here once the core studio story is shipped.</p>
        </div>
        <div>
          <h2>For now</h2>
          <p>The homepage brings work and services above the fold, which is the priority for this version.</p>
        </div>
      </section>
    </main>
  );
}

export function AboutPage() {
  return (
    <main className="page-shell">
      <PageHero eyebrow="About" title="A studio for the first fold and everything it implies." copy="FirstFold is built around one belief: the first screen should reveal the quality of the entire company." />
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
      <PageHero eyebrow="Contact" title="Book the first call. Bring the messy version." copy="A clean form for now, ready to connect to a calendar embed or CRM when the production stack is chosen." />
      <section className="booking-panel" aria-label="Book a call">
        <div>
          <FoldGlyph />
          <h2>Book a call</h2>
          <p>Pick a starter slot style here, then use the form below for the project details. The production build can swap this panel for Calendly, SavvyCal, or a native scheduler.</p>
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
        <Send size={16} aria-hidden="true" />
        Send inquiry
      </button>
      <a className="email-fallback" href="mailto:hello@firstfold.studio">
        <Mail size={16} aria-hidden="true" />
        hello@firstfold.studio
      </a>
      <div className={submitted ? "form-status is-visible" : "form-status"} role="status">
        Inquiry noted. The production version can route this into calendar, email, or CRM.
      </div>
    </form>
  );
}

export function FAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <SectionFrame eyebrow="FAQ" title="Simple answers, no theatre." accent="yellow" compact>
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

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <section className="page-hero">
      <p>
        <FoldGlyph small />
        {eyebrow}
      </p>
      <h1>{title}</h1>
      <span>{copy}</span>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer theme-yellow">
      <div>
        <img className="footer-logo" src="/firstfold-logo.svg" alt="FirstFold Studio" width={2044} height={380} loading="lazy" />
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
        <a href="/pricing">Pricing</a>
        <a href="mailto:hello@firstfold.studio">hello@firstfold.studio</a>
      </div>
    </footer>
  );
}
