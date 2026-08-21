import type { Metadata } from "next";
import { WorkPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Concept Work | FirstFold Studio",
  description: "Transparent website concept studies showing FirstFold story, design, and responsive thinking.",
};

export default function Page() {
  return <WorkPage />;
}
