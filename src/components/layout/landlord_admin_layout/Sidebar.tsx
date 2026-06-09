import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  FileText,
  Users,
  Bell,
  LogOut,
  ChevronRight,
  Building2,
  Home,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/landlord-dashboard" },
    { label: "Property", icon: Building2, path: "/property", hasSubmenu: true },
    { label: "Unit", icon: Home, path: "/units" },
    { label: "Tenants", icon: Users, path: "/tenants" },
    { label: "Lease", icon: FileText, path: "/leases" },
    { label: "Payments", icon: CreditCard, path: "/payments" },
    { label: "Maintenance", icon: Wrench, path: "/landlord-maintenance" },
    { label: "Report", icon: BarChart3, path: "/reports" },
    { label: "Notification", icon: Bell, path: "/landlord-notifications" },
    { label: "Settings", icon: Settings, path: "/landlord-settings" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="grid grid-cols-2 gap-0.5">
            {[0,1,2,3].map(i => <div key={i} className={`w-2.5 h-2.5 rounded-sm ${i===3?'bg-gray-300':'bg-gray-900'}`} />)}
          </div>
          <span className="font-bold text-base text-gray-900 tracking-tight">Landlord</span>
        </div>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-sm font-medium transition-colors relative ${
                isActive
                  ? "bg-gray-900 text-[#f8f8f8]"
                  : "text-sidebar-foreground hover:bg-gray-200"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#e5383b] rounded-r-full -ml-3" />
              )}
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.hasSubmenu && <ChevronRight className="h-4 w-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 mb-4">
        <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 w-full transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;