import tenant from "../../assets/roles/tenant.png";
import investor from "../../assets/roles/investor.png";
import facilities from "../../assets/roles/facilities.png";
import vendors from "../../assets/roles/vendors.png";
import sales from "../../assets/roles/sales.png";

/**
 * Illustration shown on the "How will You Be Using This Platform" role
 * selection screen, keyed by role slug.
 *
 * Roles created later by an admin won't have an illustration here; the page
 * falls back to a generic icon for those.
 */
export const roleIllustrations: Record<string, string> = {
  tenant,
  investor,
  facilities_maintenance: facilities,
  vendor: vendors,
  sales_marketing: sales,
};

export default roleIllustrations;
