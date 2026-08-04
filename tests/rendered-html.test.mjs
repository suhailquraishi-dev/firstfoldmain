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
  assert.match(html, /We make the first fold feel/);
  assert.doesNotMatch(html, /About FirstFold Studio/);
  assert.match(html, /Book a strategy call/);
  assert.match(html, /See our work/);
  assert.doesNotMatch(html, /Explore plans/);
  assert.doesNotMatch(html, /Work reel/);
  assert.doesNotMatch(html, /Previous work, packaged like a launch film/);
  assert.match(html, /Clients/);
  assert.match(html, /Creds deck/);
  assert.match(html, /images\/creds\/s1\.jpg/);
  assert.match(html, /Tools we build with/);
  assert.match(html, /FirstFold Studio/);
  assert.match(html, /Pick the sprint that matches the stage/);
  assert.match(html, /Starter Site/);
  assert.match(html, /Growth Site/);
  assert.match(html, /Custom System/);
  assert.match(html, /\$4\.8k/);
  assert.match(html, /\$8\.5k/);
  assert.match(html, /Strategy included/);
  assert.match(html, /Design \+ build/);
  assert.match(html, /Launch QA/);
  assert.doesNotMatch(html, /Three products\. One calm operating system/);
  assert.match(html, /Northstar Launch/);
  assert.match(html, /10-21d/);
  assert.match(html, /firstfold-logo\.svg/);
  assert.match(html, /human-hero\.png/);
  assert.match(html, /human-team\.png/);
  assert.match(html, /logos\/clients\/client-1\.svg/);
  assert.match(html, /logos\/nextjs\.svg/);
  assert.match(html, /logos\/cursor\.svg/);
  assert.match(html, /firstfold-wordmark\.svg/);
  assert.match(html, /images\/work\/work-illustration-sheet\.png/);
  assert.match(html, /The site is the first proof/);
  assert.match(html, /Sharp is easy/);
  assert.doesNotMatch(html, removedStickerPattern);
  assert.match(html, /brain-circuit\.svg/);
  assert.match(html, /Clear promise\. Visible proof/);
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
  assert.match(process, /Less manual work\. More intelligent execution/);
  assert.match(process, /AI handles volume/);
  assert.match(pricing, /Transparent website tiers/);
  assert.match(pricing, /Starter Site/);
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
