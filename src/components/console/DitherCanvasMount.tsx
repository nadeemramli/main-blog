"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Post-hydration, client-only — the desk grain must never touch LCP
// (design.md §9).
const DitherCanvas = dynamic(() => import("./DitherCanvas"), { ssr: false });

export default function DitherCanvasMount() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <DitherCanvas /> : null;
}
