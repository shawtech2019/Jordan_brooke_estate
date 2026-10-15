/**
 * Where each role lands after choosing it on the "Welcome Back" start-dashboard
 * screen, and the short blurb shown under its name.
 *
 * Unknown roles (added later by an admin) fall back to the tenant dashboard and
 * use the role's own description.
 */
export const roleDashboardRoutes: Record<string, string> = {
  tenant: "/tenant/dashboard",
  facilities_maintenance: "/investor/maintenance",
  investor: "/investor/dashboard",
  admin: "/admin/system-settings",
};

export const roleTaglines: Record<string, string> = {
  tenant: "Payment & Maintenance",
  facilities_maintenance: "Oversights and Tickets",
  investor: "Properties and Rent Trackings",
};

export const defaultDashboardRoute = "/tenant/dashboard";

/** The role chooser ("Welcome Back") screen. */
export const startDashboardRoute = "/start-dashboard";

/**
 * Resolve where the "Dashboard" shortcut should send a signed-in user:
 * the dashboard for the role they last selected (kept in localStorage), or the
 * role chooser so they can pick one. The chooser itself forwards role-less
 * users on to `/select-role`.
 */
export const getDashboardPath = (): string => {
  if (typeof window === "undefined") return startDashboardRoute;

  const activeRole = window.localStorage.getItem("activeRole");
  if (activeRole && roleDashboardRoutes[activeRole]) {
    return roleDashboardRoutes[activeRole];
  }

  return startDashboardRoute;
};
