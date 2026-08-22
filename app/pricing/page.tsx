import { PricingPage } from "../components/SiteSections";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Founder Website Design Pricing: $99–$499",
  description: "Compare FirstFold Pro, Plus, and Master website plans from $99 to $499, including page scope, interactions, SEO setup, revisions, and launch support.",
  path: "/pricing",
});

export default function Page() {
  return <PricingPage />;
}
