import type { Metadata } from "next";

export const SITE_NAME = "FirstFold Studio";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://firstfold.co.in").replace(/\/$/, "");
export const DEFAULT_DESCRIPTION =
  "FirstFold designs and launches responsive founder websites in 5–14 days, combining AI-assisted production with human strategy, design, and QA.";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  image = "/og.png",
  imageAlt = "FirstFold Studio founder website design and launch",
  imageWidth = 1568,
  imageHeight = 1003,
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images: [{ url: image, width: imageWidth, height: imageHeight, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
