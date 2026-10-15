import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight, Check, ChevronDown } from "lucide-react";

import { httpGet } from "../utils/api_utils";
import {
  roleDashboardRoutes,
  defaultDashboardRoute,
} from "../constants/RoleDashboards";

interface Role {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
}

interface MeResponse {
  status: string;
  roles: Role[];
}

interface RoleSwitcherProps {
  /**
   * `plain`   → icon button used by the tenant/landlord top header.
   * `outline` → bordered round icon used by the system admin top bar.
   * `sidebar` → full-width row placed in the dashboard sidebar, next to Log Out.
   */
  variant?: "plain" | "outline" | "sidebar";
}

/**
 * Compact role switcher for users who hold more than one role. Renders nothing
 * when the user has 0 or 1 role, so single-role users never see it. The header
 * variants are icon-only (tidy on mobile); the sidebar variant sits with the
 * other dashboard nav rows. Selecting a role jumps to that role's dashboard.
 */
const RoleSwitcher = ({ variant = "plain" }: RoleSwitcherProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [roles, setRoles] = useState<Role[]>(() => {
    // Optimistically seed from the last known roles to avoid a flash.
    try {
      const raw = localStorage.getItem("roles");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [activeRole, setActiveRole] = useState<string | null>(() =>
    localStorage.getItem("activeRole")
  );
  const [open, setOpen] = useState(false);

  /* Load the signed-in user's roles */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let active = true;
    (async () => {
      try {
        const me = await httpGet<MeResponse>("auth/me");
        if (!active) return;
        setRoles(me.roles ?? []);
        localStorage.setItem("roles", JSON.stringify(me.roles ?? []));
      } catch {
        // Non-fatal — the switcher simply stays hidden.
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  /* Close on outside click / Escape */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Only useful when there is somewhere else to go.
  if (roles.length <= 1) return null;

  const switchTo = (slug: string) => {
    localStorage.setItem("activeRole", slug);
    setActiveRole(slug);
    setOpen(false);
    navigate(roleDashboardRoutes[slug] ?? defaultDashboardRoute);
  };

  const isSidebar = variant === "sidebar";

  const triggerClass = isSidebar
    ? "relative mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
    : variant === "outline"
    ? "rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 transition-colors"
    : "w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors";

  const menuClass = isSidebar
    ? "absolute bottom-full left-0 z-50 mb-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
    : "absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Switch role"
        title="Switch role"
        aria-haspopup="menu"
        aria-expanded={open}
        className={triggerClass}
      >
        {isSidebar ? (
          <>
            <ArrowLeftRight className="h-5 w-5 shrink-0" />
            <span className="flex-1 text-left">Switch Role</span>
            <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
          </>
        ) : (
          <ArrowLeftRight className={variant === "outline" ? "h-4 w-4" : "text-gray-600"} />
        )}
      </button>

      {open && (
        <div role="menu" className={menuClass}>
          {!isSidebar && (
            <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Switch dashboard
            </p>
          )}
          {roles.map((role) => {
            const isActive = activeRole === role.slug;
            return (
              <button
                key={role.id}
                type="button"
                role="menuitem"
                onClick={() => switchTo(role.slug)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                  isActive ? "font-medium text-blue-600" : "text-gray-700"
                }`}
              >
                <span className="flex-1 truncate">{role.name}</span>
                {isActive && <Check size={14} className="shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RoleSwitcher;
