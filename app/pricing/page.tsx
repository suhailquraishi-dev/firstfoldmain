import type { Metadata } from "next";
import { PricingPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Plans | FirstFold Studio",
  description: "Compare Pro, Plus, and Master website plans at $99, $199, and $499.",
};

export default function Page() {
  return <PricingPage />;
}
