"use client";

import { useEffect, useState } from "react";
import { Column, Flex, Text } from "@/once-ui/components";

interface TOCItem {
  id: string;
  title: string;
  level?: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observerOptions = {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Column
      position="fixed"
      left="0"
      paddingLeft="24"
      gap="32"
      hide="s"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
        zIndex: 5,
      }}
    >
      {items.map((item) => (
        <Column key={item.id} gap="12">
          <Flex
            gap="8"
            vertical="center"
            cursor="interactive"
            onClick={() => scrollToSection(item.id)}
            style={{
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                minWidth: "var(--static-space-16)",
                height: "var(--static-space-1)",
                backgroundColor:
                  activeSection === item.id
                    ? "var(--brand-solid-strong)"
                    : "var(--neutral-solid-strong)",
                transition: "all 0.2s ease",
              }}
            />
            <Text
              variant="body-default-s"
              style={{
                color:
                  activeSection === item.id
                    ? "var(--brand-solid-strong)"
                    : "var(--neutral-on-background-weak)",
                transition: "all 0.2s ease",
              }}
            >
              {item.title}
            </Text>
          </Flex>
        </Column>
      ))}
    </Column>
  );
}
