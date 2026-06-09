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
import DashboardPage from "../components/tenant_admin/dashboard/DashboardPage";
import NotFound from "../components/layout/page/NotFoundPage";
import ScrollToTop from "../components/constants/ScrollToTop";
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
    "/dashboard",
    "/rent-payment",
    "/profile",
    "/maintenance",
    "/visitors",
    "/lease-document",
    "/complaints",
    "/notification",
    "/landlord-dashboard",
    "/property",
    "/units",
    "/leases",
    "/payments",
    "/reports",
    "/tenants",
    "/landlord-maintenance",
    "/landlord-notifications",
    "/landlord-settings"

  ];
  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/verify-otp" element={<AccountVerification />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="enter-code" element={<EnterCode />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />

        {/* Tenants Dashboard Routes */}
        <Route
          path="dashboard"
          element={<TenantDashboardLayout element={<DashboardPage />} />}
        />
        <Route
          path="rent-payment"
          element={<TenantDashboardLayout element={<RentPaymentPage />} />}
        />
        <Route
          path="maintenance"
          element={<TenantDashboardLayout element={<MaintenancePage />} />}
        />
        <Route
          path="lease-document"
          element={<TenantDashboardLayout element={<LeaseDocPage />} />}
        />
         <Route
          path="complaints"
          element={<TenantDashboardLayout element={<ComplaintsPage />} />}
        />
         <Route
          path="profile"
          element={<TenantDashboardLayout element={<ProfilePage />} />}
        />
         <Route
          path="notification"
          element={<TenantDashboardLayout element={<NotificationPage />} />}
        />
         <Route
          path="visitors"
          element={<TenantDashboardLayout element={<VisitorsPage />} />}
        />

        {/* Landlord dashboard Routes */}

        <Route
          path="landlord-dashboard"
          element={<LandlordAdminLayout element={<LandlordDashboardPage />} />}
        />
        <Route
          path="property"
          element={<LandlordAdminLayout element={<PropertiesPage />} />}
        />
        <Route
          path="units"
          element={<LandlordAdminLayout element={<UnitsPage />} />}
        />
        <Route
          path="tenants"
          element={<LandlordAdminLayout element={<TenantsPage />} />}
        />
        <Route
          path="leases"
          element={<LandlordAdminLayout element={<LeasePage />} />}
        />
        <Route
        path="leases-detail"
        element={<LandlordAdminLayout element={<LeaseDetailPage/>} />}
      />
      <Route
        path="payments"
        element={<LandlordAdminLayout element={<PaymentsPage/>} />}
      />
      <Route
        path="reports"
        element={<LandlordAdminLayout element={<ReportsPage/>} />}
      />
      <Route
        path="landlord-maintenance"
        element={<LandlordAdminLayout element={<LandlordMaintenancePage/>} />}
      />
      <Route
        path="landlord-notifications"
        element={<LandlordAdminLayout element={<LandlordNotificationsPage/>} />}
      />
      <Route
        path="landlord-settings"
        element={<LandlordAdminLayout element={<LandlordSettingsPage/>} />}
      />
      </Routes>
    </div>
  );
}

export default App;
