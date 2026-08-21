export const navItems = [
  { label: "Home", href: "/", icon: "/icons/nav/house.svg" },
  { label: "Concept work", href: "/work", icon: "/icons/nav/panels-top-left.svg" },
  { label: "Websites", href: "/services", icon: "/icons/nav/sparkle.svg" },
  { label: "Process", href: "/process", icon: "/icons/nav/workflow.svg" },
  { label: "Plans", href: "/pricing", icon: "/icons/nav/badge-dollar-sign.svg" },
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

export const websiteOutcomes = [
  {
    title: "Make the offer obvious",
    copy: "Visitors should understand what you do, who it is for, and why it matters before they need a call.",
  },
  {
    title: "Put proof in the path",
    copy: "Product visuals, examples, and concrete language support the promise instead of decorating around it.",
  },
  {
    title: "Give the next step weight",
    copy: "The hierarchy, content sequence, and calls to action are built around the decision you want visitors to make.",
  },
];

export const launchCapabilities = [
  {
    label: "Strategy",
    title: "A clear launch brief",
    copy: "We turn notes, references, and product context into one focused story before screens multiply.",
    items: ["Audience and offer clarity", "Page plan", "Proof priorities", "Conversion path"],
  },
  {
    label: "Design",
    title: "A visual direction with a point of view",
    copy: "Typography, color, imagery, and interaction choices are made as one system around the story.",
    items: ["Visual direction", "Page hierarchy", "Responsive states", "Interaction language"],
  },
  {
    label: "Build",
    title: "A responsive site, not a static handoff",
    copy: "The approved direction becomes a working website tested across real screens and input methods.",
    items: ["Core page build", "Mobile behavior", "Essential SEO", "Performance pass"],
  },
  {
    label: "Launch",
    title: "A first version ready to use",
    copy: "We finish the details that make a site deployable, understandable, and easier to improve after launch.",
    items: ["Launch QA", "Analytics by plan", "Handoff notes", "Post-launch support"],
  },
];

export const sharedBuildIncludes = [
  "A focused website story",
  "Responsive design and build",
  "Human review of AI-assisted drafts",
  "Essential search setup",
  "Launch QA and handoff",
];

export const projectTypes = ["All", "B2B SaaS", "Founder Service", "Team Workflow"] as const;

export const projects = [
  {
    title: "Signal Desk",
    slug: "signal-desk",
    type: "B2B SaaS",
    status: "Concept study",
    summary: "A proof-led direction for an AI analytics product with the product story up front.",
    audience: "Operations and revenue leaders evaluating an unfamiliar analytics product.",
    brief: "Make a technically dense offer understandable without flattening what makes the product valuable.",
    storyDirection: "Lead with the decision the product improves, then reveal the system through evidence and examples.",
    visualSystem: "Editorial data layouts, compact proof modules, and a restrained signal-yellow accent.",
    responsiveDecisions: "Keep the decision, proof, and demo path adjacent on desktop and sequential on smaller screens.",
    demonstrates: "How a technical B2B site can feel credible before asking visitors to book a demo.",
    accent: "accent-yellow",
    image: "/images/work/signal-desk.png",
    imageX: "center",
    imageY: "center",
    next: "founder-field-notes",
  },
  {
    title: "Founder Field Notes",
    slug: "founder-field-notes",
    type: "Founder Service",
    status: "Concept study",
    summary: "A founder-led website direction for turning expertise into a service people can understand and buy.",
    audience: "Independent experts and founder-led studios moving beyond referrals.",
    brief: "Package a strong point of view into a focused offer without making the founder sound generic.",
    storyDirection: "Move from belief to method to engagement, using the founder voice as the organizing system.",
    visualSystem: "Editorial notes, strong typographic pacing, and reusable content modules.",
    responsiveDecisions: "Preserve reading rhythm and place proof between longer founder-led passages on mobile.",
    demonstrates: "How personal expertise can become a structured, credible website rather than a biography page.",
    accent: "accent-blue",
    image: "/images/work/founder-field-notes.png",
    imageX: "center",
    imageY: "center",
    next: "atlas-enable",
  },
  {
    title: "Atlas Enable",
    slug: "atlas-enable",
    type: "Team Workflow",
    status: "Concept study",
    summary: "A clear website direction for an AI-assisted production workflow with human control visible.",
    audience: "Marketing and GTM teams comparing governed workflow tools.",
    brief: "Explain speed and control together so automation does not read as unmanaged risk.",
    storyDirection: "Show the workflow first, then make ownership, approvals, and repeatability concrete.",
    visualSystem: "Structured diagrams, operational UI fragments, and warm neutral surfaces.",
    responsiveDecisions: "Convert wide workflow diagrams into stepped modules that remain readable without horizontal scrolling.",
    demonstrates: "How an enterprise-facing story can communicate governance without turning into a feature inventory.",
    accent: "accent-brown",
    image: "/images/work/atlas-enable.png",
    imageX: "center",
    imageY: "center",
    next: "signal-desk",
  },
  {
    title: "Northstar Launch",
    slug: "northstar-launch",
    type: "Founder Service",
    status: "Concept study",
    summary: "A compact launch direction for a service business moving beyond referrals.",
    audience: "Small service teams that need a sharper way to explain and sell a repeatable offer.",
    brief: "Bring a scattered offer out of decks and calls and into a concise public buying path.",
    storyDirection: "Start with the result, answer fit and scope questions early, and make pricing context easy to reach.",
    visualSystem: "Large offer statements, modular service explanations, and an action-led page rhythm.",
    responsiveDecisions: "Keep scope and fit information close to each call to action at every breakpoint.",
    demonstrates: "How a small service site can reduce explanation work before the first conversation.",
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
    clientInput: "Product context, current materials, references, and the decision the site needs to support.",
    output: "A focused launch brief and agreed page priorities.",
    reviewPoint: "Confirm the audience, promise, scope, and plan before drafting begins.",
  },
  {
    label: "AI-assisted draft",
    meta: "[N.02/05]",
    time: "24-48 hrs",
    copy: "Generate structure, copy routes, market scans, and visual directions.",
    clientInput: "Fast answers to gaps uncovered during discovery.",
    output: "A working structure, first-copy route, and visual reference field.",
    reviewPoint: "Choose the strongest narrative route while changes are still inexpensive.",
  },
  {
    label: "Human design pass",
    meta: "[N.03/05]",
    time: "3-7 days",
    copy: "Turn raw options into hierarchy, taste, and editorial decisions.",
    clientInput: "Focused feedback against the agreed brief, not open-ended preference gathering.",
    output: "A coherent visual system and responsive page direction.",
    reviewPoint: "Approve hierarchy, tone, and the design system before final build polish.",
  },
  {
    label: "Review round",
    meta: "[N.04/05]",
    time: "2-3 days",
    copy: "Pressure-test content, mobile states, interactions, and conversion paths.",
    clientInput: "One consolidated review with required corrections and factual checks.",
    output: "A launch candidate tested across desktop, tablet, and phone states.",
    reviewPoint: "Sign off the content, actions, and final responsive behavior.",
  },
  {
    label: "Launch",
    meta: "[N.05/05]",
    time: "1 day",
    copy: "Ship, hand over operating notes, and define the next iteration.",
    clientInput: "Domain, analytics, and account access needed for release.",
    output: "The live website, handoff notes, and the support window for the selected plan.",
    reviewPoint: "Complete launch QA and confirm the next owner for every operating task.",
  },
];

export type ResourceSection = {
  heading: string;
  body: string;
  items?: string[];
};

export type ResourceGuide = {
  slug: string;
  label: string;
  title: string;
  summary: string;
  introduction: string;
  readingTime: string;
  sections: ResourceSection[];
};

export const resourceGuides: ResourceGuide[] = [
  {
    slug: "first-fold-checklist",
    label: "Checklist",
    title: "The first-fold checklist",
    summary: "A practical preflight for making the first screen clear, credible, and useful on every device.",
    introduction: "The first fold does not need to explain the entire company. It needs to establish the right promise, enough proof, and a next step worth taking.",
    readingTime: "5 min",
    sections: [
      { heading: "Lead with one job", body: "Decide the single question the first screen must answer. Everything else should support that answer or move below the fold.", items: ["Name the audience", "State the useful outcome", "Remove competing headlines"] },
      { heading: "Make proof visible", body: "Support the promise with something concrete before asking for trust.", items: ["Product interface or real work", "Specific capability or constraint", "Truthful customer or operating proof"] },
      { heading: "Check the action", body: "The main call to action should match the visitor's readiness and remain understandable without surrounding copy.", items: ["Use one primary action", "Give secondary actions less visual weight", "Verify focus, hover, and mobile states"] },
      { heading: "Run the phone test", body: "Read the first screen at a narrow width and confirm the story still lands before artwork or sticky controls crowd it.", items: ["No clipped words", "No hidden action", "No content under fixed UI"] },
    ],
  },
  {
    slug: "ai-launch-stack",
    label: "Stack notes",
    title: "The AI launch stack",
    summary: "Where AI creates useful speed, where human judgment stays essential, and how the work reaches launch.",
    introduction: "AI is most useful when the brief, standards, and review points are explicit. The stack matters less than the operating discipline around it.",
    readingTime: "6 min",
    sections: [
      { heading: "Research and structure", body: "Use AI to scan categories, organize raw notes, expose missing context, and produce routes worth comparing.", items: ["Market and language scan", "Information architecture options", "Question and risk list"] },
      { heading: "Writing and prototyping", body: "Generate variants quickly, then edit toward one voice and one page job.", items: ["Headline and proof routes", "Working page prototypes", "Responsive content checks"] },
      { heading: "Human decisions", body: "A person owns the positioning, hierarchy, visual taste, factual accuracy, and decision to ship.", items: ["Choose rather than average", "Remove unsupported claims", "Review every public action"] },
      { heading: "Verification and handoff", body: "The launch stack ends with tests, browser checks, operating notes, and clear ownership after release.", items: ["Responsive and keyboard QA", "Performance and metadata checks", "Deployment and support notes"] },
    ],
  },
  {
    slug: "founder-website-teardown",
    label: "Teardown",
    title: "A founder website teardown",
    summary: "A focused review method for finding where a founder site loses clarity, trust, or momentum.",
    introduction: "A useful teardown follows the visitor's decisions. It diagnoses what the page makes hard, then prioritizes the smallest changes with the largest effect.",
    readingTime: "7 min",
    sections: [
      { heading: "Clarity", body: "Can a new visitor name the offer and audience after one screen? If not, find the first competing message.", items: ["Offer", "Audience", "Useful result"] },
      { heading: "Trust", body: "Look for the point where the site asks for belief without evidence.", items: ["Real examples", "Specific process", "Accurate scope and pricing"] },
      { heading: "Momentum", body: "Trace the path from interest to action and remove detours that do not answer a buying question.", items: ["Primary CTA", "Plan or scope clarity", "Contact expectations"] },
      { heading: "Priority order", body: "Fix story and proof before polishing decoration. A clear plain page outperforms an impressive page with no decision path.", items: ["Message first", "Proof second", "Interaction and polish third"] },
    ],
  },
];

export function getResourceGuide(slug: string) {
  return resourceGuides.find((resource) => resource.slug === slug);
}

export const pricingTiers = [
  {
    name: "Pro",
    price: "$99",
    timeline: "5–7 days",
    summary: "A sharp first version, ready to launch.",
    benefits: ["Launch-ready, not just designed", "Responsive from day one", "Clean QA before handoff"],
    cta: "Start with Pro",
    includes: ["Up to 3 pages", "Responsive website", "Essential animations", "Basic SEO setup", "Launch QA", "1 revision round", "7-day post-launch support"],
    groups: [
      { label: "Pages", items: ["Up to 3 pages"] },
      { label: "Build", items: ["Responsive website", "Essential animations", "Basic SEO setup", "Launch QA"] },
      { label: "Support", items: ["1 revision round", "7-day post-launch support"] },
    ],
  },
  {
    name: "Plus",
    price: "$199",
    timeline: "7–10 days",
    summary: "Your website, with a little more support behind it.",
    benefits: ["More room for the story", "Analytics ready at launch", "30 days of backup"],
    lead: "Everything in Pro, &",
    cta: "Choose Plus",
    includes: ["Up to 5 pages", "Custom interactions", "Analytics setup", "2 revision rounds", "30-day post-launch support", "Direct access to us", "Website & launch guidance"],
    groups: [
      { label: "Pages", items: ["Up to 5 pages"] },
      { label: "Build", items: ["Custom interactions", "Analytics setup"] },
      { label: "Support", items: ["2 revision rounds", "30-day post-launch support", "Direct access to us", "Website & launch guidance"] },
    ],
  },
  {
    name: "Master",
    price: "$499",
    timeline: "10–14 days",
    summary: "More hands-on help, before and after launch.",
    benefits: ["Priority help when it matters", "Launch strategy included", "Updates after the site goes live"],
    lead: "Everything in Plus, &",
    cta: "Go Master",
    includes: ["Up to 8 pages", "Advanced interactions", "Priority revisions", "60-day post-launch support", "Priority direct access", "Launch strategy session", "Website updates & fixes", "Starter social launch assets", "Priority support for new requirements"],
    groups: [
      { label: "Pages", items: ["Up to 8 pages"] },
      { label: "Build", items: ["Advanced interactions", "Website updates & fixes"] },
      { label: "Strategy", items: ["Launch strategy session", "Starter social launch assets"] },
      { label: "Support", items: ["Priority revisions", "60-day post-launch support", "Priority direct access", "Priority support for new requirements"] },
    ],
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
