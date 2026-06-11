import {
  BootIn,
  Gauge,
  Led,
  MicroLcd,
  Panel,
  Reveal,
  Screen,
  Screws,
} from "@/components/console";
import AttributeConsole from "@/components/now/AttributeConsole";
import { baseURL } from "@/app/resources";
import { now, consoleData } from "@/app/resources/content";

import styles from "./now.module.scss";

export async function generateMetadata() {
  const title = "Now — Live Status";
  const description = now.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/now`,
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

export default function NowPage() {
  return (
    <div className={styles.page}>
      {/* Header row: title ink, ● LIVE Led, UPDATED chip (design.md §6.3). */}
      <section>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>
            {now.title.replace("🕒", "").trim()}
          </h1>
          <Led color="mint" pulse label="Live" />
          <MicroLcd label="UPDATED">{consoleData.updated}</MicroLcd>
        </div>
        <p className={styles.description}>{now.description}</p>
      </section>

      {/* Status shell: gauge mirrors the hero (one value, two instruments). */}
      <Reveal index={0}>
      <section>
        <div className={styles.eyebrow}>SEC.01 — STATUS LOG</div>
        <Panel as="div" padding="lg">
          <Screws />
          <div className={styles.statusGrid}>
            <Gauge
              percent={consoleData.focus.gaugePercent}
              label={consoleData.focus.label}
              value={consoleData.focus.value}
            />
            <BootIn>
              <Screen nodeId="NODE-NOW.01" status="live">
                <ul className={styles.log}>
                  {consoleData.statusLog.map((line, index) => (
                    <li key={line.entry} className={styles.logLine}>
                      <span className={styles.logDate}>{line.date}</span>
                      <span aria-hidden="true">▸</span>
                      {"link" in line && line.link ? (
                        <a
                          href={line.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.logLink}
                        >
                          {line.entry}
                        </a>
                      ) : (
                        <span>{line.entry}</span>
                      )}
                      {index === consoleData.statusLog.length - 1 && (
                        <span className={styles.tailCursor} aria-hidden="true">
                          ▮
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </Screen>
            </BootIn>
          </div>
        </Panel>
      </section>
      </Reveal>

      {/* Attribute Console (design.md §5.10). */}
      <Reveal index={1}>
      <section>
        <div className={styles.eyebrow}>SEC.02 — ATTRIBUTE CONSOLE</div>
        <AttributeConsole />
      </section>
      </Reveal>
    </div>
  );
}
