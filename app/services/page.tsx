import type { Metadata } from "next";
import { ServicesPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Websites | FirstFold Studio",
  description: "See what FirstFold builds into each launch-ready founder website, from offer clarity to responsive release.",
  openGraph: {
    title: "Websites | FirstFold Studio",
    description: "See what FirstFold builds into each launch-ready founder website, from offer clarity to responsive release.",
  },
  twitter: {
    title: "Websites | FirstFold Studio",
    description: "See what FirstFold builds into each launch-ready founder website, from offer clarity to responsive release.",
  },
};

export default function Page() {
  return <ServicesPage />;
}
