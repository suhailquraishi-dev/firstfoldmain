import type { Metadata } from "next";
import { ProcessPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Process | FirstFold Studio",
  description: "Follow the five-stage FirstFold process from discovery to live website, with clear inputs, outputs, and review points.",
  openGraph: {
    title: "Process | FirstFold Studio",
    description: "Follow the five-stage FirstFold process from discovery to live website, with clear inputs, outputs, and review points.",
  },
  twitter: {
    title: "Process | FirstFold Studio",
    description: "Follow the five-stage FirstFold process from discovery to live website, with clear inputs, outputs, and review points.",
  },
};

export default function Page() {
  return <ProcessPage />;
}
