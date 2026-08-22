import { ProcessPage } from "../components/SiteSections";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "5-Step Founder Website Launch Process",
  description: "See FirstFold’s five-stage website process—from discovery and AI-assisted drafting to human design, responsive QA, and launch in 5–14 days.",
  path: "/process",
});

export default function Page() {
  return <ProcessPage />;
}
