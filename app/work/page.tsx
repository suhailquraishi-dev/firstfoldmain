import type { Metadata } from "next";
import { WorkPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Work | FirstFold Studio",
  description: "Editorial case-study placeholders for FirstFold Studio launch systems.",
};

export default function Page() {
  return <WorkPage />;
}
