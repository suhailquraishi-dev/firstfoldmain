import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FirstFold Studio",
    short_name: "FirstFold",
    description: "Founder website design and launch in 5–14 days.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff3510",
    icons: [{ src: "/favicon.png", sizes: "512x512", type: "image/png" }],
  };
}
