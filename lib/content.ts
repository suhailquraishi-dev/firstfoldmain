export const navItems = [
  { label: "Home", href: "/", icon: "/icons/nav/house.svg" },
  { label: "Work", href: "/work", icon: "/icons/nav/panels-top-left.svg" },
  { label: "Services", href: "/services", icon: "/icons/nav/sparkle.svg" },
  { label: "Process", href: "/process", icon: "/icons/nav/workflow.svg" },
  { label: "Pricing", href: "/pricing", icon: "/icons/nav/badge-dollar-sign.svg" },
  { label: "About", href: "/about", icon: "/icons/nav/user-round.svg" },
  { label: "Contact", href: "/contact", icon: "/icons/nav/mail.svg" },
];

export const logoRail = [
  { name: "Vercel", wordmark: "Vercel", src: "/logos/vercel.svg" },
  { name: "Next.js", wordmark: "Next.js", src: "/logos/nextjs.svg" },
  { name: "Cursor", wordmark: "Cursor", src: "/logos/cursor.svg" },
  { name: "Claude", wordmark: "Claude", src: "/logos/claude.svg" },
  { name: "Codex", wordmark: "Codex", src: "/logos/codex.svg" },
  { name: "ChatGPT", wordmark: "ChatGPT", src: "/logos/chatgpt.svg" },
  { name: "Netlify", wordmark: "Netlify", src: "/logos/netlify.svg" },
  { name: "Figma", wordmark: "Figma", src: "/logos/figma.svg" },
  { name: "Xcode", wordmark: "Xcode", src: "/logos/xcode.svg" },
  { name: "Replit", wordmark: "Replit", src: "/logos/replit.svg" },
];

export const clientLogos = [
  { name: "Client 1", src: "/logos/clients/client-1.svg" },
  { name: "Client 2", src: "/logos/clients/client-2.svg" },
  { name: "Client 3", src: "/logos/clients/client-3.svg" },
  { name: "Client 4", src: "/logos/clients/client-4.svg" },
  { name: "Client 5", src: "/logos/clients/client-5.svg" },
  { name: "Client 6", src: "/logos/clients/client-6.svg" },
];

export const services = [
  {
    name: "AI-Native Websites",
    slug: "ai-native-websites",
    eyebrow: "Lead offer",
    tag: "Website",
    summary: "Editorial sites that make the offer clear before the first call.",
    included: ["Narrative sprint", "Homepage and core pages", "Responsive build", "Launch QA", "30-day iteration map"],
    who: "Seed teams, solo founders, productized services, and AI companies sharpening the first impression.",
    turnaround: "10-21 days",
    price: "From $4.8k",
    split: "AI speeds research, structure, variants, and QA. Humans decide story, hierarchy, taste, and polish.",
    color: "accent-yellow",
  },
  {
    name: "Creator Packs",
    slug: "creator-packs",
    eyebrow: "Founder media",
    tag: "Creator Pack",
    summary: "A compact identity and content system for visible founder expertise.",
    included: ["Positioning angle", "Profile refresh", "Content pillars", "Launch post set", "Reusable AI prompts"],
    who: "Founders, operators, consultants, and expert-led companies that need repeatable visibility.",
    turnaround: "5-8 days",
    price: "From $1.6k",
    split: "AI creates options fast. Humans choose the voice, edge, references, and standard.",
    color: "accent-blue",
  },
  {
    name: "Enterprise Packs",
    slug: "enterprise-packs",
    eyebrow: "Scaled systems",
    tag: "Enterprise",
    summary: "Governed AI-assisted workflows for teams shipping across many surfaces.",
    included: ["Workflow audit", "Brand-safe templates", "Approval map", "Team playbook", "Enablement session"],
    who: "Marketing, GTM, and brand teams with recurring production and many stakeholders.",
    turnaround: "3-5 weeks",
    price: "Custom",
    split: "AI handles repeatable drafting. Humans own approvals, risk, narrative, and brand judgment.",
    color: "accent-brown",
  },
];

export const projectTypes = ["All", "Website", "Creator Pack", "Enterprise"] as const;

export const projects = [
  {
    title: "Signal Desk",
    slug: "signal-desk",
    type: "Website",
    summary: "A proof-led AI analytics site with the product story up front.",
    problem: "Strong technology, buried promise.",
    approach: "One promise, visible proof, executive-ready narrative.",
    outcome: "More qualified demos and a reusable sales story.",
    stat: "42%",
    statLabel: "more qualified calls in 30 days",
    accent: "accent-yellow",
    image: "/images/work/signal-desk.png",
    imageX: "center",
    imageY: "center",
    next: "founder-field-notes",
  },
  {
    title: "Founder Field Notes",
    slug: "founder-field-notes",
    type: "Creator Pack",
    summary: "A founder content system for turning lessons into public rhythm.",
    problem: "Strong point of view, no repeatable system.",
    approach: "Pillars, profile copy, post formats, and voice-safe prompts.",
    outcome: "Four weeks of founder-led content from one session.",
    stat: "4w",
    statLabel: "of posts from one founder interview",
    accent: "accent-blue",
    image: "/images/work/founder-field-notes.png",
    imageX: "center",
    imageY: "center",
    next: "atlas-enable",
  },
  {
    title: "Atlas Enable",
    slug: "atlas-enable",
    type: "Enterprise",
    summary: "A governed AI production layer for faster GTM work.",
    problem: "Launch assets moved fast, but standards drifted.",
    approach: "Approval map, reusable modules, and a clear AI/human workflow.",
    outcome: "Faster first drafts with clearer brand control.",
    stat: "2.4x",
    statLabel: "faster drafts with human approval",
    accent: "accent-brown",
    image: "/images/work/atlas-enable.png",
    imageX: "center",
    imageY: "center",
    next: "signal-desk",
  },
  {
    title: "Northstar Launch",
    slug: "northstar-launch",
    type: "Website",
    summary: "A compact launch site for a service moving beyond referrals.",
    problem: "The offer lived across decks, calls, and notes.",
    approach: "One-screen promise, short proof path, pricing-aware flow.",
    outcome: "A 6-page site plus reusable landing-page structure.",
    stat: "6p",
    statLabel: "site with a reusable page pattern",
    accent: "accent-orange",
    image: "/images/work/northstar-launch.png",
    imageX: "center",
    imageY: "center",
    next: "signal-desk",
  },
];

export const metrics = [
  { value: "10-21d", label: "launch window" },
  { value: "3", label: "core offers" },
  { value: "1", label: "clear story per screen" },
];

export const processSteps = [
  {
    label: "Discovery call",
    meta: "[N.01/05]",
    time: "45 min",
    copy: "Clarify buyer, offer, proof, timeline, and the first-fold job.",
  },
  {
    label: "AI-assisted draft",
    meta: "[N.02/05]",
    time: "24-48 hrs",
    copy: "Generate structure, copy routes, market scans, and visual directions.",
  },
  {
    label: "Human design pass",
    meta: "[N.03/05]",
    time: "3-7 days",
    copy: "Turn raw options into hierarchy, taste, and editorial decisions.",
  },
  {
    label: "Review round",
    meta: "[N.04/05]",
    time: "2-3 days",
    copy: "Pressure-test content, mobile states, interactions, and conversion paths.",
  },
  {
    label: "Launch",
    meta: "[N.05/05]",
    time: "1 day",
    copy: "Ship, hand over operating notes, and define the next iteration.",
  },
];

export const pricingTiers = [
  {
    name: "Pro",
    price: "$120",
    timeline: "5–7 days",
    summary: "A sharp first version, ready to launch.",
    cta: "Start with Pro",
    includes: ["Up to 3 pages", "Responsive website", "Essential animations", "Basic SEO setup", "Launch QA", "1 revision round", "7-day post-launch support"],
  },
  {
    name: "Plus",
    price: "$200",
    timeline: "7–10 days",
    summary: "Your website, with a little more support behind it.",
    lead: "Everything in Pro, plus:",
    cta: "Choose Plus",
    includes: ["Up to 5 pages", "Custom interactions", "Analytics setup", "2 revision rounds", "30-day post-launch support", "Direct access to us", "Website & launch guidance"],
  },
  {
    name: "Master",
    price: "$450",
    timeline: "10–14 days",
    summary: "More hands-on help, before and after launch.",
    lead: "Everything in Plus, plus:",
    cta: "Go Master",
    includes: ["Up to 8 pages", "Advanced interactions", "Priority revisions", "60-day post-launch support", "Priority direct access", "Launch strategy session", "Website updates & fixes", "Starter social launch assets", "Priority support for new requirements"],
  },
];

export const faqs = [
  {
    question: "Is the work automated?",
    answer: "No. AI speeds research, drafts, variants, and QA. A human decides concept, type, hierarchy, copy, and shipped taste.",
  },
  {
    question: "Can the site become a product later?",
    answer: "Yes. The first version leaves room for portals, templates, subscriptions, resources, or dashboards.",
  },
  {
    question: "Do you need perfect brand assets first?",
    answer: "No. The sprint can define a usable brand system, then turn it into pages, content rules, and launch assets.",
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
