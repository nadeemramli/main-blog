import { Icon } from "@/once-ui/components";
import { Key } from "@/components/console";
import { person, social } from "@/app/resources/content";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.topBlock}>
          <div className={styles.headlineBlock}>
            <h2 className={styles.headline}>Follow the build</h2>
            <p className={styles.sub}>
              Essays ship every Saturday. Everything else gets logged along
              the way.
            </p>
          </div>
          <div className={styles.actions}>
            {/* The page's one mint key (design.md §9). */}
            <Key
              variant="primary"
              href="https://essays.nadeemramli.com"
              className={styles.essaysKey}
            >
              Read the Essays
            </Key>
            <div className={styles.iconTray}>
              {social.map(
                (item) =>
                  item.link && (
                    <Key
                      key={item.name}
                      variant="icon"
                      href={item.link}
                      aria-label={item.name}
                      className={styles.iconKey}
                    >
                      <Icon name={item.icon} size="s" />
                    </Key>
                  ),
              )}
            </div>
          </div>
        </div>
        <div className={styles.baseRow}>
          <span className={styles.finePrint}>
            © {currentYear} {person.name}
            <span className={styles.locationSuffix}> — Kuala Lumpur</span>
          </span>
          <div className={styles.grille} aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
};
