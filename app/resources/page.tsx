import type { Metadata } from "next";
import { ResourcesPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Resources | FirstFold Studio",
  description: "Practical FirstFold guides for website clarity, AI-assisted launch work, and founder-site reviews.",
};

export default function Page() {
  return <ResourcesPage />;
}
