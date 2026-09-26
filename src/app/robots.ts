import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/login", "/api/logout", "/media/upload"],
    },
    sitemap: "https://blog.kylaustad.dev/sitemap.xml",
  };
}
