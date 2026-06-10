import { Icon } from "@/once-ui/components";
import { Key, Panel } from "@/components/console";
import { person, social, about } from "@/app/resources/content";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Panel as="div" padding="lg" className={styles.shell}>
        <h2 className={styles.headline}>Let’s Build Together</h2>
        <p className={styles.sub}>
          I’m always up for new product ideas, collaborations, or just talking
          shop.
        </p>
        <div className={styles.actions}>
          {/* The page's one mint key (design.md §9). */}
          <Key variant="primary" href={about.calendar.link}>
            Schedule a Call
          </Key>
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
      </Panel>
      <div className={styles.finePrint}>
        © {currentYear} {person.name} —{" "}
        {/* Usage of this template requires attribution — keep the Once UI link. */}
        <a href="https://once-ui.com/templates/magic-portfolio">
          Built on Once UI
        </a>{" "}
        — Kuala Lumpur
      </div>
    </footer>
  );
};
