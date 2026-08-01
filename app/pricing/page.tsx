import type { Metadata } from "next";
import { PricingPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Pricing | FirstFold Studio",
  description: "Transparent FirstFold Studio website tiers and custom system pricing.",
};

export default function Page() {
  return <PricingPage />;
}
