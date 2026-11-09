import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FizikaLab — fizikani o‘ynab o‘rgan",
    short_name: "FizikaLab",
    description: "7–11-sinf o‘quvchilari uchun virtual laboratoriya, o‘yinlar va elektron darsliklar.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "uz",
    background_color: "#08287d",
    theme_color: "#08287d",
    categories: ["education"],
    icons: [
      { src: "/pwa-icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa-icon/maskable", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
