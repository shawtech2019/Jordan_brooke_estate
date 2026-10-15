import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { httpGet } from "../../utils/api_utils";

interface Role {
  slug: string;
}

interface MeResponse {
  status: string;
  roles: Role[];
}

interface RequireRoleProps {
  /** Role slugs allowed to view this route. */
  allowedRoles: string[];
  element: React.ReactElement;
}

/** Role slugs cached by the login / role-selection screens. */
const readCachedRoles = (): string[] => {
  try {
    const raw = localStorage.getItem("roles");
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((role) => (typeof role === "string" ? role : role?.slug))
      .filter(Boolean);
  } catch {
    return [];
  }
};

/** Cached roles, but only when they already grant access to this route. */
const grantFromCache = (allowedRoles: string[]): string[] | null => {
  const cached = readCachedRoles();
  return cached.some((slug) => allowedRoles.includes(slug)) ? cached : null;
};

/**
 * Route guard: renders `element` only when the signed-in user holds one of
 * `allowedRoles`. Everyone else lands on the permission-denied page; visitors
 * without a valid session are sent to log in.
 */
const RequireRole = ({ allowedRoles, element }: RequireRoleProps) => {
  const location = useLocation();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // `allowedRoles` is an inline array, so key off its contents to keep the
  // effect stable across renders.
  const roleKey = allowedRoles.join(",");

  // Seed only from a cache that already grants access so the page renders
  // instantly; anything else waits for the server check.
  const [roles, setRoles] = useState<string[] | null>(() =>
    token ? grantFromCache(allowedRoles) : null
  );
  const [unauthenticated, setUnauthenticated] = useState(!token);

  useEffect(() => {
    if (!token) {
      setUnauthenticated(true);
      return;
    }

    const cachedGrant = grantFromCache(allowedRoles);
    if (cachedGrant) {
      setRoles(cachedGrant);
      return;
    }

    let active = true;
    (async () => {
      try {
        const me = await httpGet<MeResponse>("auth/me");
        if (!active) return;
        localStorage.setItem("roles", JSON.stringify(me.roles ?? []));
        setRoles((me.roles ?? []).map((role) => role.slug));
      } catch {
        // Missing / expired token — send them through login again.
        if (active) setUnauthenticated(true);
      }
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, location.pathname, roleKey]);

  if (unauthenticated || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles === null) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Checking access…
      </div>
    );
  }

  if (!roles.some((slug) => allowedRoles.includes(slug))) {
    return <Navigate to="/403" replace />;
  }

  return element;
};

export default RequireRole;
