import { getPosts } from "@/app/utils/utils";
import { baseURL, routes as routesConfig } from "@/app/resources";

// Required for output: "export".
export const dynamic = "force-static";

export default async function sitemap() {
  // (The old src/app/resources/posts lookup pointed at a directory that no
  // longer exists — removed.)
  const projects = getPosts(["src", "app", "projects", "projects"]).map((post) => ({
    url: `${baseURL}/projects/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  // Drafts never reach the sitemap.
  const blogPosts = getPosts(["src", "app", "blog", "posts"])
    .filter((post) => !post.metadata.draft)
    .map((post) => ({
      url: `${baseURL}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }));

  // Underscore-prefixed routes (e.g. /_lab) are internal — keep them out of
  // the sitemap.
  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route] && !route.startsWith("/_"),
  );

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...projects, ...blogPosts];
}
