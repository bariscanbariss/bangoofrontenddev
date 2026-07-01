import { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://bangoo.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/account/",
          "/checkout/",
          "/cart/",
          "/_next/",
          "/admin/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/account/",
          "/checkout/",
          "/cart/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
