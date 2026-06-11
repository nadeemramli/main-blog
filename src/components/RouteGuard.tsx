"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/app/resources";
import { Key, MicroLcd, Panel, Screen } from "@/components/console";
import styles from "./RouteGuard.module.scss";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performChecks = async () => {
      setLoading(true);
      setIsRouteEnabled(false);
      setIsPasswordRequired(false);
      setIsAuthenticated(false);

      const checkRouteEnabled = () => {
        if (!pathname) return false;

        if (pathname in routes) {
          return routes[pathname as keyof typeof routes];
        }

        const dynamicRoutes = ["/resources", "/projects", "/blog"] as const;
        for (const route of dynamicRoutes) {
          if (pathname?.startsWith(route) && routes[route]) {
            return true;
          }
        }

        return false;
      };

      const routeEnabled = checkRouteEnabled();
      setIsRouteEnabled(routeEnabled);

      if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
        setIsPasswordRequired(true);

        const response = await fetch("/api/check-auth");
        if (response.ok) {
          setIsAuthenticated(true);
        }
      }

      setLoading(false);
    };

    performChecks();
  }, [pathname]);

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

  if (loading) {
    return (
      <div className={styles.center}>
        <MicroLcd label="SYS">Checking access</MicroLcd>
      </div>
    );
  }

  if (!isRouteEnabled) {
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

  if (isPasswordRequired && !isAuthenticated) {
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

  return <>{children}</>;
};

export { RouteGuard };
