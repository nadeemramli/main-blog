import fs from "fs";
import path from "path";

import classNames from "classnames";
import { notFound } from "next/navigation";

import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import { getPosts } from "@/app/utils/utils";
import { Badge, Key, MicroLcd, Panel, Reveal, Screen } from "@/components/console";
import { CustomMDX } from "@/components/mdx";
import { BADGE, SCREEN_STATUS } from "@/components/ProjectCard";
import ScrollToHash from "@/components/ScrollToHash";

import styles from "./project.module.scss";

interface ProjectsParams {
  params: Promise<{
    slug: string;
  }>;
}

// Only pre-rendered slugs exist — everything else is a hard 404.
export const dynamicParams = false;

/** The rack order (newest first) — node ids must match /projects. */
function getRack() {
  return getPosts(["src", "app", "projects", "projects"]).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );
}

// Screenshots that don't exist on disk never reach the glass (design.md
// §6.4 screen-saver rule) — the idle state renders instead.
const onDisk = (image: string) =>
  image.startsWith("/") &&
  fs.existsSync(path.join(process.cwd(), "public", image));

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getRack().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ProjectsParams) {
  const { slug } = await params;
  const post = getRack().find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? `https://${baseURL}${image}`
    : `https://${baseURL}/og/default.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/projects/${post.slug}`,
      images: [
        {
          url: ogImage,
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

/* The case-study console (design.md §6.6): the project's own device shell
   (same node id as its rack slot), then the manual page — mono metadata
   sidebar with LCD outcome chips, Inter prose at 68ch. */
export default async function Project({ params }: ProjectsParams) {
  const { slug } = await params;
  const rack = getRack();
  const index = rack.findIndex((post) => post.slug === slug);
  const post = rack[index];

  if (!post) {
    notFound();
  }

  const nodeId = `NODE-PRJ.${String(index + 1).padStart(2, "0")}`;
  const status = post.metadata.status;
  const badge = BADGE[status];
  const image = post.metadata.images.find(onDisk);
  const stack =
    post.metadata.tags && post.metadata.tags.length > 0
      ? post.metadata.tags
      : typeof post.metadata.tag === "string" && post.metadata.tag
        ? [post.metadata.tag]
        : [];
  const link = post.metadata.link;

  return (
    <div className={styles.page}>
      <ScrollToHash />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://${baseURL}${post.metadata.image}`
              : `https://${baseURL}/og/default.png`,
            url: `https://${baseURL}/projects/${post.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />

      <div className={styles.head}>
        <div className={styles.eyebrow}>{nodeId} — CASE STUDY</div>
        <h1 className={styles.title}>{post.metadata.title}</h1>
        <Key href="/projects" className={styles.backKey}>
          ← Device Rack
        </Key>
      </div>

      {/* The project's device (design.md §6.4 screen-saver rule). */}
      <Reveal>
        <section data-rail="CASE STUDY">
          <Panel
            as="div"
            padding="lg"
            className={classNames(styles.hero, status === "archived" && styles.archived)}
          >
            <Screen nodeId={nodeId} status={SCREEN_STATUS[status]}>
              {image ? (
                <img
                  src={image}
                  alt={post.metadata.title}
                  className={styles.glassImage}
                  decoding="async"
                />
              ) : (
                <div className={styles.idle}>
                  <div className={styles.idleName}>{post.metadata.title}</div>
                  {post.metadata.metric && (
                    <div className={styles.idleMetric}>{post.metadata.metric}</div>
                  )}
                </div>
              )}
            </Screen>
          </Panel>
        </section>
      </Reveal>

      {/* The manual page (design.md §6.6). */}
      <Reveal>
        <section data-rail="MANUAL" className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sideGroup}>
              <span className={styles.sideLabel}>Published</span>
              <span className={styles.sideValue}>
                {formatDate(post.metadata.publishedAt)}
              </span>
            </div>
            <div className={styles.sideGroup}>
              <span className={styles.sideLabel}>Status</span>
              <div className={styles.sideTags}>
                <Badge led={badge.led}>{badge.label}</Badge>
              </div>
            </div>
            {stack.length > 0 && (
              <div className={styles.sideGroup}>
                <span className={styles.sideLabel}>Stack</span>
                <div className={styles.sideTags}>
                  {stack.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            )}
            {post.metadata.team && post.metadata.team.length > 0 && (
              <div className={styles.sideGroup}>
                <span className={styles.sideLabel}>Team</span>
                <ul className={styles.teamList}>
                  {post.metadata.team.map((member) => (
                    <li key={member.name} className={styles.sideValue}>
                      {member.name}
                      {member.role && (
                        <span className={styles.teamRole}> · {member.role}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {link && (
              <div className={styles.sideGroup}>
                <span className={styles.sideLabel}>Link</span>
                <div className={styles.sideTags}>
                  <Key href={link} target="_blank" rel="noopener noreferrer">
                    Visit →
                  </Key>
                </div>
              </div>
            )}
            {post.metadata.metrics && post.metadata.metrics.length > 0 && (
              <div className={styles.sideGroup}>
                <span className={styles.sideLabel}>Outcomes</span>
                <div className={styles.sideMetrics}>
                  {post.metadata.metrics.map((metric) => (
                    <MicroLcd key={metric.label} label={metric.label}>
                      {metric.value}
                    </MicroLcd>
                  ))}
                </div>
              </div>
            )}
          </aside>
          <article className={styles.prose}>
            <CustomMDX source={post.content} />
          </article>
        </section>
      </Reveal>
    </div>
  );
}
