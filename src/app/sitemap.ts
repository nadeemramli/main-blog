import { getPosts } from "@/app/utils/utils";
import { baseURL, routes as routesConfig } from "@/app/resources";

export default async function sitemap() {
  const resources = getPosts(["src", "app", "resources", "posts"]).map((post) => ({
    url: `${baseURL}/resources/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const projects = getPosts(["src", "app", "projects", "projects"]).map((post) => ({
    url: `${baseURL}/projects/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route]);

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...resources, ...projects];
}
