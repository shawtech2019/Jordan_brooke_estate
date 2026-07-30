import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Settings,
  FileText,
  LifeBuoy,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import Images from "../../constants/Images";

interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
  hasSubmenu?: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/system-settings",
  },
  {
    label: "User Management",
    icon: Users,
    path: "/users",
  },
  {
    label: "Role & Permission",
    icon: ShieldCheck,
    path: "/roles",
  },
  {
    label: "System Settings",
    icon: Settings,
    path: "/system-settings",
  },
  {
    label: "Logs & Audits",
    icon: FileText,
    path: "/logs",
  },
  {
    label: "Support",
    icon: LifeBuoy,
    path: "/support",
  },
];

export default function Sidebar() {
  //  const [open, setOpen] = useState(false);
  // const closeMenu = () => setOpen(false);
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white lg:flex">
      {/* Logo */}
      <div className="border-b border-gray-200 px-6 py-5">
        <div className="flex items-center gap-3">
          {/* <div className="grid grid-cols-2 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-3 w-3 rounded-sm ${
                  i === 3 ? "bg-gray-300" : "bg-gray-900"
                }`}
              />
            ))}
          </div> */}
           {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-4 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-md flex items-center justify-center shadow-sm">
            <img src={Images.LogoImg} className=""/>
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Admin
          </span>
        </Link>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          System Administration
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-full bg-red-500 -ml-3" />
                  )}

                  <Icon className="h-5 w-5 shrink-0" />

                  <span className="flex-1">{item.label}</span>

                  {item.hasSubmenu && (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
            A
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              System Admin
            </p>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}