/* ======================================================
   IMPORTS
====================================================== */

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Heart,
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Footer from "../../components/layout/footer/Footer";
import Images from "../../components/constants/Images";

/* ======================================================
   TYPES
====================================================== */

type ViewMode = "grid" | "list";
type PropertyCategory = "sale" | "rent" | "all";

export interface Property {
  id: number;
  title: string;
  location: string;
  address?: string;
  price: string;
  priceLabel: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  images: string[];
  status: "available" | "rented";
  type: "Residential" | "Commercial";
  category: "sale" | "rent";
}

/* ======================================================
   MOCK DATA
====================================================== */

const PROPERTIES: Property[] = [
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
    images: [
      Images.PropertiesImgOne,
      Images.PropertiesImgTwo,
      Images.PropertiesImgThree,
    ],
    status: "available",
    type: "Residential",
    category: "sale",
  },
  {
    id: 2,
    title: "Suburban Family Home",
    location: "Green Valley",
    price: "$3,500 / mo",
    priceLabel: "For Rent",
    beds: 5,
    baths: 4,
    sqft: "4,100",
    image: Images.PropertiesImgTwo,
    images: [
      Images.PropertiesImgTwo,
      Images.PropertiesImgOne,
      Images.PropertiesImgThree,
    ],
    status: "available",
    type: "Residential",
    category: "rent",
  },
  {
    id: 3,
    title: "Premium Office Space",
    location: "Business District",
    price: "$8,500 / mo",
    priceLabel: "For Rent",
    beds: 0,
    baths: 2,
    sqft: "5,500",
    image: Images.PropertiesImgThree,
    images: [
      Images.PropertiesImgThree,
      Images.PropertiesImgOne,
      Images.PropertiesImgTwo,
    ],
    status: "available",
    type: "Commercial",
    category: "rent",
  },
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
    images: [
      Images.PropertiesImgOne,
      Images.PropertiesImgTwo,
      Images.PropertiesImgThree,
    ],
    status: "available",
    type: "Residential",
    category: "sale",
  },
  {
    id: 2,
    title: "Suburban Family Home",
    location: "Green Valley",
    price: "$3,500 / mo",
    priceLabel: "For Rent",
    beds: 5,
    baths: 4,
    sqft: "4,100",
    image: Images.PropertiesImgTwo,
    images: [
      Images.PropertiesImgTwo,
      Images.PropertiesImgOne,
      Images.PropertiesImgThree,
    ],
    status: "available",
    type: "Residential",
    category: "rent",
  },
  {
    id: 3,
    title: "Premium Office Space",
    location: "Business District",
    price: "$8,500 / mo",
    priceLabel: "For Rent",
    beds: 0,
    baths: 2,
    sqft: "5,500",
    image: Images.PropertiesImgThree,
    images: [
      Images.PropertiesImgThree,
      Images.PropertiesImgOne,
      Images.PropertiesImgTwo,
    ],
    status: "available",
    type: "Commercial",
    category: "rent",
  },
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
    images: [
      Images.PropertiesImgOne,
      Images.PropertiesImgTwo,
      Images.PropertiesImgThree,
    ],
    status: "available",
    type: "Residential",
    category: "sale",
  },
  {
    id: 2,
    title: "Suburban Family Home",
    location: "Green Valley",
    price: "$3,500 / mo",
    priceLabel: "For Rent",
    beds: 5,
    baths: 4,
    sqft: "4,100",
    image: Images.PropertiesImgTwo,
    images: [
      Images.PropertiesImgTwo,
      Images.PropertiesImgOne,
      Images.PropertiesImgThree,
    ],
    status: "available",
    type: "Residential",
    category: "rent",
  },
  {
    id: 3,
    title: "Premium Office Space",
    location: "Business District",
    price: "$8,500 / mo",
    priceLabel: "For Rent",
    beds: 0,
    baths: 2,
    sqft: "5,500",
    image: Images.PropertiesImgThree,
    images: [
      Images.PropertiesImgThree,
      Images.PropertiesImgOne,
      Images.PropertiesImgTwo,
    ],
    status: "available",
    type: "Commercial",
    category: "rent",
  },
  // 👉 add more properties freely
];

/* ======================================================
   CONSTANTS
====================================================== */

const ITEMS_PER_PAGE = 6;

/* ======================================================
   COMPONENT
====================================================== */

const Properties = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [category, setCategory] = useState<PropertyCategory>("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- FILTER ---------------- */

  const filteredProperties = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return PROPERTIES.filter((property) => {
      const matchesCategory =
        category === "all" || property.category === category;

      const matchesSearch =
        property.title.toLowerCase().includes(keyword) ||
        property.location.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  /* ---------------- PAGINATION ---------------- */

  const totalPages = Math.ceil(
    filteredProperties.length / ITEMS_PER_PAGE
  );

  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProperties.slice(start, end);
  }, [filteredProperties, currentPage]);

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* HEADER */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold">Property Catalog</h1>
            <p className="text-gray-500 mt-1">
              Explore premium properties tailored to your needs
            </p>
          </header>

          {/* FILTER BAR */}
          <section className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by title or location"
                className="w-full h-12 pl-12 border-[0.5px] border-[#c3bebe] shadow rounded-lg focus:ring-2 focus:ring-[#e5383b] outline-none"
              />
            </div>

            <div className="flex gap-2">
              {(["all", "sale", "rent"] as const).map((value) => (
                <button
                  key={value}
                  onClick={() => {
                    setCategory(value);
                    setCurrentPage(1);
                  }}
                  className={`px-4 h-12 rounded-lg border ${
                    category === value
                      ? "bg-[#e5383b] border-[#c3bebe] border-[0.7px] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {value === "all"
                    ? "All"
                    : value === "sale"
                    ? "For Sale"
                    : "For Rent"}
                </button>
              ))}
            </div>

            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 ${
                  viewMode === "grid" ? "bg-[#e5383b] border-[0.8px] border-[#e0dbdb] text-white" : ""
                }`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 ${
                  viewMode === "list" ? "bg-[#e5383b] text-white" : ""
                }`}
              >
                <List size={18} />
              </button>
            </div>

            <button className="px-4 h-12 border rounded-lg flex items-center gap-2 hover:bg-gray-100">
              <SlidersHorizontal size={18} />
              Advanced
            </button>
          </section>

          {/* RESULTS */}
          <p className="text-sm text-gray-500 mb-6">
            Showing {paginatedProperties.length} of{" "}
            {filteredProperties.length} results
          </p>

          {/* PROPERTY LIST */}
          <section
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
             {paginatedProperties.map((property, index) => (
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
                                <div className="flex items-center gap-4 pt-4 border-t  border-[#343a40]/20">
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
            {/* {paginatedProperties.map((property) => (
              <Link
                key={property.id}
                to={`/properties/${property.id}`}
                className="group"
              >
                <article
                  className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div
                    className={`relative ${
                      viewMode === "list" ? "w-72 shrink-0" : "aspect-[4/3]"
                    }`}
                  >
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
                      <Heart size={18} color="#e5383b" />
                    </button>
                  </div>

                  <div className="p-5 flex-1">
                    <h3 className="font-semibold text-lg tracking-[0.5px] text-[#000505] font-inter  group-hover:text-[#e5383b]">
                      {property.title}
                    </h3>

                    <p className="flex items-center gap-1 font-inter text-sm text-gray-500 mb-3">
                      <MapPin size={14} color="#E5383B" />
                      {property.location}
                    </p>

                    <div className="flex gap-4 text-sm text-gray-500 mb-4">
                      {property.beds > 0 && (
                        <span className="flex items-center gap-1">
                          <Bed size={14} />
                          {property.beds}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Bath size={14} />
                        {property.baths}
                      </span>
                      <span className="flex items-center gap-1">
                        <Square size={14} />
                        {property.sqft} sqft
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">
                        {property.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {property.priceLabel}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))} */}
          </section>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;
