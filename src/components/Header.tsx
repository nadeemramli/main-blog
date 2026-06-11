"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Icon } from "@/once-ui/components";
import { Key, MicroLcd } from "@/components/console";
import styles from "@/components/Header.module.scss";

import { routes, display } from "@/app/resources";
import { person, about, resources, projects } from "@/app/resources/content";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  timeZone,
  locale = "en-GB",
}) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

type NavItem = {
  href: keyof typeof routes;
  icon: string;
  label?: string;
  match: (pathname: string) => boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", icon: "home", label: "Home", match: (p) => p === "/" },
  {
    href: "/about",
    icon: "person",
    label: about.label,
    match: (p) => p.startsWith("/about"),
  },
  { href: "/now", icon: "calendar", label: "Now", match: (p) => p.startsWith("/now") },
  {
    href: "/projects",
    icon: "grid",
    label: projects.label,
    match: (p) => p.startsWith("/projects"),
  },
  {
    href: "/blog",
    icon: "clipboard",
    label: "Blog",
    match: (p) => p.startsWith("/blog"),
  },
  {
    href: "/resources",
    icon: "book",
    label: resources.label,
    match: (p) => p.startsWith("/resources"),
  },
];

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <header className={styles.header}>
      <div className={styles.strip}>
        {display.location && (
          <MicroLcd className={`${styles.lcdChip} ${styles.location}`}>
            <span className={styles.syncDot} aria-hidden="true" />
            {person.location}
          </MicroLcd>
        )}
        <nav className={styles.track} aria-label="Main">
          {NAV_ITEMS.filter((item) => routes[item.href]).map((item) => {
            const active = item.match(pathname);
            return (
              <Key
                key={item.href}
                href={item.href}
                pressed={active}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? `${styles.navKey} ${styles.navKeyActive}`
                    : styles.navKey
                }
              >
                <span className={styles.navIcon}>
                  <Icon name={item.icon} size="s" />
                </span>
                <span className={styles.navLabel}>{item.label}</span>
              </Key>
            );
          })}
        </nav>
        {display.time && (
          <MicroLcd className={styles.lcdChip}>
            <TimeDisplay timeZone={person.location} />
          </MicroLcd>
        )}
      </div>
    </header>
  );
};
