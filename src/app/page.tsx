import React from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  Column,
  Scroller,
  RevealFx,
} from "@/once-ui/components";
import Projects from "@/components/projects/Projects";

import { baseURL, routes } from "@/app/resources";
import { home, about, person } from "@/app/resources/content";
import { Posts } from "@/components/resource/Posts";

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

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Column fillWidth paddingY="l" gap="m">
        <Column maxWidth="s">
          <RevealFx
            translateY="4"
            fillWidth
            horizontal="start"
            paddingBottom="m"
          >
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="start"
            paddingBottom="m"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="12" delay={0.4} horizontal="start">
            <Button
              id="about"
              data-border="rounded"
              href="/about"
              variant="secondary"
              size="m"
              arrowIcon
            >
              <Flex gap="8" vertical="center">
                {about.avatar.display && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>

      {routes["/resources"] && (
        <Column fillWidth gap="xl">
          <Flex fillWidth gap="24" mobileDirection="column">
            <Flex flex={1} paddingLeft="l">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Browse Resources
              </Heading>
            </Flex>
            <Flex flex={3} paddingX="20">
              <Scroller>
                <Posts range={[1, 4]} columns="1" />
              </Scroller>
            </Flex>
          </Flex>
        </Column>
      )}

      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[2, 2]} />
      </RevealFx>
    </Column>
  );
}
