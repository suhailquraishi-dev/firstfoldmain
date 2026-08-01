import type { Metadata } from "next";
import { ContactPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Contact | FirstFold Studio",
  description: "Start a FirstFold Studio launch inquiry.",
};

export default function Page() {
  return <ContactPage />;
}
