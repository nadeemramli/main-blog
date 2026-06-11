import { notFound } from "next/navigation";

import { CustomMDX } from "@/components/mdx";
import ScrollToHash from "@/components/ScrollToHash";
import { Badge, MicroLcd, Screen } from "@/components/console";
import { getPosts } from "@/app/utils/utils";
import { formatDate } from "@/app/utils/formatDate";
import { baseURL } from "@/app/resources";

import styles from "./post.module.scss";

interface BlogParams {
  params: Promise<{
    slug: string;
  }>;
}

const WORDS_PER_MINUTE = 200;

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

// Only pre-rendered (non-draft) slugs exist — everything else is a hard 404.
export const dynamicParams = false;

// output: "export" refuses an empty params list, so when every post is a
// draft we emit one sentinel page (an off device, noindex) instead of
// exposing draft slugs.
const SENTINEL = "no-transmissions";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // Drafts are not rendered anywhere.
  const published = getPosts(["src", "app", "blog", "posts"])
    .filter((post) => !post.metadata.draft)
    .map((post) => ({ slug: post.slug }));
  return published.length > 0 ? published : [{ slug: SENTINEL }];
}

export async function generateMetadata({ params }: BlogParams) {
  const { slug } = await params;

  if (slug === SENTINEL) {
    return {
      title: "No transmissions yet",
      robots: { index: false, follow: false },
    };
  }

  const post = getPosts(["src", "app", "blog", "posts"]).find(
    (post) => post.slug === slug && !post.metadata.draft,
  );

  if (!post) {
    return;
  }

  const { title, publishedAt: publishedTime, summary: description } =
    post.metadata;
  const ogImage = `https://${baseURL}/og/default.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPost({ params }: BlogParams) {
  const { slug } = await params;

  if (slug === SENTINEL) {
    return (
      <div className={styles.page}>
        <Screen nodeId="NODE-PUB.00" status="off">
          <div className={styles.sentinelReadout}>NO TRANSMISSIONS YET</div>
        </Screen>
      </div>
    );
  }

  const post = getPosts(["src", "app", "blog", "posts"]).find(
    (post) => post.slug === slug,
  );

  // Drafts 404 — not rendered anywhere.
  if (!post || post.metadata.draft) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <ScrollToHash />
      <div>
        <div className={styles.eyebrow}>NODE-PUB — TRANSMISSION</div>
        <h1 className={styles.title}>{post.metadata.title}</h1>
      </div>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideGroup}>
            <span className={styles.sideLabel}>Published</span>
            <span className={styles.sideValue}>
              {formatDate(post.metadata.publishedAt)}
            </span>
          </div>
          <div className={styles.sideGroup}>
            <span className={styles.sideLabel}>Reading time</span>
            <span className={styles.sideValue}>
              {readingTime(post.content)} min
            </span>
          </div>
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className={styles.sideGroup}>
              <span className={styles.sideLabel}>Tags</span>
              <div className={styles.sideTags}>
                {post.metadata.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
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
      </div>
    </div>
  );
}
