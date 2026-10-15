import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Loader2, UserRound } from "lucide-react";

import {
  httpGet,
  httpPostWithToken,
} from "../../utils/api_utils";
import { roleIllustrations } from "../../constants/RoleImages";
import {
  roleDashboardRoutes,
  defaultDashboardRoute,
  getDashboardPath,
} from "../../constants/RoleDashboards";
import Footer from "../../layout/footer/Footer";

interface Role {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  is_system: number;
  is_selectable: number;
}

interface RolesResponse {
  status: string;
  data: Role[];
}

interface SelectRoleResponse {
  status: string;
  roles: Role[];
}

interface MeResponse {
  status: string;
  roles: Role[];
}

const SelectRole = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* ===============================
     Load selectable roles + auth guard
  ================================ */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to choose how you'll use the platform");
      navigate("/login");
      return;
    }

    let active = true;

    (async () => {
      try {
        // Only users with NO role at all may see this page. Anyone who already
        // has a role is sent to their selected dashboard (or the chooser).
        try {
          const me = await httpGet<MeResponse>("auth/me");
          if (active && me.roles?.length) {
            navigate(getDashboardPath());
            return;
          }
        } catch {
          // Non-fatal: fall through and let the backend reject on submit.
        }

        const res = await httpGet<RolesResponse>("roles?selectable=true");
        if (active) setRoles(res.data ?? []);
      } catch (error: unknown) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load roles"
        );
      } finally {
        if (active) setLoadingRoles(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [navigate]);

  /* The mock lays the roles out as 3 on top, 2 below. */
  const { firstRow, secondRow } = useMemo(
    () => ({ firstRow: roles.slice(0, 3), secondRow: roles.slice(3) }),
    [roles]
  );

  /* ===============================
     Submit selection
  ================================ */
  const handleContinue = async () => {
    if (!selected || submitting) return;

    try {
      setSubmitting(true);

      const res = await httpPostWithToken<SelectRoleResponse>(
        "auth/select-role",
        { slug: selected }
      );

      localStorage.setItem("roles", JSON.stringify(res.roles ?? []));
      localStorage.setItem("activeRole", selected);
      toast.success("Role selected");

      // Send the user to the dashboard that belongs to the role they chose.
      const route = roleDashboardRoutes[selected] ?? defaultDashboardRoute;
      setTimeout(() => navigate(route), 900);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Could not save your role"
      );
      setSubmitting(false);
    }
  };

  const renderCard = (role: Role) => {
    const illustration = roleIllustrations[role.slug];
    const isSelected = selected === role.slug;

    return (
      <button
        key={role.id}
        type="button"
        onClick={() => setSelected(role.slug)}
        aria-pressed={isSelected}
        className={`group w-[clamp(170px,20vw,300px)] max-w-[300px] rounded-2xl px-3 py-4 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3a5f]/40 ${
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

        {role.description && (
          <p className="mx-auto mt-2 max-w-[240px] text-[13px] leading-relaxed text-gray-500">
            {role.description}
          </p>
        )}
      </button>
    );
  };

  return (
    <>
      <section className="min-h-screen w-full bg-white px-4 pt-24 pb-16 md:pb-20">
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />

        <div className="mx-auto w-full max-w-6xl">
          {/* Heading */}
          <header className="text-center">
            <h1 className="font-poppins text-2xl font-bold text-[#111827] sm:text-3xl md:text-[34px]">
              How will You Be Using This Platform
            </h1>
            <p className="mt-3 text-sm text-gray-500 sm:text-[15px]">
              Select the option that best describes you
            </p>
          </header>

          {loadingRoles ? (
            <div className="mt-24 flex items-center justify-center gap-2 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading options...</span>
            </div>
          ) : (
            <>
              {/* Row 1 — three options */}
              <div className="mt-12 flex flex-nowrap items-start justify-center gap-x-[clamp(1rem,9vw,9rem)] gap-y-10">
                {firstRow.map(renderCard)}
              </div>

              {/* Row 2 — two options, offset like the mock */}
              <div className="mt-6 flex flex-nowrap items-start justify-center gap-x-[clamp(1rem,13vw,13rem)] gap-y-10 lg:mt-4">
                {secondRow.map(renderCard)}
              </div>

              {/* Continue */}
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!selected || submitting}
                  className="flex h-14 w-full max-w-[248px] items-center justify-center gap-2 rounded-[14px] bg-[#1a3a5f] text-[15px] font-medium text-white transition hover:bg-[#16324f] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Saving..." : "Continue"}
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

export default SelectRole;
