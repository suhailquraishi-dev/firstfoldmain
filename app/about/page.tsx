import { AboutPage } from "../components/SiteSections";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About FirstFold: AI Speed, Human Website Design",
  description: "Meet FirstFold, a founder-led website studio combining AI-assisted research and drafting with human positioning, visual judgment, responsive design, and launch QA.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
