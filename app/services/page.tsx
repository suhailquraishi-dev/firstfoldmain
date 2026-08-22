import { ServicesPage } from "../components/SiteSections";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Founder Website Design Services",
  description: "See what goes into a FirstFold founder website: offer positioning, page strategy, responsive design, development, essential SEO, launch QA, and handoff.",
  path: "/services",
});

export default function Page() {
  return <ServicesPage />;
}
