import classNames from "classnames";

import { Badge, Gauge, Key, Led, Panel, Reveal, Screen } from "@/components/console";
import HeroScreen from "@/components/home/HeroScreen";
import { ResourceCarousel } from "@/components/ResourceCarousel";
import { getPosts } from "@/app/utils/utils";
import { getHandheldResources } from "@/app/utils/resources";

import { baseURL, routes } from "@/app/resources";
import { home, person, consoleData } from "@/app/resources/content";

import styles from "./home.module.scss";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
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

const FEATURED_SLUG = "building-daylog";

export default function Home() {
  const featured = getPosts(["src", "app", "projects", "projects"]).find(
    (post) => post.slug === FEATURED_SLUG,
  );

  return (
    <div className={styles.page}>
      {/* Hero IS a console (design.md §6.1, locked). */}
      <section>
        <Panel as="div" padding="lg">
          <div className={styles.heroGrid}>
            <div className={styles.gaugeModule}>
              <Gauge
                percent={consoleData.focus.gaugePercent}
                label={consoleData.focus.label}
                value={consoleData.focus.value}
              />
            </div>
            <HeroScreen
              name={person.name}
              roleLine="GROWTH MARKETER · INDIE BUILDER · SYSTEMS THINKER"
              timeZone={person.location}
              stats={consoleData.stats}
            />
            <div className={styles.reference}>
              <div className={styles.refTitle}>Shipping Week</div>
              <div className={styles.week}>
                {consoleData.shippingWeek.map((d, index) => (
                  <div key={index} className={styles.dayCol}>
                    <span className={styles.dayLabel}>{d.day}</span>
                    <span
                      className={classNames(
                        styles.dayMark,
                        d.mark === "ship" && styles.ship,
                      )}
                    />
                  </div>
                ))}
              </div>
              <span className={styles.legend}>● ship · ○ build</span>
              <div className={styles.grille} aria-hidden="true" />
            </div>
          </div>
        </Panel>
        <p className={styles.subline}>{home.subline}</p>
      </section>

      {/* What I'm Working On Now — log module (design.md §6.1). */}
      <Reveal index={0}>
      <section>
        <div className={styles.eyebrow}>SEC.01 — NOW LOG</div>
        <Panel as="div" className={styles.nowModule}>
          <div className={styles.nowHeader}>
            <h2 className={styles.nowTitle}>What I’m Working On Now</h2>
            <Led color="red" pulse label="REC" />
          </div>
          <ul className={styles.log}>
            {consoleData.nowLog.map((line) => (
              <li key={line.entry} className={styles.logLine}>
                <span className={styles.logDate}>{line.date}</span>
                <span aria-hidden="true">▸</span>
                <span>{line.entry}</span>
              </li>
            ))}
          </ul>
          <Key href="/now" className={styles.nowKey}>
            Full Status →
          </Key>
        </Panel>
      </section>
      </Reveal>

      {/* Featured project — large Screen, §6.4 treatment. */}
      {featured && (
        <Reveal index={1}>
        <section>
          <div className={styles.eyebrow}>SEC.02 — FEATURED PROJECT</div>
          <Panel as="div" padding="lg" className={styles.featured}>
            <Screen nodeId="NODE-PRJ.01" status="live">
              {featured.metadata.images[0] && (
                <img
                  src={featured.metadata.images[0]}
                  alt={featured.metadata.title}
                  className={styles.screenImage}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </Screen>
            <div className={styles.featuredInk}>
              <div className={styles.featuredTitleRow}>
                <h2 className={styles.featuredTitle}>
                  {featured.metadata.title}
                </h2>
                <Badge led="mint">Live</Badge>
              </div>
              <p className={styles.featuredSummary}>
                {featured.metadata.summary}
              </p>
              <Key
                href={`/projects/${featured.slug}`}
                className={styles.featuredKey}
              >
                Read Case Study →
              </Key>
            </div>
          </Panel>
        </section>
        </Reveal>
      )}

      {/* Resources rail. */}
      {routes["/resources"] && (
        <Reveal index={2}>
        <section>
          <div className={styles.eyebrow}>SEC.03 — RESOURCES</div>
          <ResourceCarousel resources={getHandheldResources()} contained={true} />
        </section>
        </Reveal>
      )}
    </div>
  );
}
