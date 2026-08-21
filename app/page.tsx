import type { Metadata } from "next";
import { HomePage } from "./components/SiteSections";

export const metadata: Metadata = {
  title: "FirstFold Studio | Launch-Ready Websites",
  description: "Launch-ready founder websites with Pro, Plus, and Master plans at $99, $199, and $499.",
};

export default function Home() {
  return <HomePage />;
}
