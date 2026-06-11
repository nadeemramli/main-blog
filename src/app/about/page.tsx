import { Icon } from "@/once-ui/components";
import { Badge, Key, MicroLcd, Panel, Reveal, Screws } from "@/components/console";
import SideProjectCard from "@/components/about/SideProjectCard";
import HowIWorkSteps from "@/components/about/HowIWorkSteps";
import ToolsStackGrid from "@/components/about/ToolsStackGrid";
import TableOfContents from "@/components/TableOfContents";
import { baseURL } from "@/app/resources";
import { person, about, social } from "@/app/resources/content";

import styles from "./about.module.scss";

export async function generateMetadata() {
  const title = about.title;
  const description = about.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/about`,
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

export default function About() {
  const tocItems = [
    { id: "introduction", title: "Introduction" },
    { id: "work-experience", title: "Work Experience" },
    { id: "side-projects", title: "Side Projects" },
    { id: "how-i-work", title: "How I Work" },
    { id: "tools-stack", title: "Tools & Stack" },
  ];

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: about.hero.tagline,
            url: `https://${baseURL}/about`,
            image: `${baseURL}/images/${person.avatar}`,
            sameAs: social
              .filter((item) => item.link && !item.link.startsWith("mailto:"))
              .map((item) => item.link),
          }),
        }}
      />

      {about.tableOfContent.display && <TableOfContents items={tocItems} />}

      {/* Identity faceplate (design.md §6.2). */}
      <section id="introduction">
        <Panel as="div" padding="lg">
          <div className={styles.faceplate}>
            <div className={styles.portraitWell}>
              <img
                src={person.avatar}
                alt={person.name}
                className={styles.portrait}
              />
            </div>
            <div className={styles.identity}>
              <h1 className={styles.name}>{person.name}</h1>
              <span className={styles.roleLine}>{about.hero.title}</span>
              <div className={styles.identityMeta}>
                <MicroLcd>{person.location}</MicroLcd>
                {social.map(
                  (item) =>
                    item.link && (
                      <Key
                        key={item.name}
                        variant="icon"
                        href={item.link}
                        aria-label={item.name}
                      >
                        <Icon name={item.icon} size="s" />
                      </Key>
                    ),
                )}
              </div>
            </div>
          </div>
          <span className={styles.silkscreen} aria-hidden="true">
            UNIT NR-01 · KUALA LUMPUR
          </span>
        </Panel>
      </section>

      {/* Introduction — printed manual prose. */}
      {about.intro.display && (
        <Reveal index={0}>
        <section>
          <div className={styles.eyebrow}>SEC.01 — OPERATOR&apos;S MANUAL</div>
          <div className={styles.bio}>{about.intro.description}</div>
        </section>
        </Reveal>
      )}

      {/* Work experience as a maintenance log (design.md §6.2). */}
      {about.work.display && (
        <Reveal index={0}>
        <section id="work-experience">
          <div className={styles.eyebrow}>SEC.02 — MAINTENANCE LOG</div>
          <h2 className={styles.sectionTitle}>{about.work.title}</h2>
          <Panel as="div" padding="lg" className={styles.logShell}>
            <Screws />
            {about.work.experiences.map((experience, index) => (
              <div key={`${experience.company}-${index}`} className={styles.role}>
                <div className={styles.roleMeta}>
                  <span className={styles.timeframe}>
                    {experience.timeframe}
                  </span>
                  <span className={styles.company}>{experience.company}</span>
                  <span className={styles.roleTitle}>{experience.role}</span>
                  {"location" in experience && experience.location && (
                    <span className={styles.location}>
                      {experience.location}
                    </span>
                  )}
                  {"badge" in experience && experience.badge && (
                    <Badge className={styles.roleBadge}>
                      {experience.badge}
                    </Badge>
                  )}
                </div>
                <div className={styles.roleBody}>
                  {experience.achievements.map((achievement, i) => (
                    <p key={i} className={styles.achievement}>
                      {achievement}
                    </p>
                  ))}
                  {experience.images && experience.images.length > 0 && (
                    <div className={styles.roleImages}>
                      {experience.images.map((image, i) => (
                        <div key={i} className={styles.imageWell}>
                          <img
                            src={image.src}
                            alt={image.alt}
                            className={styles.roleImage}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Panel>
        </section>
        </Reveal>
      )}

      {/* Side projects as small devices. */}
      {about.sideProjects.display && (
        <Reveal index={0}>
        <section id="side-projects">
          <div className={styles.eyebrow}>SEC.03 — SIDE PROJECTS</div>
          <h2 className={styles.sectionTitle}>{about.sideProjects.title}</h2>
          <div className={styles.sideGrid}>
            {about.sideProjects.projects.map((project, index) => (
              <SideProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </section>
        </Reveal>
      )}

      {/* How I Work — numbered keys 01–05 (design.md §6.2). */}
      {about.howIWork.display && (
        <Reveal index={0}>
        <section id="how-i-work">
          <div className={styles.eyebrow}>SEC.04 — OPERATING SEQUENCE</div>
          <h2 className={styles.sectionTitle}>{about.howIWork.title}</h2>
          <p className={styles.sectionSub}>{about.howIWork.subtitle}</p>
          <Panel as="div" padding="lg">
            <HowIWorkSteps steps={about.howIWork.steps} />
          </Panel>
        </section>
        </Reveal>
      )}

      {/* Tools & Stack — the switchboard. */}
      {about.toolsStack.display && (
        <Reveal index={0}>
        <section id="tools-stack">
          <div className={styles.eyebrow}>SEC.05 — SWITCHBOARD</div>
          <h2 className={styles.sectionTitle}>{about.toolsStack.title}</h2>
          <p className={styles.sectionSub}>{about.toolsStack.subtitle}</p>
          <Panel as="div" padding="lg">
            <Screws />
            <ToolsStackGrid categories={about.toolsStack.categories} />
          </Panel>
        </section>
        </Reveal>
      )}
    </div>
  );
}
