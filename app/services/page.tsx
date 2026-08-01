import type { Metadata } from "next";
import { ServicesPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Services | FirstFold Studio",
  description: "Premium launch services for social systems, creator brands, enterprise teams, and AI-native websites.",
};

export default function Page() {
  return <ServicesPage />;
}
