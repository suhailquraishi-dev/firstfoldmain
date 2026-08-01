import type { Metadata } from "next";
import { AboutPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "About | FirstFold Studio",
  description: "The philosophy and operating principles behind FirstFold Studio.",
};

export default function Page() {
  return <AboutPage />;
}
