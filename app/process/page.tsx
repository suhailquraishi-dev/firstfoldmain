import type { Metadata } from "next";
import { ProcessPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Process | FirstFold Studio",
  description: "The AI-assisted, human-led FirstFold Studio launch process.",
};

export default function Page() {
  return <ProcessPage />;
}
