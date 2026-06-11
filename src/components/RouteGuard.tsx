"use client";

import { usePathname } from "next/navigation";
import { routes } from "@/app/resources";
import { Key, Panel, Screen } from "@/components/console";
import { PageTransition } from "@/components/console/PageTransition";
import styles from "./RouteGuard.module.scss";

interface RouteGuardProps {
  children: React.ReactNode;
}

/* Whether a route is enabled is a synchronous lookup against a static
   object — ordinary navigation must never pass through a loading state. */
function isRouteEnabled(pathname: string | null): boolean {
  if (!pathname) return false;

  if (pathname in routes) {
    return routes[pathname as keyof typeof routes];
  }

  const dynamicRoutes = ["/resources", "/projects", "/blog"] as const;
  for (const route of dynamicRoutes) {
    if (pathname.startsWith(route) && routes[route]) {
      return true;
    }
  }

  return false;
}

// Static export: no server auth. This guard keeps the route-registry
// gating (NO SIGNAL — 404 for unregistered paths); the locked-device
// Screen state lives on in the component library for future use.
const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const routeEnabled = isRouteEnabled(pathname);
  if (!routeEnabled) {
    return (
      <div className={styles.center}>
        <Panel className={styles.devicePanel}>
          <Screen nodeId="NODE-404" status="off">
            <div className={styles.readout}>NO SIGNAL — 404</div>
            <div className={styles.dim}>THIS CHANNEL IS NOT BROADCASTING</div>
          </Screen>
          <Key href="/" className={styles.backKey}>
            Return to Console
          </Key>
        </Panel>
      </div>
    );
  }

  // The arrival ritual: boot-flicker + transient ACCESS GRANTED chip on
  // every client-side navigation (PageTransition skips the first load and
  // reduced motion).
  return <PageTransition key={pathname}>{children}</PageTransition>;
};

export { RouteGuard };
