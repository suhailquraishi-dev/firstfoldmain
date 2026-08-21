import type { Metadata } from "next";
import { ContactPage } from "../components/SiteSections";

export const metadata: Metadata = {
  title: "Contact | FirstFold Studio",
  description: "Send FirstFold a short website launch brief and get the clearest next step for your Pro, Plus, or Master plan.",
  openGraph: {
    title: "Contact | FirstFold Studio",
    description: "Send FirstFold a short website launch brief and get the clearest next step for your Pro, Plus, or Master plan.",
  },
  twitter: {
    title: "Contact | FirstFold Studio",
    description: "Send FirstFold a short website launch brief and get the clearest next step for your Pro, Plus, or Master plan.",
  },
};

export default function Page() {
  return <ContactPage />;
}
