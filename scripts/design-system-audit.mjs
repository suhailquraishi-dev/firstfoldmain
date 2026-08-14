import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const sourceDirs = ["app", "lib", "tests"];
const allowedDirectArrowFiles = new Set(["app/components/UIPrimitives.tsx"]);
const allowedRawColorFiles = new Set(["app/globals.css"]);

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
  fontSizes: [],
  fontWeights: [],
};

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
    }

    if (line.includes("font-size:")) report.fontSizes.push(`${rel}:${lineNo}`);
    if (line.includes("font-weight:")) report.fontWeights.push(`${rel}:${lineNo}`);
  });
}

console.log("Design system audit");
console.log(`- files scanned: ${files.length}`);
console.log(`- raw color lines: ${report.rawColors.length}`);
console.log(`- font-size declarations: ${report.fontSizes.length}`);
console.log(`- font-weight declarations: ${report.fontWeights.length}`);

if (report.rawColors.length) {
  console.log("- raw color sample:");
  report.rawColors.slice(0, 12).forEach((entry) => console.log(`  ${entry}`));
}

if (violations.length) {
  console.error("\nDesign system violations:");
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log("- component primitive rules: passed");
