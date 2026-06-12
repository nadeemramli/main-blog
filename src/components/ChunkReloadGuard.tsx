"use client";

import { useEffect } from "react";

const RELOAD_FLAG = "console-chunk-reload-at";
const RELOAD_COOLDOWN_MS = 30_000;

/* Static hosting invalidates every hashed chunk on each deploy. A tab left
   open across a deploy throws ChunkLoadError on its next navigation when the
   router fetches a chunk that no longer exists. Recover with one hard reload
   (fresh HTML references fresh chunks); the cooldown prevents a reload loop
   if the failure is anything other than a stale deploy. */
function isChunkLoadError(reason: unknown): boolean {
  if (!reason || typeof reason !== "object") return false;
  const { name, message } = reason as { name?: string; message?: string };
  return (
    name === "ChunkLoadError" ||
    /Failed to load chunk|Loading chunk .* failed/i.test(message ?? "")
  );
}

export const ChunkReloadGuard = () => {
  useEffect(() => {
    const onRejection = (event: PromiseRejectionEvent) => {
      if (!isChunkLoadError(event.reason)) return;

      const lastReload = Number(sessionStorage.getItem(RELOAD_FLAG) ?? 0);
      if (Date.now() - lastReload < RELOAD_COOLDOWN_MS) return;

      sessionStorage.setItem(RELOAD_FLAG, String(Date.now()));
      event.preventDefault();
      window.location.reload();
    };

    window.addEventListener("unhandledrejection", onRejection);
    return () => window.removeEventListener("unhandledrejection", onRejection);
  }, []);

  return null;
};
