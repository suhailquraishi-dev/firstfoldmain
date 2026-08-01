import type { Metadata } from "next";
import { ClientProviders } from "./components/ClientProviders";
import { Footer } from "./components/SiteSections";
import { LivingNav } from "./components/LivingNav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "FirstFold Studio",
    template: "%s",
  },
  description: "AI-native websites, creator packs, and enterprise packs for founders who need the first fold to work harder.",
  openGraph: {
    title: "FirstFold Studio",
    description: "AI-native websites, creator packs, and enterprise packs for founders.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FirstFold Studio AI-native websites" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstFold Studio",
    description: "AI-native websites, creator packs, and enterprise packs for founders.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <LivingNav />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
