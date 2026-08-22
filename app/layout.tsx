import type { Metadata } from "next";
import { ClientProviders } from "./components/ClientProviders";
import { FinalCTA, Footer } from "./components/SiteSections";
import { LivingNav } from "./components/LivingNav";
import { MobileStickyCTAs } from "./components/UIPrimitives";
import { DEFAULT_DESCRIPTION, serializeJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Founder Website Design & Launch | FirstFold Studio",
    template: "%s | FirstFold Studio",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Website design and development",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Founder Website Design & Launch | FirstFold Studio",
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og.png", width: 1568, height: 1003, alt: "FirstFold Studio founder website design and launch" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder Website Design & Launch | FirstFold Studio",
    description: DEFAULT_DESCRIPTION,
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/firstfold-icon.svg`,
        image: `${SITE_URL}/og.png`,
        description: DEFAULT_DESCRIPTION,
        founder: { "@type": "Person", name: "Suhail Quraishi" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#founder-website-service`,
        name: "Founder website design and launch",
        description: "Responsive founder websites shaped through positioning, human-led design, development, essential SEO setup, launch QA, and post-launch support.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "FirstFold website plans",
          itemListElement: [
            { "@type": "Offer", name: "Pro", price: "99", priceCurrency: "USD", url: `${SITE_URL}/pricing` },
            { "@type": "Offer", name: "Plus", price: "199", priceCurrency: "USD", url: `${SITE_URL}/pricing` },
            { "@type": "Offer", name: "Master", price: "499", priceCurrency: "USD", url: `${SITE_URL}/pricing` },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      </head>
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
