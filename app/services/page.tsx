import type { Metadata } from "next";
import { ServicesPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Websites | FirstFold Studio",
  description: "Strategy, design, responsive development, and launch support for focused founder websites.",
};

export default function Page() {
  return <ServicesPage />;
}
