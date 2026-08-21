import type { Metadata } from "next";
import { AboutPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "About | FirstFold Studio",
  description: "Learn how FirstFold uses AI speed and human judgment to help founders get the first public version right.",
  openGraph: {
    title: "About | FirstFold Studio",
    description: "Learn how FirstFold uses AI speed and human judgment to help founders get the first public version right.",
  },
  twitter: {
    title: "About | FirstFold Studio",
    description: "Learn how FirstFold uses AI speed and human judgment to help founders get the first public version right.",
  },
};

export default function Page() {
  return <AboutPage />;
}
