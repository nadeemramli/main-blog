/** One requestAnimationFrame loop for the whole site. PointerLight, Lenis
 *  and (optionally) the R3F scene register here instead of each running
 *  their own rAF. Cancels itself when nothing is registered and pauses while
 *  the tab is hidden. Client-only: never import from a server component. */

type TickFn = (time: number, delta: number) => void;

const fns = new Set<TickFn>();
let raf = 0;
let last = 0;
let hiddenBound = false;

function loop(time: number) {
  raf = requestAnimationFrame(loop);
  const delta = last ? time - last : 16.7;
  last = time;
  fns.forEach((fn) => fn(time, delta));
}

function start() {
  if (raf || typeof document === "undefined" || document.hidden) return;
  last = 0;
  raf = requestAnimationFrame(loop);
}

function stop() {
  if (!raf) return;
  cancelAnimationFrame(raf);
  raf = 0;
}

function bindVisibility() {
  if (hiddenBound || typeof document === "undefined") return;
  hiddenBound = true;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (fns.size) start();
  });
}

export const ticker = {
  /** Registers a per-frame callback; returns its unsubscribe. */
  add(fn: TickFn): () => void {
    bindVisibility();
    fns.add(fn);
    start();
    return () => ticker.remove(fn);
  },
  remove(fn: TickFn) {
    fns.delete(fn);
    if (!fns.size) stop();
  },
};
