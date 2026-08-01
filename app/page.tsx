import type { Metadata } from "next";
import { HomePage } from "./components/SiteSections";

export const metadata: Metadata = {
  title: "FirstFold Studio | AI-Native Websites",
  description: "AI-native websites, creator packs, and enterprise packs for founders who need the first fold to work harder.",
};

export default function Home() {
  return <HomePage />;
}
