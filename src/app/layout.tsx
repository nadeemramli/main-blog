import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";
// Operator Console tokens — must come after the Once UI sheets (cascade).
import "@/styles/console-tokens.scss";

import classNames from "classnames";

import { Footer, Header, RouteGuard } from "@/components";
import { ChunkReloadGuard } from "@/components/ChunkReloadGuard";
import { DitherCanvasMount } from "@/components/console";
import { baseURL, effects, style } from "@/app/resources";

import localFont from "next/font/local";

import { person, home } from "@/app/resources/content";
import { Background, Column, Flex, ToastProvider } from "@/once-ui/components";

export async function generateMetadata() {
  return {
    metadataBase: new URL(`https://${baseURL}`),
    title: home.title,
    description: home.description,
    openGraph: {
      title: `${person.firstName}'s Portfolio`,
      description: "Portfolio website showcasing my work.",
      url: baseURL,
      siteName: `${person.firstName}'s Portfolio`,
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Self-hosted fonts (next/font/local) so the build does not depend on
// network access to fonts.googleapis.com. Files live in ./fonts.
const primary = localFont({
  src: "./fonts/inter.woff2",
  variable: "--font-primary",
  display: "swap",
  weight: "100 900",
});

type FontConfig = {
  variable: string;
};

// design.md: Inter carries all reading and display type, so the secondary
// (heading) slot maps to Inter as well.
const secondary = localFont({
  src: "./fonts/inter.woff2",
  variable: "--font-secondary",
  display: "swap",
  weight: "100 900",
});

const tertiary: FontConfig | undefined = undefined;

// JetBrains Mono variable (wght 400–600) — the console "chrome" mono:
// labels, readouts, nav, timestamps, badges (design.md §3).
const code = localFont({
  src: "./fonts/jetbrains-mono.woff2",
  variable: "--font-code",
  display: "swap",
  weight: "400 600",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <Flex
      as="html"
      lang="en"
      background="page"
      data-neutral={style.neutral}
      data-brand={style.brand}
      data-accent={style.accent}
      data-solid={style.solid}
      data-solid-style={style.solidStyle}
      data-theme={style.theme}
      data-border={style.border}
      data-surface={style.surface}
      data-transition={style.transition}
      className={classNames(
        primary.variable,
        secondary ? secondary.variable : "",
        tertiary ? tertiary.variable : "",
        code.variable
      )}
    >
      <ToastProvider>
        <Column
          // Browser extensions (e.g. ColorZilla) inject attributes like
          // `cz-shortcut-listen` onto <body> before React hydrates, causing a
          // benign hydration mismatch. Suppress it just for this element.
          suppressHydrationWarning
          // The Operator Console desk surface (design.md §1).
          style={{ minHeight: "100vh", background: "var(--console-bg)" }}
          as="body"
          fillWidth
          margin="0"
          padding="0"
        >
          <ChunkReloadGuard />
          <DitherCanvasMount />
          <Background
            mask={{
              cursor: effects.mask.cursor,
              x: effects.mask.x,
              y: effects.mask.y,
              radius: effects.mask.radius,
            }}
            gradient={{
              display: effects.gradient.display,
              x: effects.gradient.x,
              y: effects.gradient.y,
              width: effects.gradient.width,
              height: effects.gradient.height,
              tilt: effects.gradient.tilt,
              colorStart: effects.gradient.colorStart,
              colorEnd: effects.gradient.colorEnd,
              opacity: effects.gradient.opacity as
                | 0
                | 10
                | 20
                | 30
                | 40
                | 50
                | 60
                | 70
                | 80
                | 90
                | 100,
            }}
            dots={{
              display: effects.dots.display,
              color: effects.dots.color,
              size: effects.dots.size as any,
              opacity: effects.dots.opacity as any,
            }}
            grid={{
              display: effects.grid.display,
              color: effects.grid.color,
              width: effects.grid.width as any,
              height: effects.grid.height as any,
              opacity: effects.grid.opacity as any,
            }}
            lines={{
              display: effects.lines.display,
              opacity: effects.lines.opacity as any,
            }}
          />
          <Flex fillWidth minHeight="16"></Flex>
          <Header />
          <Flex
            position="relative"
            zIndex={0}
            fillWidth
            paddingY="l"
            paddingX="l"
            horizontal="center"
            flex={1}
          >
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <Footer />
        </Column>
      </ToastProvider>
    </Flex>
  );
}
