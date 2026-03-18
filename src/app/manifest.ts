import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "howlrs.net Products",
    short_name: "howlrs",
    description:
      "howlrs.netが提供するWebアプリ、デスクトップアプリ、APIなどのプロダクト紹介サイト",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f23",
    theme_color: "#0f0f23",
    icons: [
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
