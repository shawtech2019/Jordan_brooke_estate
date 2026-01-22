import {
    Users,
    TrendingUp,
    Settings,
    Briefcase,
    Wrench,
    Shield,
    ArrowRight,
  } from "lucide-react";
  import { Link } from "react-router-dom";
  
  const roles = [
    {
      icon: Users,
      title: "Tenants",
      description:
        "Make payments, submit maintenance requests, register visitors, and stay updated with announcements.",
      color: "bg-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Investors",
      description:
        "Monitor investments, view financial reports, track returns, and collect rent distributions.",
      color: "bg-green-500",
    },
    {
      icon: Settings,
      title: "Facilities Managers",
      description:
        "Oversee maintenance operations, assign tasks, schedule preventive maintenance, and track completion.",
      color: "bg-orange-500",
    },
    {
      icon: Briefcase,
      title: "Sales & Marketing",
      description:
        "Manage listings, handle leads, coordinate sales and rentals, and track deals to completion.",
      color: "bg-purple-500",
    },
    {
      icon: Wrench,
      title: "Vendors",
      description:
        "Receive maintenance jobs, update task status, upload completion reports, and communicate outcomes.",
      color: "bg-teal-500",
    },
    {
      icon: Shield,
      title: "Administrators",
      description:
        "Manage system configuration, users, roles, properties, approvals, and overall platform operations.",
      color: "bg-red-500",
    },
  ];
  
  const RolesSection = () => {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[#e5383b] font-semibold font-display text-sm uppercase tracking-wider mb-2">
              User Roles
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#031F22] mb-4">
              Tailored Experience for Everyone
            </h2>
            <p className="text-gray-600 text-lg font-display font-medium">
              We provide specialized dashboards and features for every stakeholder
              in your real estate operations.
            </p>
          </div>
  
          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => {
              const Icon = role.icon;
  
              return (
                <div
                  key={role.title}
                  className="group bg-white border border-gray-200 font-display rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-[#e5383b]/40 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl ${role.color} font-display flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
  
                  {/* Content */}
                  <h3 className="text-lg font-display font-semibold text-[#031F22] mb-2">
                    {role.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-display leading-relaxed">
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>
  
          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              to="/auth?tab=signup"
              className="inline-flex items-center gap-2 px-8 h-12 rounded-xl bg-[#e5383b] text-white font-medium tracking-wide hover:bg-[#e5383b]/90 transition group"
            >
              Get Started Today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    );
  };
  
  export default RolesSection;
  