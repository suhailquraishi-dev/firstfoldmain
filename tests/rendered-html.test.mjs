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
  assert.match(html, /Build what matters\. Scale when ready\./);
  assert.match(html, /Launch-ready websites for your first version, built in 5–7 days/);
  assert.doesNotMatch(html, /Everything you need to take your idea/);
  assert.doesNotMatch(html, /About FirstFold Studio/);
  assert.match(html, /Book a Call/);
  assert.match(html, /View Plans/);
  assert.doesNotMatch(html, /Explore plans/);
  assert.doesNotMatch(html, /Work reel/);
  assert.doesNotMatch(html, /Previous work, packaged like a launch film/);
  assert.doesNotMatch(html, /Booking select builds for Q3 2026/);
  assert.doesNotMatch(html, /Booking for Q3 2026/);
  assert.doesNotMatch(html, /Schedule a call/);
  assert.doesNotMatch(html, /Google Meet or Zoom/);
  assert.match(html, /Need to launch soon\? Explore these\./);
  assert.match(html, /Select from best library, specially curated for you\./);
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
  assert.doesNotMatch(html, /\$120/);
  assert.doesNotMatch(html, /\$200/);
  assert.doesNotMatch(html, /\$450/);
  assert.doesNotMatch(html, /Start with Pro/);
  assert.doesNotMatch(html, /Choose Plus/);
  assert.doesNotMatch(html, /Go Master/);
  assert.match(html, /Intro with FirstFold/);
  assert.match(html, /Tell us what you are building/);
  assert.doesNotMatch(html, /booking-card__full-logo/);
  assert.match(html, /Next open: 14:30/);
  assert.doesNotMatch(html, /Strategy included/);
  assert.doesNotMatch(html, /Design \+ build/);
  assert.doesNotMatch(html, /Three products\. One calm operating system/);
  assert.doesNotMatch(html, /One sharp stack/);
  assert.match(html, /Our Stack/);
  assert.match(html, /10-21d/);
  assert.match(html, /favicon\.png/);
  assert.doesNotMatch(html, /human-team\.png/);
  assert.doesNotMatch(html, /logos\/clients\/client-1\.svg/);
  assert.doesNotMatch(html, /logos\/clients\/client-4\.svg/);
  assert.match(html, /logos\/nextjs\.svg/);
  assert.match(html, /logos\/cursor\.svg/);
  assert.match(html, /firstfold-wordmark\.svg/);
  assert.match(html, /Offer clarity/);
  assert.match(html, /Meet the team/);
  assert.match(html, /Suhail Quraishi/);
  assert.match(html, /Kanak Priya Raj/);
  assert.doesNotMatch(html, /Sharp is easy/);
  assert.doesNotMatch(html, /The fold has to work/);
  assert.doesNotMatch(html, removedStickerPattern);
  assert.doesNotMatch(html, /brain-circuit\.svg/);
  assert.doesNotMatch(html, /Proof sits right below the fold/);
  assert.doesNotMatch(html, /Clear promise\. Visible proof/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("renders the planned routes and removes the starter shell", async () => {
  const [work, services, process, pricing, resources, about, contact, caseStudy, page, layout, packageJson] = await Promise.all([
    render("/work").then((response) => response.text()),
    render("/services").then((response) => response.text()),
    render("/process").then((response) => response.text()),
    render("/pricing").then((response) => response.text()),
    render("/resources").then((response) => response.text()),
    render("/about").then((response) => response.text()),
    render("/contact").then((response) => response.text()),
    render("/work/signal-desk").then((response) => response.text()),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(work, /Case studies with the work doing the talking/);
  assert.match(work, /Creator Pack/);
  assert.match(services, /AI-native websites lead/);
  assert.match(process, /Two tracks\. One clear way in/);
  assert.match(process, /Track A \/ Assets/);
  assert.match(process, /Track B \/ Calls &amp; Plans/);
  assert.match(process, /What you get once you book/);
  assert.match(pricing, /Simple pricing\. Clear paths/);
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
  assert.match(resources, /Field Notes are coming/);
  assert.match(resources, /First-fold checklist/);
  assert.match(resources, /AI launch stack/);
  assert.match(resources, /Founder website teardown/);
  assert.match(resources, /Ask for the checklist/);
  assert.doesNotMatch(resources, resourcesPlaceholderPattern);
  assert.match(about, /A studio for the first fold/);
  assert.match(contact, /Project type/);
  assert.match(contact, /Book a call/);
  assert.match(contact, /14:30/);
  assert.match(contact, /Send inquiry/);
  assert.match(contact, /Opening your email draft/);
  assert.doesNotMatch(contact, contactPlaceholderPattern);
  assert.match(caseStudy, /Problem/);
  assert.match(caseStudy, /case-browser/);
  assert.match(caseStudy, /42%/);
  assert.match(caseStudy, /Next project:[\s\S]*Founder Field Notes/);
  assert.match(page, /<HomePage \/>/);
  assert.match(layout, /openGraph/);
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
