/**
 * Where each role lands after choosing it on the "Welcome Back" start-dashboard
 * screen, and the short blurb shown under its name.
 *
 * Unknown roles (added later by an admin) fall back to the tenant dashboard and
 * use the role's own description.
 */
export const roleDashboardRoutes: Record<string, string> = {
  tenant: "/dashboard",
  facilities_maintenance: "/landlord-maintenance",
  investor: "/landlord-dashboard",
  admin: "/system-settings",
};

export const roleTaglines: Record<string, string> = {
  tenant: "Payment & Maintenance",
  facilities_maintenance: "Oversights and Tickets",
  investor: "Properties and Rent Trackings",
};

export const defaultDashboardRoute = "/dashboard";
