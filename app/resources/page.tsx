import { ResourcesPage } from "../components/SiteSections";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Founder Website Guides & Launch Checklists",
  description: "Practical founder website guides covering first-fold clarity, AI-assisted production, responsive hierarchy, conversion paths, and launch readiness.",
  path: "/resources",
});

export default function Page() {
  return <ResourcesPage />;
}
