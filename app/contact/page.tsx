import type { Metadata } from "next";
import { ContactPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Contact | FirstFold Studio",
  description: "Book a FirstFold intro call or send a short brief for a Pro, Plus, or Master website launch.",
};

export default function Page() {
  return <ContactPage />;
}
