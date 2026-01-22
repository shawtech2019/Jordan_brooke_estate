import {
    Building2,
    Key,
    Wrench,
    TrendingUp,
    Users,
    Shield,
  } from "lucide-react";
  
  const services = [
    {
      icon: Building2,
      title: "Property Management",
      description:
        "Complete property oversight including maintenance, tenant relations, and financial management.",
    },
    {
      icon: Key,
      title: "Sales & Rentals",
      description:
        "Find your perfect property or list yours with our expert sales and rental services.",
    },
    {
      icon: Wrench,
      title: "Facilities Management",
      description:
        "24/7 maintenance support, vendor coordination, and preventive care for your properties.",
    },
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description:
        "Strategic investment guidance with ROI tracking and portfolio management.",
    },
    {
      icon: Users,
      title: "Tenant Services",
      description:
        "Seamless tenant experience with online payments, maintenance requests, and community features.",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description:
        "Enterprise-grade security with role-based access and data protection.",
    },
  ];
  
  const ServicesSection = () => {
    return (
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[#e5383b] font-display font-semibold text-sm uppercase tracking-wider mb-2">
              Our Services
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#031F22] mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-gray-600 font-inter">
              From property search to investment management, we provide
              comprehensive real estate solutions for all stakeholders.
            </p>
          </div>
  
          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#e5383b]/10 flex items-center justify-center mb-5 group-hover:bg-[#e5383b] group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-[#e5383b] group-hover:text-white transition-colors" />
                  </div>
  
                  {/* Content */}
                  <h3 className="text-lg font-display font-semibold text-[#031F22] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm font-display text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };
  
  export default ServicesSection;
  