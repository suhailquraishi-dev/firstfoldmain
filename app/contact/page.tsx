import { ContactPage } from "../components/SiteSections";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Start a Founder Website Project",
  description: "Share your website goals, launch timing, and preferred FirstFold plan. Get a clear next step for a responsive founder website starting at $99.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
