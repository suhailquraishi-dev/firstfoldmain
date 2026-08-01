export const navItems = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const logoRail = [
  { name: "Linear", src: "/logos/linear.svg" },
  { name: "OpenAI", src: "/logos/openai.svg" },
  { name: "Figma", src: "/logos/figma.svg" },
  { name: "Vercel", src: "/logos/vercel.svg" },
  { name: "Y Combinator", src: "/logos/ycombinator.svg" },
  { name: "Arc", src: "/logos/arc.svg" },
];

export const services = [
  {
    name: "AI-Native Websites",
    slug: "ai-native-websites",
    eyebrow: "Lead offer",
    tag: "Website",
    summary: "Editorial websites for founders who need the first screen to sell the company before the first call.",
    included: ["Narrative sprint", "Homepage and core pages", "Responsive build", "Launch QA", "30-day iteration map"],
    who: "Seed teams, solo founders, productized services, and AI companies preparing a sharper market impression.",
    turnaround: "10-21 days",
    price: "From $4.8k",
    split: "AI accelerates research, content variants, structure, and QA. Humans decide story, hierarchy, taste, and final polish.",
    color: "accent-yellow",
  },
  {
    name: "Creator Packs",
    slug: "creator-packs",
    eyebrow: "Founder media",
    tag: "Creator Pack",
    summary: "A compact identity and content operating system for founders turning expertise into a visible point of view.",
    included: ["Positioning angle", "Profile refresh", "Content pillars", "Launch post set", "Reusable AI prompts"],
    who: "Founders, operators, consultants, and expert-led companies that need credible, repeatable visibility.",
    turnaround: "5-8 days",
    price: "From $1.6k",
    split: "AI creates options and production speed. Humans choose the voice, edges, references, and editorial standard.",
    color: "accent-blue",
  },
  {
    name: "Enterprise Packs",
    slug: "enterprise-packs",
    eyebrow: "Scaled systems",
    tag: "Enterprise",
    summary: "Governed creative and AI-assisted production workflows for teams that need consistency across many surfaces.",
    included: ["Workflow audit", "Brand-safe templates", "Approval map", "Team playbook", "Enablement session"],
    who: "Marketing, GTM, and internal brand teams with multiple stakeholders and recurring production needs.",
    turnaround: "3-5 weeks",
    price: "Custom",
    split: "AI handles repeatable drafting and format adaptation. Humans own approvals, risk, narrative, and brand judgment.",
    color: "accent-brown",
  },
];

export const projectTypes = ["All", "Website", "Creator Pack", "Enterprise"] as const;

export const projects = [
  {
    title: "Signal Desk",
    slug: "signal-desk",
    type: "Website",
    summary: "A proof-led AI analytics website that moved the product story above the fold.",
    problem: "The team had credible technology, but the homepage buried the promise under feature language and demo screenshots.",
    approach: "We rebuilt the first fold around one promise, a quiet proof strip, and an executive-friendly product narrative.",
    outcome: "Qualified demo requests increased while the team reused the same narrative in sales decks and investor updates.",
    stat: "42%",
    statLabel: "more qualified calls in the first 30 days",
    accent: "accent-yellow",
    next: "founder-field-notes",
  },
  {
    title: "Founder Field Notes",
    slug: "founder-field-notes",
    type: "Creator Pack",
    summary: "A founder content system for turning weekly operating lessons into a credible public rhythm.",
    problem: "The founder had a strong point of view but no repeatable publishing structure and no time for blank-page writing.",
    approach: "We created content pillars, profile copy, post formats, and prompt rails that preserved the founder's real voice.",
    outcome: "The team shipped four weeks of founder-led content from one working session and kept the cadence intact.",
    stat: "4w",
    statLabel: "of posts created from one founder interview",
    accent: "accent-blue",
    next: "atlas-enable",
  },
  {
    title: "Atlas Enable",
    slug: "atlas-enable",
    type: "Enterprise",
    summary: "A governed AI production layer for a GTM team that needed speed without brand drift.",
    problem: "Multiple teams were recreating launch copy, sales one-pagers, and campaign assets with inconsistent standards.",
    approach: "We mapped the approval path, defined reusable modules, and built an AI/human workflow teams could actually follow.",
    outcome: "Repeat launch assets moved faster while legal and brand stakeholders retained clear decision points.",
    stat: "2.4x",
    statLabel: "faster first drafts without removing human approval",
    accent: "accent-brown",
    next: "signal-desk",
  },
  {
    title: "Northstar Launch",
    slug: "northstar-launch",
    type: "Website",
    summary: "A compact launch site for a productized service moving from referral-only to repeatable inbound.",
    problem: "The offer lived across decks, calls, and founder notes, which made the company difficult to understand quickly.",
    approach: "We turned the offer into a one-screen promise, a short proof path, and a pricing-aware conversion flow.",
    outcome: "The team launched a 6-page site and reused the same structure for outbound landing pages.",
    stat: "6p",
    statLabel: "site shipped with one reusable landing-page pattern",
    accent: "accent-orange",
    next: "signal-desk",
  },
];

export const metrics = [
  { value: "10-21d", label: "typical website launch window" },
  { value: "3", label: "core products for this first studio version" },
  { value: "1", label: "dominant accent per section" },
];

export const processSteps = [
  {
    label: "Discovery call",
    meta: "[N.01/05]",
    time: "45 min",
    copy: "Clarify buyer, offer, timeline, proof, and the job the first fold must perform.",
  },
  {
    label: "AI-assisted draft",
    meta: "[N.02/05]",
    time: "24-48 hrs",
    copy: "Generate structure, page logic, copy routes, competitive scans, and fast visual directions.",
  },
  {
    label: "Human design pass",
    meta: "[N.03/05]",
    time: "3-7 days",
    copy: "Turn raw options into a designed system with hierarchy, taste, and clear editorial decisions.",
  },
  {
    label: "Review round",
    meta: "[N.04/05]",
    time: "2-3 days",
    copy: "Pressure-test content, mobile states, interactions, conversion paths, and launch details.",
  },
  {
    label: "Launch",
    meta: "[N.05/05]",
    time: "1 day",
    copy: "Ship the site, hand over the operating notes, and define the next useful iteration.",
  },
];

export const pricingTiers = [
  {
    name: "Starter Site",
    price: "$4.8k",
    timeline: "10-14 days",
    summary: "A focused launch site for one product, founder, or offer.",
    includes: ["Home", "Services or product page", "About/contact", "Responsive build", "Launch QA"],
  },
  {
    name: "Growth Site",
    price: "$8.5k",
    timeline: "14-21 days",
    summary: "A deeper website system for teams that need work, pricing, and conversion paths.",
    includes: ["5-7 pages", "Case-study templates", "Copy system", "Analytics events", "30-day iteration plan"],
  },
  {
    name: "Custom System",
    price: "Talk to us",
    timeline: "3-5 weeks",
    summary: "For dashboards, portals, gated content, or multi-stakeholder launches.",
    includes: ["Custom scope", "AI/human workflow", "Integrations plan", "Governance notes", "Team handoff"],
  },
];

export const faqs = [
  {
    question: "Is the work automated?",
    answer: "No. AI speeds research, drafts, variants, and quality checks. A human still decides the concept, typography, hierarchy, copy, and final shipped taste.",
  },
  {
    question: "Can the site become a product later?",
    answer: "Yes. The first version is planned so future portals, templates, subscriptions, resources, or dashboards do not require a full redesign.",
  },
  {
    question: "Do you need perfect brand assets first?",
    answer: "No. The website sprint can define the first usable brand system, then turn it into pages, content rules, and launch assets.",
  },
];

export const testimonials = [
  {
    quote: "FirstFold made the company feel clearer in the first five seconds.",
    name: "Mira K.",
    role: "Founder, AI workflow company",
  },
];

export const principles = [
  "AI accelerates; humans decide.",
  "One idea per first fold.",
  "Proof before adjectives.",
  "Systems over one-off pages.",
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
