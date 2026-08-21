import type { Metadata } from "next";
import { HomePage } from "./components/SiteSections";

export const metadata: Metadata = {
  title: "FirstFold Studio | Launch-Ready Websites",
  description: "Launch-ready websites for founders raising funding, revenue, or first customers in 5-14 days.",
  openGraph: {
    title: "FirstFold Studio | Launch-Ready Websites",
    description: "Launch-ready websites for founders raising funding, revenue, or first customers in 5-14 days.",
  },
  twitter: {
    title: "FirstFold Studio | Launch-Ready Websites",
    description: "Launch-ready websites for founders raising funding, revenue, or first customers in 5-14 days.",
  },
};

export default function Home() {
  return <HomePage />;
}
