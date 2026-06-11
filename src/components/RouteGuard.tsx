"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/app/resources";
import { Key, MicroLcd, Panel, Screen } from "@/components/console";
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

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const routeEnabled = isRouteEnabled(pathname);
  const passwordRequired = Boolean(
    protectedRoutes[pathname as keyof typeof protectedRoutes],
  );

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Only the protected routes need the async auth check.
  useEffect(() => {
    if (!passwordRequired) return;
    let cancelled = false;
    setCheckingAuth(true);
    setIsAuthenticated(false);

    fetch("/api/check-auth")
      .then((response) => {
        if (!cancelled) setIsAuthenticated(response.ok);
      })
      .catch(() => {
        if (!cancelled) setIsAuthenticated(false);
      })
      .finally(() => {
        if (!cancelled) setCheckingAuth(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pathname, passwordRequired]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

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

  if (passwordRequired && checkingAuth) {
    return (
      <div className={styles.center}>
        <MicroLcd label="SYS">Checking access</MicroLcd>
      </div>
    );
  }

  if (passwordRequired && !isAuthenticated) {
    return (
      <div className={styles.center}>
        <Panel className={styles.devicePanel}>
          <Screen nodeId="NODE-SEC.01" status="locked">
            <div className={styles.readout}>ACCESS REQUIRED</div>
            <div className={styles.dim}>ENTER PASSWORD TO CONTINUE</div>
          </Screen>
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              handlePasswordSubmit();
            }}
          >
            <input
              id="password"
              className={styles.input}
              type="password"
              aria-label="Password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Key type="submit">Unlock</Key>
          </form>
          {error && <div className={styles.error}>● {error}</div>}
        </Panel>
      </div>
    );
  }

  // T4: entry-side phosphor settle — the content brightens into place after
  // the cut (90ms; disabled under prefers-reduced-motion via CSS).
  return (
    <div key={pathname} className={styles.pageEnter}>
      {children}
    </div>
  );
};

export { RouteGuard };
