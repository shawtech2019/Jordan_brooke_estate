import { Search, MapPin, Home, Building } from "lucide-react";
import { Link } from "react-router-dom";
import Images from "../../../components/constants/Images";


const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={ Images.HeroSectionImg}
          alt="Luxury modern building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#031F22]/95 via-[#031F22]/80 to-[#031F22]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-[#B62931] border border-accent/30 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#B62931] animate-pulse" />
            <span className="text-sm font-medium">
              Trusted by 10,000+ clients
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#f5f5f5] leading-tight mb-6 animate-slide-up">
            Find Your Perfect
            <span className="block text-[#BE7074]">Property Today</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-[#e5e5e5] mb-8 max-w-xl animate-slide-up delay-100">
            Discover premium properties for sale and rent. From luxury apartments
            to commercial spaces, we have everything you need.
          </p>

          {/* Search Box */}
          <div className="bg-[#f5f5f5] rounded-2xl p-4 shadow-elevated animate-scale-in delay-200">
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#BE7074] text-[#f5f5f5] font-poppins font-light text-sm "
              >
                <Home className="w-4 h-4" color="#f5f5f5" />
                Buy
              </button>

              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#BE7074] text-[#f5f5f5] text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                <Building className="w-4 h-4" color="#f5f5f5" />
                Rent
              </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f5f5f5]" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full h-12 rounded-xl border border-border bg-[#ffffff] px-12 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f5f5f5]" />
                <input
                  type="text"
                  placeholder="Property Type"
                  className="w-full h-12 rounded-xl border border-border bg-background px-12 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <Link to="/properties">
                <button
                  type="button"
                  className="w-full h-12 rounded-xl bg-[#BE7074] text-[#ffffff] leading-1 tracking-normal font-medium flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors"
                >
                  <Search className="w-5 h-5" color="#ffffff" />
                  Search Properties
                </button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 animate-fade-in delay-300">
            {[
              { value: "2,500+", label: "Properties" },
              { value: "1,200+", label: "Happy Clients" },
              { value: "50+", label: "Expert Agents" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="text-3xl font-display font-bold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
