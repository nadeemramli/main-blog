import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";
// Operator Console tokens — must come after the Once UI sheets (cascade).
import "@/styles/console-tokens.scss";
// Lenis smooth-scroll base rules (html.lenis, .lenis-stopped, data-lenis-prevent).
import "lenis/dist/lenis.css";
// Mobile-only layout rules (page gutter, overflow clip).
import "@/styles/console-mobile.scss";

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
  themeColor: "#1a1b19",
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
// network access. Files live in ./fonts (variable, latin subset).
// design.md §3: Space Grotesk carries all reading and display type.
const primary = localFont({
  src: "./fonts/space-grotesk.woff2",
  variable: "--font-primary",
  display: "swap",
  weight: "300 700",
});

type FontConfig = {
  variable: string;
};

// The secondary (heading) slot maps to the same face.
const secondary = localFont({
  src: "./fonts/space-grotesk.woff2",
  variable: "--font-secondary",
  display: "swap",
  weight: "300 700",
});

const tertiary: FontConfig | undefined = undefined;

// Geist Mono variable — the console "chrome" mono: labels, readouts,
// nav, timestamps, badges, LCD type (design.md §3).
const code = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-code",
  display: "swap",
  weight: "100 900",
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
      // Night is the default console state (design.md §2 v2). The lamp script
      // below removes it before first paint for visitors who chose day.
      data-console="night"
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
              __html: `try{var l=localStorage.getItem("console.lamp");if(l==="day"){document.documentElement.removeAttribute("data-console");var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#d5d2c6")}}catch(e){}`,
            }}
          />
          <ChunkReloadGuard />
          <DitherCanvasMount />
          <Flex fillWidth minHeight="16"></Flex>
          <Header />
          <Flex
            className="page-gutter"
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
