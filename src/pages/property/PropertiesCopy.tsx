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
  image: string;        // cover image
  images: string[];     // multiple images
  status: "available" | "rented";
  type: "Residential" | "Commercial";
  category: "sale" | "rent";
  description?: string;
  features?: string[];
  agent?: {
    name: string;
    phone: string;
    email: string;
  };
}

/* ======================================================
   MOCK DATA (API READY)
====================================================== */

const PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Modern Luxury Penthouse",
    location: "Downtown Metro",
    address: "123 Skyline Avenue, Downtown Metro",
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
    description:
      "Luxury penthouse with panoramic city views and smart home features.",
    features: [
      "Smart Home System",
      "Private Terrace",
      "24/7 Security",
      "Gym & Spa",
    ],
    agent: {
      name: "Sarah Johnson",
      phone: "+1 555 123 4567",
      email: "sarah@irems.com",
    },
  },
  {
    id: 2,
    title: "Suburban Family Home",
    location: "Green Valley",
    address: "456 Oak Lane, Green Valley",
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
    description:
      "Spacious family home in a quiet neighborhood with modern interiors.",
    features: [
      "Large Backyard",
      "Garage",
      "Home Office",
      "Central AC",
    ],
    agent: {
      name: "Michael Chen",
      phone: "+1 555 234 5678",
      email: "michael@irems.com",
    },
  },
  {
    id: 3,
    title: "Premium Office Space",
    location: "Business District",
    address: "789 Corporate Blvd",
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
    description:
      "High-end commercial office space ideal for corporate headquarters.",
    features: [
      "High-Speed Internet",
      "Conference Rooms",
      "Parking Space",
    ],
    agent: {
      name: "David Smith",
      phone: "+1 555 789 4561",
      email: "david@irems.com",
    },
  },
];

/* ======================================================
   COMPONENT
====================================================== */

const Properties = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [category, setCategory] = useState<PropertyCategory>("all");
  const [search, setSearch] = useState("");

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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or location"
                className="w-full h-12 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex gap-2">
              {(["all", "sale", "rent"] as const).map((value) => (
                <button
                  key={value}
                  onClick={() => setCategory(value)}
                  className={`px-4 h-12 rounded-lg border ${
                    category === value
                      ? "bg-blue-600 text-white"
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
                  viewMode === "grid" ? "bg-blue-600 text-white" : ""
                }`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 ${
                  viewMode === "list" ? "bg-blue-600 text-white" : ""
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
            Showing {filteredProperties.length} results
          </p>

          {/* PROPERTY GRID */}
          <section
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredProperties.map((property) => (
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
                      <Heart size={18} />
                    </button>
                  </div>

                  <div className="p-5 flex-1">
                    <h3 className="font-semibold text-lg group-hover:text-blue-600">
                      {property.title}
                    </h3>

                    <p className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                      <MapPin size={14} />
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
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;
