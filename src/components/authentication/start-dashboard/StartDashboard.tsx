import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Loader2, UserRound } from "lucide-react";

import { httpGet } from "../../utils/api_utils";
import { roleIllustrations } from "../../constants/RoleImages";
import {
  roleDashboardRoutes,
  roleTaglines,
  defaultDashboardRoute,
} from "../../constants/RoleDashboards";
import Footer from "../../layout/footer/Footer";

interface Role {
  id: number;
  slug: string;
  name: string;
  description: string | null;
}

interface MeResponse {
  status: string;
  roles: Role[];
}

const StartDashboard = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* ===============================
     Load the signed-in user's roles
  ================================ */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to continue");
      navigate("/login");
      return;
    }

    let active = true;

    (async () => {
      try {
        const me = await httpGet<MeResponse>("auth/me");

        if (!active) return;

        if (!me.roles?.length) {
          // No role yet — send them to role selection (signup flow).
          navigate("/select-role");
          return;
        }

        setRoles(me.roles);
        // Pre-select when there's only one choice, so Continue is one click.
        if (me.roles.length === 1) setSelected(me.roles[0].slug);
      } catch (error: unknown) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load your roles"
        );
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [navigate]);

  const handleContinue = () => {
    if (!selected) return;

    localStorage.setItem("activeRole", selected);
    const route = roleDashboardRoutes[selected] ?? defaultDashboardRoute;
    navigate(route);
  };

  const renderCard = (role: Role) => {
    const illustration = roleIllustrations[role.slug];
    const tagline = roleTaglines[role.slug] ?? role.description ?? "";
    const isSelected = selected === role.slug;

    return (
      <button
        key={role.id}
        type="button"
        onClick={() => setSelected(role.slug)}
        aria-pressed={isSelected}
        className={`group w-[clamp(180px,22vw,300px)] max-w-[300px] rounded-2xl px-3 py-4 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3a5f]/40 ${
          isSelected
            ? "bg-[#1a3a5f]/5 ring-2 ring-[#1a3a5f]"
            : "ring-1 ring-transparent hover:bg-slate-50"
        }`}
      >
        <div className="flex h-[150px] items-center justify-center">
          {illustration ? (
            <img
              src={illustration}
              alt={role.name}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1a3a5f]/10 text-[#1a3a5f]">
              <UserRound className="h-9 w-9" />
            </span>
          )}
        </div>

        <h3 className="mt-4 text-[17px] font-semibold text-[#111827]">
          {role.name}
        </h3>

        {tagline && (
          <p className="mx-auto mt-2 max-w-[240px] text-[13px] leading-relaxed text-gray-500">
            {tagline}
          </p>
        )}
      </button>
    );
  };

  return (
    <>
      <section className="min-h-screen w-full bg-white px-6 pt-24 pb-16 md:pb-20">
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />

        <div className="mx-auto w-full max-w-6xl">
          <header className="text-left">
            <h1 className="font-poppins text-3xl font-bold text-[#111827] sm:text-4xl md:text-[40px]">
              Welcome Back
            </h1>
            <p className="mt-3 text-base text-slate-500 md:text-lg">
              Please select a role to continue using your Dashboard
            </p>
          </header>

          {loading ? (
            <div className="mt-24 flex items-center justify-center gap-2 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading your dashboards...</span>
            </div>
          ) : (
            <>
              <div className="mt-16 flex flex-wrap items-start justify-center gap-x-[clamp(1rem,9vw,9rem)] gap-y-10">
                {roles.map(renderCard)}
              </div>

              <div className="mt-16 flex justify-center">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!selected}
                  className="flex h-14 w-full max-w-[304px] items-center justify-center gap-2 rounded-[14px] bg-[#1a3a5f] text-[15px] font-medium text-white transition hover:bg-[#16324f] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue to Dashboard
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default StartDashboard;
