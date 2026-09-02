"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { SCROLL_OFFSET } from "@/components/motion/SmoothScroll";

/* Scrolls to the URL hash on arrival. Goes through Lenis when it is
   mounted (smooth, header offset); native smooth scroll otherwise. */
export default function ScrollToHash() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const element = document.getElementById(hash.slice(1));
    if (!element) return;
    if (lenis) {
      lenis.scrollTo(element, { offset: SCROLL_OFFSET });
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname, lenis]);

  return null;
}
