import { Reveal } from "@/components/console";
import { InfiniteResourceCarousel } from "@/components/InfiniteResourceCarousel";
import { getHandheldResources } from "@/app/utils/resources";
import { baseURL } from "@/app/resources";
import { resources } from "@/app/resources/content";

import styles from "./resources.module.scss";

export async function generateMetadata() {
  const title = resources.title;
  const description = resources.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/resources/`,
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

export default function ResourcesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.eyebrow}>SEC.01 — HANDHELDS</div>
      <h1 className={styles.title}>{resources.title}</h1>
      <p className={styles.description}>{resources.description}</p>
      <Reveal index={0}>
        <InfiniteResourceCarousel resources={getHandheldResources()} />
      </Reveal>
    </div>
  );
}
