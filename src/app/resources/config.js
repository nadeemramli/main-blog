const baseURL = "nadeemramli.com";

const routes = {
  "/": true,
  "/about": true,
  "/projects": true,
  "/resources": true,
  "/now": true,
  "/blog": true,
};

// Enable password protection on selected routes
// Set password in pages/api/authenticate.ts
const protectedRoutes = {
  "/projects/automate-design-handovers-with-a-figma-to-code-pipeline": true,
};

// Operator Console (design.md): light-only, emerald is the nearest enum to
// mint #76D2B6, red is reserved for the status-indicator language.
const style = {
  theme: "light", // dark | light
  neutral: "sand", // sand | gray | slate
  brand: "emerald", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "red", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "contrast", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "rounded", // rounded | playful | conservative
  surface: "filled", // filled | translucent
  transition: "all", // all | micro | macro
};

// All ambient effects are off: the Operator Console desk surface (WebGL
// dither, Phase 1+) replaces the Once UI Background layer entirely.
const effects = {
  mask: {
    cursor: false,
    x: 0,
    y: 0,
    radius: 75,
  },
  gradient: {
    display: false,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: false,
    size: 1,
    color: "brand-on-background-weak",
    opacity: 20,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
};

const display = {
  location: true,
  time: true,
};

export { routes, protectedRoutes, effects, style, display, baseURL };
