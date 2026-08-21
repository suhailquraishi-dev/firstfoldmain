import type { Metadata } from "next";
import { WorkPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Concept Work | FirstFold Studio",
  description: "Explore transparent FirstFold concept studies that show website story, visual direction, and responsive decisions.",
  openGraph: {
    title: "Concept Work | FirstFold Studio",
    description: "Explore transparent FirstFold concept studies that show website story, visual direction, and responsive decisions.",
  },
  twitter: {
    title: "Concept Work | FirstFold Studio",
    description: "Explore transparent FirstFold concept studies that show website story, visual direction, and responsive decisions.",
  },
};

export default function Page() {
  return <WorkPage />;
}
