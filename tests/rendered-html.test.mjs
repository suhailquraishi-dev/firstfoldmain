import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);
const previewRoot = new URL("../app/_sites-preview/", import.meta.url);

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
  assert.match(html, /About FirstFold Studio/);
  assert.match(html, /Book a strategy call/);
  assert.match(html, /Work reel/);
  assert.match(html, /Previous work, packaged like a launch film/);
  assert.match(html, /Tools we build with/);
  assert.match(html, /FirstFold Studio/);
  assert.match(html, /AI-Native Websites/);
  assert.match(html, /Creator Packs/);
  assert.match(html, /Enterprise Packs/);
  assert.match(html, /Northstar Launch/);
  assert.match(html, /10-21d/);
  assert.match(html, /firstfold-logo\.svg/);
  assert.match(html, /human-hero\.png/);
  assert.match(html, /human-team\.png/);
  assert.match(html, /The site is the first proof/);
  assert.match(html, /Pretty is easy/);
  assert.match(html, /not another beige deck/);
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
  assert.match(resources, /Resources are planned for phase two/);
  assert.match(about, /A studio for the first fold/);
  assert.match(contact, /Project type/);
  assert.match(contact, /Book a call/);
  assert.match(contact, /14:30/);
  assert.match(contact, /Send inquiry/);
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
});
