import type { Metadata } from "next";
import { ProcessPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Process | FirstFold Studio",
  description: "The five-stage, AI-assisted and human-led FirstFold website launch process.",
};

export default function Page() {
  return <ProcessPage />;
}
