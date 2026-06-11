import { baseURL } from "@/app/resources";

// Required for output: "export".
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
