import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);
const previewRoot = new URL("../app/_sites-preview/", import.meta.url);
const resourcesPlaceholderPattern = new RegExp(["phase", "two"].join(" ") + "|" + ["planned", "for"].join(" "), "i");
const contactPlaceholderPattern = new RegExp(["production", "version"].join(" ") + "|" + ["can", "swap"].join(" "), "i");
const removedStickerPattern = new RegExp(["not", "another", "beige", "deck"].join(" "), "i");

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the FirstFold Studio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>FirstFold Studio \| AI-Native Websites<\/title>/i);
  assert.doesNotMatch(html, /home-loader__logo/);
  assert.match(html, /home-scroll-surface/);
  assert.match(html, /Helping/);
  assert.match(html, /Founders Raise/);
  assert.match(html, /Next Million/);
  assert.match(html, /Launch-ready websites for your first version, starting in 5–7 days/);
  assert.doesNotMatch(html, /Everything you need to take your idea/);
  assert.doesNotMatch(html, /About FirstFold Studio/);
  assert.match(html, /Book a Call/);
  assert.match(html, /Plans at \$99/);
  assert.match(html, /mobile-sticky-ctas/);
  assert.match(html, /Mobile primary actions/);
  assert.doesNotMatch(html, /Explore plans/);
  assert.doesNotMatch(html, /Work reel/);
  assert.doesNotMatch(html, /Previous work, packaged like a launch film/);
  assert.doesNotMatch(html, /Booking select builds for Q3 2026/);
  assert.doesNotMatch(html, /Booking for Q3 2026/);
  assert.doesNotMatch(html, /Schedule a call/);
  assert.doesNotMatch(html, /Google Meet or Zoom/);
  assert.match(html, /Ready to Go Live Website Library/);
  assert.match(html, /Launch-ready references, curated for founders\./);
  assert.match(html, /Browse independent website references to discuss useful patterns, then shape an original first version\./);
  assert.match(html, /B2B SaaS/);
  assert.match(html, /Developer/);
  assert.match(html, /Regulated/);
  assert.match(html, /Consumer/);
  assert.match(html, /Transaction data intelligence/);
  assert.match(html, /Agentic web CMS/);
  assert.match(html, /AI support QA/);
  assert.match(html, /Business identity verification/);
  assert.match(html, /Secure code sandboxes/);
  assert.match(html, /Personal wellness companion/);
  assert.match(html, /images\/showcase\/spade\.png/);
  assert.match(html, /images\/showcase\/prismic\.png/);
  assert.match(html, /images\/showcase\/solidroad\.png/);
  assert.match(html, /images\/showcase\/duna\.png/);
  assert.match(html, /images\/showcase\/daytona\.png/);
  assert.match(html, /images\/showcase\/holo\.png/);
  assert.match(html, /More Options/);
  assert.match(html, /images\/homepage-banner\.webp/);
  assert.match(html, /Looking for something more curated/);
  assert.doesNotMatch(html, /Pre-built website systems/);
  assert.doesNotMatch(html, /Landing Pages/);
  assert.doesNotMatch(html, /Advanced Apps/);
  assert.doesNotMatch(html, /Business Tools/);
  assert.doesNotMatch(html, /60% Off/);
  assert.match(html, /Start with what actually matters/);
  assert.match(html, /Made for people starting something/);
  assert.match(html, /Founders/);
  assert.match(html, /From idea to something people can actually use/);
  assert.match(html, /AI products/);
  assert.match(html, /Make the product feel as good as the technology behind it/);
  assert.match(html, /SaaS teams/);
  assert.match(html, /Creator-led brands/);
  assert.match(html, /Enterprise GTM/);
  assert.match(html, /Productized services/);
  assert.match(html, /Package what you do\. Make it easier to buy/);
  assert.doesNotMatch(html, /Trusted by/);
  assert.doesNotMatch(html, /Proof, packaged/);
  assert.doesNotMatch(html, /images\/creds\/s1\.jpg/);
  assert.doesNotMatch(html, /Tools we build with/);
  assert.doesNotMatch(html, /One sharp stack/);
  assert.match(html, /FirstFold Studio/);
  assert.doesNotMatch(html, /We can build it/);
  assert.doesNotMatch(html, /Or stick around/);
  assert.doesNotMatch(html, /Choose the support you need/);
  assert.match(html, /\$99/);
  assert.match(html, /\$199/);
  assert.match(html, /\$499/);
  assert.match(html, /Start with Pro/);
  assert.match(html, /Choose Plus/);
  assert.match(html, /Go Master/);
  assert.match(html, /Make the first/);
  assert.match(html, /version count\./);
  assert.match(html, /Tell us what you are building/);
  assert.doesNotMatch(html, /booking-card__full-logo/);
  assert.doesNotMatch(html, /Next open: 14:30/);
  assert.doesNotMatch(html, /Strategy included/);
  assert.doesNotMatch(html, /Design \+ build/);
  assert.doesNotMatch(html, /Three products\. One calm operating system/);
  assert.doesNotMatch(html, /One sharp stack/);
  assert.match(html, /Our Stack/);
  assert.match(html, /tool-ui-node__label/);
  assert.match(html, /Next\.js/);
  assert.doesNotMatch(html, /capability-icon/);
  assert.match(html, /Strong foundations\. A clearer path to launch\./);
  assert.match(html, /5–14 days/);
  assert.match(html, /Discovery call/);
  assert.match(html, /AI-assisted draft/);
  assert.match(html, /Human design pass/);
  assert.match(html, /Review round/);
  assert.match(html, /Launch/);
  assert.match(html, /See the full process/);
  assert.match(html, /favicon\.svg/);
  assert.doesNotMatch(html, /human-team\.png/);
  assert.doesNotMatch(html, /logos\/clients\/client-1\.svg/);
  assert.doesNotMatch(html, /logos\/clients\/client-4\.svg/);
  assert.match(html, /logos\/nextjs\.svg/);
  assert.match(html, /logos\/cursor\.svg/);
  assert.match(html, /firstfold-logo-nav\.svg/);
  assert.match(html, /Offer clarity/);
  assert.match(html, /Hear from the founder/);
  assert.match(html, /Suhail Quraishi/);
  assert.match(html, /A lot of founders start with big ambitions/);
  assert.doesNotMatch(html, /Kanak Priya Raj/);
  assert.doesNotMatch(html, /Sharp is easy/);
  assert.doesNotMatch(html, /The fold has to work/);
  assert.doesNotMatch(html, removedStickerPattern);
  assert.doesNotMatch(html, /brain-circuit\.svg/);
  assert.doesNotMatch(html, /Proof sits right below the fold/);
  assert.doesNotMatch(html, /Clear promise\. Visible proof/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("renders distinct secondary routes and removes conflicting offer copy", async () => {
  const [work, services, process, pricing, resources, resourceGuide, about, contact, conceptStudy, page, layout, packageJson] = await Promise.all([
    render("/work").then((response) => response.text()),
    render("/services").then((response) => response.text()),
    render("/process").then((response) => response.text()),
    render("/pricing").then((response) => response.text()),
    render("/resources").then((response) => response.text()),
    render("/resources/first-fold-checklist").then((response) => response.text()),
    render("/about").then((response) => response.text()),
    render("/contact").then((response) => response.text()),
    render("/work/signal-desk").then((response) => response.text()),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(work, /Website directions built to make an idea easier to see/);
  assert.match(work, /Concept study/);
  assert.match(work, /B2B SaaS/);
  assert.doesNotMatch(work, /42%|more qualified calls/);
  assert.match(services, /A launch-ready website with the thinking already inside it/);
  assert.match(services, /Clarity first\. Proof close behind/);
  assert.match(services, /Every plan includes/);
  assert.doesNotMatch(services, /Creator Packs|Enterprise Packs|\$4\.8k/);
  assert.match(process, /Five visible stages\. No mystery at the end/);
  assert.match(process, /Your input/);
  assert.match(process, /FirstFold output/);
  assert.match(process, /Review point/);
  assert.match(process, /Visible work/);
  assert.doesNotMatch(process, /Track A|Track B|\$4\.8k/);
  assert.match(pricing, /Plans starting at \$99/);
  assert.match(pricing, /Pro/);
  assert.match(pricing, /Plus/);
  assert.match(pricing, /Master/);
  assert.match(pricing, /\$99/);
  assert.match(pricing, /\$199/);
  assert.match(pricing, /\$499/);
  assert.match(pricing, /Start with Pro/);
  assert.match(pricing, /Choose Plus/);
  assert.match(pricing, /Go Master/);
  assert.doesNotMatch(pricing, /Strategy included/);
  assert.doesNotMatch(pricing, /Design \+ build/);
  assert.match(pricing, /Launch QA/);
  assert.match(resources, /Practical notes for a clearer first launch/);
  assert.match(resources, /The first-fold checklist/);
  assert.match(resources, /The AI launch stack/);
  assert.match(resources, /A founder website teardown/);
  assert.match(resourceGuide, /The first-fold checklist/);
  assert.match(resourceGuide, /Lead with one job/);
  assert.match(resourceGuide, /Run the phone test/);
  assert.doesNotMatch(resources, resourcesPlaceholderPattern);
  assert.match(about, /A founder-led studio for getting the first version right/);
  assert.match(about, /AI accelerates the making/);
  assert.doesNotMatch(about, /human-team\.png/);
  assert.match(contact, /Plan interest/);
  assert.match(contact, /Tell us what needs to go live/);
  assert.doesNotMatch(contact, /14:30|\$4\.8k|Creator Pack|Enterprise Pack/);
  assert.match(contact, /Send inquiry/);
  assert.match(contact, /Opening your email draft/);
  assert.doesNotMatch(contact, contactPlaceholderPattern);
  assert.match(conceptStudy, /About this study/);
  assert.match(conceptStudy, /exploratory FirstFold concept/);
  assert.match(conceptStudy, /Story direction/);
  assert.match(conceptStudy, /Responsive decisions/);
  assert.doesNotMatch(conceptStudy, /42%|commercial results<\/span>/);
  assert.match(conceptStudy, /Next direction:[\s\S]*Founder Field Notes/);
  assert.match(page, /<HomePage \/>/);
  assert.match(layout, /openGraph/);
  assert.match(layout, /MobileStickyCTAs/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(previewRoot));
  await access(new URL("public/og.png", templateRoot));
  await access(new URL("public/firstfold-logo.svg", templateRoot));
  await access(new URL("public/favicon.svg", templateRoot));
  await access(new URL("public/human-hero.png", templateRoot));
  await access(new URL("public/human-team.png", templateRoot));
  await access(new URL("public/images/audience-card-sheet.png", templateRoot));
  await access(new URL("public/images/work/signal-desk.png", templateRoot));
  await access(new URL("public/images/work/founder-field-notes.png", templateRoot));
  await access(new URL("public/images/work/atlas-enable.png", templateRoot));
  await access(new URL("public/images/work/northstar-launch.png", templateRoot));
  await access(new URL("public/images/work/work-illustration-sheet.png", templateRoot));
  await access(new URL("public/images/creds/s1.jpg", templateRoot));
  await access(new URL("public/images/creds/s2.jpg", templateRoot));
  await access(new URL("public/images/creds/s3.jpg", templateRoot));
  await access(new URL("public/images/creds/s4.jpg", templateRoot));
  await access(new URL("public/images/creds/s5.jpg", templateRoot));
  await access(new URL("public/logos/clients/client-1.svg", templateRoot));
  await access(new URL("public/logos/nextjs.svg", templateRoot));
  await access(new URL("public/logos/cursor.svg", templateRoot));
});
