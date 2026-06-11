import { getPosts } from "@/app/utils/utils";
import { Badge, Key, Panel, Screen } from "@/components/console";
import { formatDate } from "@/app/utils/formatDate";
import { baseURL } from "@/app/resources";
import { blog } from "@/app/resources/content";

import styles from "./blog.module.scss";

export async function generateMetadata() {
  const title = blog.title;
  const description = blog.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/blog/`,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const WORDS_PER_MINUTE = 200;

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export default function BlogPage() {
  // Drafts never reach the listing.
  const posts = getPosts(["src", "app", "blog", "posts"])
    .filter((post) => !post.metadata.draft)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    );

  return (
    <div className={styles.page}>
      <div className={styles.eyebrow}>SEC.01 — TRANSMISSIONS</div>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.description}>{blog.description}</p>

      {posts.length === 0 ? (
        <div>
          <Screen nodeId="NODE-PUB.00" status="off" className={styles.emptyScreen}>
            <div className={styles.emptyReadout}>NO TRANSMISSIONS YET</div>
          </Screen>
          <p className={styles.emptyInk}>
            Long-form case studies and build logs land here.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {posts.map((post, index) => (
            <Panel as="article" key={post.slug} className={styles.card}>
              <Screen
                nodeId={`NODE-PUB.${String(index + 1).padStart(2, "0")}`}
                status="idle"
              >
                <div className={styles.cardScreen}>
                  <div className={styles.cardTitle}>{post.metadata.title}</div>
                  <div className={styles.cardMeta}>
                    <span>{formatDate(post.metadata.publishedAt)}</span>
                    <span>{readingTime(post.content)} MIN READ</span>
                  </div>
                </div>
              </Screen>
              <div className={styles.cardInk}>
                <Key href={`/blog/${post.slug}`}>Read →</Key>
                {post.metadata.tag && <Badge>{post.metadata.tag}</Badge>}
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
