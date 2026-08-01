import type { Metadata } from "next";
import { ResourcesPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Resources | FirstFold Studio",
  description: "Guides, notes, and templates for modern launch systems.",
};

export default function Page() {
  return <ResourcesPage />;
}
