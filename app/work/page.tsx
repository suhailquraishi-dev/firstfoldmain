import { WorkPage } from "../components/SiteSections";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Founder Website Concept Design Examples",
  description: "Explore FirstFold concept studies for B2B SaaS, founder services, and team workflows, with story direction, visual systems, and responsive design decisions.",
  path: "/work",
});

export default function Page() {
  return <WorkPage />;
}
