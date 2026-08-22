import { HomePage } from "./components/SiteSections";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Founder Website Design & Launch in 5–14 Days",
  description: "FirstFold designs and launches responsive websites for early-stage founders in 5–14 days, with positioning, human-led design, essential SEO, and plans from $99.",
  path: "/",
});

export default function Home() {
  return <HomePage />;
}
