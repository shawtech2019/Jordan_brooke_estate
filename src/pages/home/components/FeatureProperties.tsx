import {
    Bed,
    Bath,
    Square,
    MapPin,
    Heart,
    ArrowRight,
  } from "lucide-react";
  import { Link } from "react-router-dom";
import Images from "../../../components/constants/Images";

  
  const properties = [
    {
      id: 1,
      title: "Modern Luxury Penthouse",
      location: "Downtown Metro",
      price: "$1,250,000",
      priceLabel: "For Sale",
      beds: 4,
      baths: 3,
      sqft: "3,200",
      image: Images.PropertiesImgOne,
      status: "available",
      type: "Residential",
    },
    {
      id: 2,
      title: "Suburban Family Home",
      location: "Green Valley",
      price: "$3,500/mo",
      priceLabel: "For Rent",
      beds: 5,
      baths: 4,
      sqft: "4,100",
      image: Images.PropertiesImgTwo,
      status: "available",
      type: "Residential",
    },
    {
      id: 3,
      title: "Premium Office Space",
      location: "Business District",
      price: "$8,500/mo",
      priceLabel: "For Rent",
      beds: 0,
      baths: 2,
      sqft: "5,500",
      image: Images.PropertiesImgThree,
      status: "available",
      type: "Commercial",
    },
  ];
  
  const FeaturedProperties = () => {
    return (
      <section className="py-20  bg-[#f5f5f5]">
       <section className="flex items-center justify-center lg:px-[4rem] md:px-[2rem] px-[">
       <div className="container-wide max-w-7xl  lg:px-0 md:px-8 px-2 mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[#e5383b] mb-4 font-semibold text-sm uppercase font-inter tracking-wider">
                Featured Listings
              </p>
              <h2 className="text-3xl md:text-4xl text-[#000505] font-inter font-bold tracking-[0.3px]">
                Discover Our Top Properties
              </h2>
            </div>
  
            <Link to="/properties">
              <button className="group flex items-center text-[#000505] te gap-2 px-5 py-2.5 font-inter rounded-lg border-[1.5px] border-[#ced4da] text-sm font-medium hover:bg-muted transition-colors">
                View All Properties
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
  
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <Link
                to={`/properties/${property.id}`}
                key={property.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="group rounded-2xl overflow-hidden border border-[#ced4da] bg-[#ffffff] shadow-lg hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
  
                    <div className="absolute inset-0 bg-gradient-to-t from-[#343a40]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 text-xs font-medium font-inter rounded-full text-green-500 border-[1.5px] border-green-500/90">
                        {property.status}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#ffffff] text-[#343a40] font-inter">
                        {property.type}
                      </span>
                    </div>
  
                    {/* Favorite */}
                    <button
                      type="button"
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#ffffff]/90 backdrop-blur flex items-center justify-center text-[#343a40] hover:text-[#343a40] transition"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
  
                    {/* Price */}
                    <div className="absolute bottom-4 left-4">
                      <div className="text-2xl font-display font-bold shadow text-[#fefcfd]">
                        {property.price}
                      </div>
                      <div className="text-sm font-display text-[#fefcfd]/90">
                        {property.priceLabel}
                      </div>
                    </div>
                  </div>
  
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-[#e5383b] transition-colors">
                      {property.title}
                    </h3>
  
                    <div className="flex items-center gap-1.5 text-[#343a40] mb-4">
                      <MapPin className="w-4 h-4 text-[#e5383b]" />
                      <span className="text-sm">{property.location}</span>
                    </div>
  
                    {/* Features */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      {property.beds > 0 && (
                        <div className="flex items-center gap-1.5 text-sm text-[#343a40]/80 font-display font-medium">
                          <Bed className="w-4 h-4" />
                          {property.beds} Beds
                        </div>
                      )}
  
                      <div className="flex items-center gap-1.5 text-sm text-[#343a40]/80 font-display font-medium">
                        <Bath className="w-4 h-4" />
                        {property.baths} Baths
                      </div>
  
                      <div className="flex items-center gap-1.5 text-sm text-[#343a40]/80 font-display font-medium">
                        <Square className="w-4 h-4" />
                        {property.sqft} sqft
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
       </section>
      </section>
    );
  };
  
  export default FeaturedProperties;
  