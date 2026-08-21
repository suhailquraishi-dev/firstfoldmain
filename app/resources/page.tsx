import type { Metadata } from "next";
import { ResourcesPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Resources | FirstFold Studio",
  description: "Read practical FirstFold guides for first-fold clarity, AI-assisted launch work, and founder website reviews.",
  openGraph: {
    title: "Resources | FirstFold Studio",
    description: "Read practical FirstFold guides for first-fold clarity, AI-assisted launch work, and founder website reviews.",
  },
  twitter: {
    title: "Resources | FirstFold Studio",
    description: "Read practical FirstFold guides for first-fold clarity, AI-assisted launch work, and founder website reviews.",
  },
};

export default function Page() {
  return <ResourcesPage />;
}
