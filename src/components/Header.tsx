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
  { href: "/", icon: "home", match: (p) => p === "/" },
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
        <div className={styles.left}>
          {display.location && (
            <MicroLcd>{person.location}</MicroLcd>
          )}
        </div>
        <nav className={styles.track} aria-label="Main">
          {NAV_ITEMS.filter((item) => routes[item.href]).map((item) => {
            const active = item.match(pathname);
            return (
              <Key
                key={item.href}
                href={item.href}
                pressed={active}
                aria-current={active ? "page" : undefined}
                className={styles.navKey}
              >
                <Icon name={item.icon} size="s" />
                {item.label && (
                  <span className={styles.navLabel}>{item.label}</span>
                )}
              </Key>
            );
          })}
        </nav>
        <div className={styles.right}>
          {display.time && (
            <MicroLcd>
              <TimeDisplay timeZone={person.location} />
            </MicroLcd>
          )}
        </div>
      </div>
    </header>
  );
};
