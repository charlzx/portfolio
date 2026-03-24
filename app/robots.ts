import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "CCBot", "Amazonbot", "anthropic-ai", "Claude-Web", "cohere-ai"],
        disallow: "/",
      },
    ],
    sitemap: "https://charlz.dev/sitemap.xml",
  };
}
