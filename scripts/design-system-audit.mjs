import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const sourceDirs = ["app", "lib", "tests"];
const allowedDirectArrowFiles = new Set(["app/components/UIPrimitives.tsx"]);
const allowedRawColorFiles = new Set(["app/globals.css"]);
const designSystem = JSON.parse(readFileSync(join(root, "lib/design-system.json"), "utf8"));
const requiredPrimitives = ["CtaArrow", "MeetingIcons", "FoldGlyph", "MotionText", "PremiumButton", "TextCta", "StatusBadge", "SectionFrame"];
const requiredTokens = [
  "--color-page",
  "--color-ink",
  "--color-ink-soft",
  "--color-ink-strong",
  "--color-ink-warm",
  "--color-ink-muted",
  "--color-ink-subtle",
  "--color-ink-cool",
  "--color-ink-faint",
  "--color-surface",
  "--color-surface-soft",
  "--color-surface-warm",
  "--color-line",
  "--color-line-soft",
  "--color-line-strong",
  "--color-dark",
  "--color-dark-panel",
  "--color-on-dark",
  "--color-on-dark-muted",
  "--color-on-dark-soft",
  "--color-on-dark-subtle",
  "--color-on-dark-faint",
  "--color-action",
  "--color-action-soft",
  "--color-highlight",
  "--color-highlight-soft",
  "--color-highlight-wash",
  "--color-highlight-chip",
  "--color-info",
  "--color-info-soft",
  "--color-info-wash",
  "--color-peach-soft",
  "--color-process-blue",
  "--color-process-neutral",
  "--color-neutral-soft",
  "--color-neutral-line",
  "--color-neutral-hover",
  "--color-neutral-chip",
  "--type-micro",
  "--type-eyebrow",
  "--type-caption",
  "--type-label",
  "--type-body-compact",
  "--type-body-fixed",
  "--type-body-md",
  "--type-body-xl",
  "--type-subhead",
  "--type-subhead-lg",
  "--type-card-title-fixed",
  "--type-mobile-title",
  "--type-nav",
  "--type-body-sm",
  "--type-body",
  "--type-body-lg",
  "--type-card-title",
  "--type-section-title",
  "--type-page-title",
  "--type-hero-title",
  "--weight-light",
  "--weight-regular",
  "--weight-medium",
  "--weight-semibold",
  "--weight-strong",
  "--weight-bold",
  "--weight-extrabold",
  "--weight-black",
  "--icon-sm",
  "--icon-md",
  "--icon-lg",
  "--icon-xl",
  "--icon-filter-none",
  "--icon-filter-black",
  "--icon-filter-muted",
  "--icon-filter-muted-strong",
  "--icon-filter-on-dark",
  "--icon-filter-action",
  "--icon-filter-yellow",
];

function walk(dir) {
  const entries = readdirSync(dir);
  return entries.flatMap((entry) => {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if ([".next", "dist", "out", "node_modules"].includes(entry)) return [];
      return walk(fullPath);
    }
    return [fullPath];
  });
}

const files = sourceDirs.flatMap((dir) => walk(join(root, dir))).filter((file) => /\.(css|tsx?|mjs|json)$/.test(file));
const violations = [];
const report = {
  rawColors: [],
  rawColorsOutsideRoot: [],
  rawAlphaColorsOutsideRoot: [],
  fontSizes: [],
  fontWeights: [],
};

const primitivesSource = readFileSync(join(root, "app/components/UIPrimitives.tsx"), "utf8");
const globalsSource = readFileSync(join(root, "app/globals.css"), "utf8");

function manifestItems(key) {
  const items = designSystem[key];
  if (!Array.isArray(items)) {
    violations.push(`lib/design-system.json missing ${key} array`);
    return [];
  }
  return items;
}

for (const primitive of requiredPrimitives) {
  if (!primitivesSource.includes(`export function ${primitive}`)) {
    violations.push(`app/components/UIPrimitives.tsx missing ${primitive} primitive`);
  }
}

const manifestTokens = [
  ...manifestItems("colors").map((item) => item.token),
  ...manifestItems("typeScale").map((item) => item.token),
  ...manifestItems("weights").map((item) => item.token),
  ...manifestItems("icons").flatMap((item) => item.tokens ?? []),
].filter(Boolean);

for (const token of new Set([...requiredTokens, ...manifestTokens])) {
  if (!globalsSource.includes(`${token}:`)) {
    violations.push(`app/globals.css missing ${token} token`);
  }
}

for (const item of manifestItems("icons")) {
  if (item.primitive && !primitivesSource.includes(`export function ${item.primitive}`)) {
    violations.push(`lib/design-system.json references missing icon primitive ${item.primitive}`);
  }
  if (item.asset && !primitivesSource.includes(item.asset)) {
    violations.push(`lib/design-system.json icon asset ${item.asset} is not used by UIPrimitives`);
  }
}

for (const item of manifestItems("components")) {
  if (item.primitive && !primitivesSource.includes(`export function ${item.primitive}`)) {
    violations.push(`lib/design-system.json references missing component primitive ${item.primitive}`);
  }
  if (!Array.isArray(item.selectors) || item.selectors.length === 0) {
    violations.push(`lib/design-system.json component ${item.primitive ?? "unknown"} has no selectors`);
    continue;
  }
  for (const selector of item.selectors) {
    if (!globalsSource.includes(selector)) {
      violations.push(`lib/design-system.json selector ${selector} is missing from app/globals.css`);
    }
  }
}

for (const file of files) {
  const rel = relative(root, file);
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  const isComponentCode = /\.(tsx?|mjs)$/.test(rel);

  lines.forEach((line, index) => {
    const lineNo = index + 1;

    if (rel !== "app/components/UIPrimitives.tsx" && line.includes('from "@/app/components/SiteSections"')) {
      violations.push(`${rel}:${lineNo} imports reusable UI from SiteSections instead of UIPrimitives`);
    }

    if (isComponentCode && !allowedDirectArrowFiles.has(rel) && (line.includes("right-arrow.svg") || line.includes('className="cta-arrow"'))) {
      violations.push(`${rel}:${lineNo} uses direct CTA arrow markup instead of CtaArrow`);
    }

    if (rel === "app/globals.css" && line.includes("right-arrow.svg")) {
      violations.push(`${rel}:${lineNo} uses direct CTA arrow asset in CSS instead of CtaArrow markup`);
    }

    if (isComponentCode && !allowedDirectArrowFiles.has(rel) && line.includes("google-meet-2026.webp")) {
      violations.push(`${rel}:${lineNo} uses direct Meet icon markup instead of MeetingIcons`);
    }

    const colorMatches = line.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [];
    if (colorMatches.length && !allowedRawColorFiles.has(rel)) {
      violations.push(`${rel}:${lineNo} uses raw color ${colorMatches.join(", ")} outside globals.css`);
    }
    if (colorMatches.length) {
      report.rawColors.push(`${rel}:${lineNo} ${colorMatches.join(", ")}`);
      if (rel === "app/globals.css" && lineNo > 150) {
        report.rawColorsOutsideRoot.push(`${rel}:${lineNo} ${colorMatches.join(", ")}`);
      }
    }

    const alphaColorMatches = line.match(/\brgba?\([^)]*\)/g) ?? [];
    if (alphaColorMatches.length && rel === "app/globals.css" && lineNo > 150) {
      report.rawAlphaColorsOutsideRoot.push(`${rel}:${lineNo} ${alphaColorMatches.join(", ")}`);
    }

    if (line.includes("font-size:")) {
      report.fontSizes.push(`${rel}:${lineNo}`);
      if (rel === "app/globals.css" && lineNo > 150 && /font-size:\s*[0-9]+px/.test(line)) {
        violations.push(`${rel}:${lineNo} uses raw fixed font-size outside type tokens`);
      }
      if (rel === "app/globals.css" && lineNo > 150 && /font-size:\s*clamp\(/.test(line)) {
        violations.push(`${rel}:${lineNo} uses raw responsive font-size outside type tokens`);
      }
    }
    if (line.includes("font-weight:")) {
      report.fontWeights.push(`${rel}:${lineNo}`);
      if (rel === "app/globals.css" && lineNo > 150 && /font-weight:\s*[0-9]+/.test(line)) {
        violations.push(`${rel}:${lineNo} uses raw font-weight outside font registration`);
      }
    }

    if (rel === "app/globals.css" && lineNo > 150 && /filter:\s*(invert\(|brightness\(0)/.test(line)) {
      violations.push(`${rel}:${lineNo} uses raw icon filter outside icon tokens`);
    }
  });
}

console.log("Design system audit");
console.log(`- files scanned: ${files.length}`);
console.log(`- raw color lines: ${report.rawColors.length}`);
console.log(`- raw color lines outside token root: ${report.rawColorsOutsideRoot.length}`);
console.log(`- raw rgb/rgba lines outside token root: ${report.rawAlphaColorsOutsideRoot.length}`);
console.log(`- font-size declarations: ${report.fontSizes.length}`);
console.log(`- font-weight declarations: ${report.fontWeights.length}`);
console.log(`- required primitives: ${requiredPrimitives.length}`);
console.log(`- required foundation tokens: ${requiredTokens.length}`);

if (report.rawColors.length) {
  console.log("- raw color sample:");
  report.rawColors.slice(0, 12).forEach((entry) => console.log(`  ${entry}`));
}

if (report.rawColorsOutsideRoot.length) {
  console.log("- raw colors outside token root sample:");
  report.rawColorsOutsideRoot.slice(0, 12).forEach((entry) => console.log(`  ${entry}`));
  violations.push(`app/globals.css has ${report.rawColorsOutsideRoot.length} raw color line(s) outside the token root`);
}

if (report.rawAlphaColorsOutsideRoot.length) {
  console.log("- raw rgb/rgba colors outside token root sample:");
  report.rawAlphaColorsOutsideRoot.slice(0, 12).forEach((entry) => console.log(`  ${entry}`));
  violations.push(`app/globals.css has ${report.rawAlphaColorsOutsideRoot.length} raw rgb/rgba color line(s) outside the token root`);
}

if (violations.length) {
  console.error("\nDesign system violations:");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log("- component primitive rules: passed");
