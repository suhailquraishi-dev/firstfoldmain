import type { Metadata } from "next";
import { AboutPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "About | FirstFold Studio",
  description: "Why the founder-led FirstFold Studio combines AI speed with human strategy, design, and launch judgment.",
};

export default function Page() {
  return <AboutPage />;
}
