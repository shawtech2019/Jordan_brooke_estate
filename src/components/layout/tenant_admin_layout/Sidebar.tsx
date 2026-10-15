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
  X,
} from "lucide-react";
import RoleSwitcher from "../RoleSwitcher";

interface SidebarProps {
  /** Whether the mobile drawer is open (ignored on large screens). */
  open?: boolean;
  /** Closes the mobile drawer. */
  onClose?: () => void;
}

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/tenant/dashboard" },
  { label: "Rent & Payment", icon: Receipt, path: "/tenant/rent-payment", hasSubmenu: true },
  { label: "Maintenance", icon: Wrench, path: "/tenant/maintenance" },
  { label: "Lease & Document", icon: FileText, path: "/tenant/lease-document" },
  { label: "Complaints", icon: MessageSquare, path: "/tenant/complaints" },
  { label: "Visitors", icon: Users, path: "/tenant/visitors" },
  { label: "Profile", icon: User, path: "/tenant/profile" },
  { label: "Notification", icon: Bell, path: "/tenant/notification" },
];

const Sidebar = ({ open = false, onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Backdrop for the mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 shrink-0 flex flex-col overflow-y-auto bg-white border-r border-border transition-transform duration-200 lg:sticky lg:z-auto lg:overflow-visible ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-3 h-3 bg-gray-900 rounded-sm" />
              <div className="w-3 h-3 bg-gray-900 rounded-sm" />
              <div className="w-3 h-3 bg-gray-900 rounded-sm" />
              <div className="w-3 h-3 bg-gray-300 rounded-sm" />
            </div>
            <span className="font-display font-700 text-lg text-gray-900 tracking-tight">Tenants</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
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
          <RoleSwitcher variant="sidebar" />
          <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 w-full transition-colors">
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
