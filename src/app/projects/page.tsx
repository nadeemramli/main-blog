import fs from "fs";
import path from "path";

import { getPosts } from "@/app/utils/utils";
import { ProjectRack } from "@/components/projects/ProjectRack";
import type { ProjectCardProps } from "@/components/ProjectCard";
import { baseURL } from "@/app/resources";
import { person, projects } from "@/app/resources/content";

import styles from "./projects.module.scss";

export async function generateMetadata() {
  const title = projects.title;
  const description = projects.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/projects/`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function ProjectsPage() {
  const allProjects = getPosts(["src", "app", "projects", "projects"]).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  // Several MDX files reference screenshots that don't exist on disk; only
  // images that actually resolve reach the glass — everything else gets the
  // generated idle state (design.md §6.4 screen-saver rule).
  const onDisk = (image: string) =>
    image.startsWith("/") &&
    fs.existsSync(path.join(process.cwd(), "public", image));

  // Stable node IDs by rack position — they don't change when filtering.
  const rackProjects: ProjectCardProps[] = allProjects.map((post, index) => ({
    slug: post.slug,
    title: post.metadata.title,
    summary: post.metadata.summary,
    images: post.metadata.images.filter(onDisk),
    status: post.metadata.status,
    metric: post.metadata.metric,
    nodeId: `NODE-PRJ.${String(index + 1).padStart(2, "0")}`,
  }));

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: projects.title,
            description: projects.description,
            url: `https://${baseURL}/projects`,
            image: `${baseURL}/og?title=${encodeURIComponent(projects.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
            hasPart: allProjects.map((project) => ({
              "@type": "CreativeWork",
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/projects/${project.slug}`,
              image: project.metadata.images[0]
                ? `https://${baseURL}${project.metadata.images[0]}`
                : undefined,
            })),
          }),
        }}
      />
      <div className={styles.eyebrow}>SEC.01 — DEVICE RACK</div>
      <h1 className={styles.title}>{projects.title}</h1>
      <p className={styles.description}>{projects.description}</p>
      <ProjectRack projects={rackProjects} />
    </div>
  );
}
