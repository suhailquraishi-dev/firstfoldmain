import type { Metadata } from "next";
import { ClientProviders } from "./components/ClientProviders";
import { FinalCTA, Footer } from "./components/SiteSections";
import { LivingNav } from "./components/LivingNav";
import { MobileStickyCTAs } from "./components/UIPrimitives";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://firstfoldmain.vercel.app"),
  title: {
    default: "FirstFold Studio",
    template: "%s",
  },
  description: "Launch-ready founder websites with clear strategy, responsive design, human judgment, and plans starting at $99.",
  openGraph: {
    title: "FirstFold Studio",
    description: "Launch-ready founder websites with plans at $99, $199, and $499.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FirstFold Studio AI-native websites" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstFold Studio",
    description: "Launch-ready founder websites with plans at $99, $199, and $499.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <LivingNav />
        <MobileStickyCTAs />
        <ClientProviders>
          {children}
          <FinalCTA />
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
