import type { Metadata } from "next";
import { PricingPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Plans | FirstFold Studio",
  description: "Compare Pro, Plus, and Master by scope, timing, support, and what is included before launch.",
  openGraph: {
    title: "Plans | FirstFold Studio",
    description: "Compare Pro, Plus, and Master by scope, timing, support, and what is included before launch.",
  },
  twitter: {
    title: "Plans | FirstFold Studio",
    description: "Compare Pro, Plus, and Master by scope, timing, support, and what is included before launch.",
  },
};

export default function Page() {
  return <PricingPage />;
}
