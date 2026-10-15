import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "../components/navigation/Navbar";
import Home from "../pages/home/Home";
import Login from "../components/authentication/login/Login";
import Register from "../components/authentication/register/register";
import ForgotPassword from "../components/authentication/forgot-password/ForgotPassword";
import ResetPassword from "../components/authentication/reset-password/ResetPassword";
import EnterCode from "../components/authentication/enter-code/EnterCode";
import Properties from "../pages/property/Properties";
import PropertyDetail from "../pages/property/PropertiesDetails";
import AboutUs from "../pages/about/AboutUs";
import Contact from "../pages/contact/Contact";
import AccountVerification from "../components/authentication/account-verification/AccountVerification";
import TwoFactorAuth from "../components/authentication/two-factor/TwoFactorAuth";
import SelectRole from "../components/authentication/select-role/SelectRole";
import StartDashboard from "../components/authentication/start-dashboard/StartDashboard";
import DashboardPage from "../components/tenant_admin/dashboard/DashboardPage";
import NotFound from "../components/layout/page/NotFoundPage";
import PermissionDenied from "../components/layout/page/PermissionDeniedPage";
import ScrollToTop from "../components/constants/ScrollToTop";
import RequireRole from "../components/authentication/guard/RequireRole";
import TenantDashboardLayout from "../components/layout/tenant_admin_layout/TenantAdminLayout";
import RentPaymentPage from "../components/tenant_admin/rent-payment/RentPaymentPage";
import MaintenancePage from "../components/tenant_admin/maintenance/MaintenancePage";
import LeaseDocPage from "../components/tenant_admin/lease-doc/LeaseDocPage";
import ComplaintsPage from "../components/tenant_admin/complaint/ComplaintPage";
import ProfilePage from "../components/tenant_admin/profile/ProfilePage";
import NotificationPage from "../components/tenant_admin/notification/NotificationPage";
import VisitorsPage from "../components/tenant_admin/visitor/VisitorsPage";
import LandlordAdminLayout from "../components/layout/landlord_admin_layout/LandlordAdminLayout";
import LandlordDashboardPage from "../components/landlord_admin/dashboard/LandlordDashboardPage";
import PropertiesPage from "../components/landlord_admin/property/PropertiesPage";
import UnitsPage from "../components/landlord_admin/unit/UnitsPage";
import TenantsPage from "../components/landlord_admin/tenants/TenantsPage";
import LeasePage from "../components/landlord_admin/lease/LeasePage";
import LeaseDetailPage from "../components/landlord_admin/lease/LeaseDetailPage";
import PaymentsPage from "../components/landlord_admin/payment/PaymentsPage";
import LandlordMaintenancePage from "../components/landlord_admin/maintenance/LandlordMaintenancePage";
import ReportsPage from "../components/landlord_admin/report/ReportsPage";
import LandlordNotificationsPage from "../components/landlord_admin/notification/LandlordNotificationPage";
import LandlordSettingsPage from "../components/landlord_admin/setting/LandlordSettingsPage";
import NewPropertyPage from "../components/landlord_admin/property/NewPropertyPage";
import SystemSettings from "../components/system_admin_page/SystemSettings";
// import SystemAdminLayoutProps from "../components/layout/system_admin/SystemAdminLayout";
import SystemAdminLayout from "../components/layout/system_admin/SystemAdminLayout";
import LogsAudits from "../components/system_admin_page/LogsAudits";
import RolePermissions from "../components/system_admin_page/RolePermissions";
import UserManagement from "../components/system_admin_page/UserManagement";
import Support from "../components/system_admin_page/Support";



function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* <Loader /> */}
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const hideNavbarPaths = [
    "/login",
    "/register",
    "/two-factor",
    "/tenant/dashboard",
    "/tenant/rent-payment",
    "/tenant/profile",
    "/tenant/maintenance",
    "/tenant/visitors",
    "/tenant/lease-document",
    "/tenant/complaints",
    "/tenant/notification",
    "/investor/dashboard",
    "/investor/properties",
    "/investor/properties/new",
    "/investor/units",
    "/investor/tenants",
    "/investor/leases",
    "/investor/leases-detail",
    "/investor/payments",
    "/investor/reports",
    "/investor/maintenance",
    "/investor/notifications",
    "/investor/settings",
    "/admin/system-settings",
    "/admin/logs",
    "/admin/users",
    "/admin/roles",
    "/admin/support"

  ];
  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/verify-otp" element={<AccountVerification />} />
        <Route path="/two-factor" element={<TwoFactorAuth />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/start-dashboard" element={<StartDashboard />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="enter-code" element={<EnterCode />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="/403" element={<PermissionDenied />} />
        <Route path="*" element={<NotFound />} />

        {/* Tenants Dashboard Routes — /tenant/* */}
        <Route path="tenant/dashboard" element={<RequireRole allowedRoles={["tenant"]} element={<TenantDashboardLayout element={<DashboardPage />} />} />} />
        <Route path="tenant/rent-payment" element={<RequireRole allowedRoles={["tenant"]} element={<TenantDashboardLayout element={<RentPaymentPage />} />} />} />
        <Route path="tenant/maintenance" element={<RequireRole allowedRoles={["tenant"]} element={<TenantDashboardLayout element={<MaintenancePage />} />} />} />
        <Route path="tenant/lease-document" element={<RequireRole allowedRoles={["tenant"]} element={<TenantDashboardLayout element={<LeaseDocPage />} />} />} />
        <Route path="tenant/complaints" element={<RequireRole allowedRoles={["tenant"]} element={<TenantDashboardLayout element={<ComplaintsPage />} />} />} />
        <Route path="tenant/profile" element={<RequireRole allowedRoles={["tenant"]} element={<TenantDashboardLayout element={<ProfilePage />} />} />} />
        <Route path="tenant/notification" element={<RequireRole allowedRoles={["tenant"]} element={<TenantDashboardLayout element={<NotificationPage />} />} />} />
        <Route path="tenant/visitors" element={<RequireRole allowedRoles={["tenant"]} element={<TenantDashboardLayout element={<VisitorsPage />} />} />} />

        {/* Investor dashboard Routes — /investor/* */}
        <Route path="investor/dashboard" element={<RequireRole allowedRoles={["investor", "facilities_maintenance"]} element={<LandlordAdminLayout element={<LandlordDashboardPage />} />} />} />
        <Route path="investor/properties" element={<RequireRole allowedRoles={["investor", "facilities_maintenance"]} element={<LandlordAdminLayout element={<PropertiesPage />} />} />} />
        <Route path="investor/properties/new" element={<RequireRole allowedRoles={["investor", "facilities_maintenance"]} element={<LandlordAdminLayout element={<NewPropertyPage />} />} />} />
        <Route path="investor/units" element={<RequireRole allowedRoles={["investor", "facilities_maintenance"]} element={<LandlordAdminLayout element={<UnitsPage />} />} />} />
        <Route path="investor/tenants" element={<RequireRole allowedRoles={["investor", "facilities_maintenance"]} element={<LandlordAdminLayout element={<TenantsPage />} />} />} />
        <Route path="investor/leases" element={<RequireRole allowedRoles={["investor", "facilities_maintenance"]} element={<LandlordAdminLayout element={<LeasePage />} />} />} />
        <Route path="investor/leases-detail" element={<RequireRole allowedRoles={["investor", "facilities_maintenance"]} element={<LandlordAdminLayout element={<LeaseDetailPage />} />} />} />
        <Route path="investor/payments" element={<RequireRole allowedRoles={["investor", "facilities_maintenance"]} element={<LandlordAdminLayout element={<PaymentsPage />} />} />} />
        <Route path="investor/reports" element={<RequireRole allowedRoles={["investor", "facilities_maintenance"]} element={<LandlordAdminLayout element={<ReportsPage />} />} />} />
        <Route path="investor/maintenance" element={<RequireRole allowedRoles={["investor", "facilities_maintenance"]} element={<LandlordAdminLayout element={<LandlordMaintenancePage />} />} />} />
        <Route path="investor/notifications" element={<RequireRole allowedRoles={["investor", "facilities_maintenance"]} element={<LandlordAdminLayout element={<LandlordNotificationsPage />} />} />} />
        <Route path="investor/settings" element={<RequireRole allowedRoles={["investor", "facilities_maintenance"]} element={<LandlordAdminLayout element={<LandlordSettingsPage />} />} />} />

        {/* System Admin dashboard routes — /admin/* */}
        <Route path="admin/system-settings" element={<RequireRole allowedRoles={["admin"]} element={<SystemAdminLayout element={<SystemSettings />} />} />} />
        <Route path="admin/logs" element={<RequireRole allowedRoles={["admin"]} element={<SystemAdminLayout element={<LogsAudits />} />} />} />
        <Route path="admin/roles" element={<RequireRole allowedRoles={["admin"]} element={<SystemAdminLayout element={<RolePermissions />} />} />} />
        <Route path="admin/users" element={<RequireRole allowedRoles={["admin"]} element={<SystemAdminLayout element={<UserManagement />} />} />} />
        <Route path="admin/support" element={<RequireRole allowedRoles={["admin"]} element={<SystemAdminLayout element={<Support />} />} />} />
      </Routes>

      {/* System Admin dashboardd routes  */}
      
    </div>
  );
}

export default App;
