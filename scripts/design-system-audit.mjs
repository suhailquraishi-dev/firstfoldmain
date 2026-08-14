import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const sourceDirs = ["app", "lib", "tests"];
const allowedDirectArrowFiles = new Set(["app/components/UIPrimitives.tsx"]);
const allowedRawColorFiles = new Set(["app/globals.css"]);
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
  "--weight-bold",
  "--icon-sm",
  "--icon-md",
  "--icon-lg",
  "--icon-xl",
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
  fontSizes: [],
  fontWeights: [],
};

const primitivesSource = readFileSync(join(root, "app/components/UIPrimitives.tsx"), "utf8");
const globalsSource = readFileSync(join(root, "app/globals.css"), "utf8");

for (const primitive of requiredPrimitives) {
  if (!primitivesSource.includes(`export function ${primitive}`)) {
    violations.push(`app/components/UIPrimitives.tsx missing ${primitive} primitive`);
  }
}

for (const token of requiredTokens) {
  if (!globalsSource.includes(`${token}:`)) {
    violations.push(`app/globals.css missing ${token} token`);
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

    if (line.includes("font-size:")) report.fontSizes.push(`${rel}:${lineNo}`);
    if (line.includes("font-weight:")) report.fontWeights.push(`${rel}:${lineNo}`);
  });
}

console.log("Design system audit");
console.log(`- files scanned: ${files.length}`);
console.log(`- raw color lines: ${report.rawColors.length}`);
console.log(`- raw color lines outside token root: ${report.rawColorsOutsideRoot.length}`);
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

if (violations.length) {
  console.error("\nDesign system violations:");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log("- component primitive rules: passed");
