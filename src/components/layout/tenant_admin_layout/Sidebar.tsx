import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  Wrench,
  FileText,
  MessageSquare,
  Users,
  User,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Rent & Payment", icon: Receipt, path: "/rent-payment", hasSubmenu: true },
  { label: "Maintenance", icon: Wrench, path: "/maintenance" },
  { label: "Lease & Document", icon: FileText, path: "/lease-document" },
  { label: "Complaints", icon: MessageSquare, path: "/complaints" },
  { label: "Visitors", icon: Users, path: "/visitors" },
  { label: "Profile", icon: User, path: "/profile" },
  { label: "Notification", icon: Bell, path: "/notification" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-3 h-3 bg-gray-900 rounded-sm" />
            <div className="w-3 h-3 bg-gray-900 rounded-sm" />
            <div className="w-3 h-3 bg-gray-900 rounded-sm" />
            <div className="w-3 h-3 bg-gray-300 rounded-sm" />
          </div>
          <span className="font-display font-700 text-lg text-gray-900 tracking-tight">Tenants</span>
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