import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";
// Operator Console tokens — must come after the Once UI sheets (cascade).
import "@/styles/console-tokens.scss";
// Lenis smooth-scroll base rules (html.lenis, .lenis-stopped, data-lenis-prevent).
import "lenis/dist/lenis.css";

import classNames from "classnames";

import { Footer, Header, RouteGuard } from "@/components";
import { ChunkReloadGuard } from "@/components/ChunkReloadGuard";
import { Providers } from "@/components/Providers";
import { DitherCanvasMount } from "@/components/console";
import { baseURL, style } from "@/app/resources";

import localFont from "next/font/local";

import { person, home } from "@/app/resources/content";
import { Column, Flex, ToastProvider } from "@/once-ui/components";

export const viewport = {
  themeColor: "#d5d2c6",
};

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
      // The lamp script below may set data-console before React hydrates.
      suppressHydrationWarning
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
          {/* Night visitors must never see day: apply the stored lamp state
              before anything in <body> paints (design.md §2 v2). */}
          <script
            dangerouslySetInnerHTML={{
              __html: `try{var l=localStorage.getItem("console.lamp");if(l==="night"){document.documentElement.setAttribute("data-console","night");var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#1a1b19")}}catch(e){}`,
            }}
          />
          <ChunkReloadGuard />
          <DitherCanvasMount />
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
              <Providers>
                <RouteGuard>{children}</RouteGuard>
              </Providers>
            </Flex>
          </Flex>
          <Footer />
        </Column>
      </ToastProvider>
    </Flex>
  );
}
