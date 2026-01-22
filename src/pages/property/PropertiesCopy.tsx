/* ======================================================
   IMPORTS
====================================================== */

import { useEffect, useMemo, useState } from "react";
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

export type ViewMode = "grid" | "list";
export type PropertyCategory = "sale" | "rent";
export type PropertyStatus = "available" | "rented";
export type PropertyType = "Residential" | "Commercial";

export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  priceLabel: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  status: PropertyStatus;
  type: PropertyType;
  category: PropertyCategory;
}

interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
}

/* ======================================================
   HELPERS
====================================================== */

const PAGE_SIZE = 6;

const paginate = <T,>(
  data: T[],
  page: number,
  pageSize: number
): PaginatedResult<T> => {
  const start = (page - 1) * pageSize;

  return {
    items: data.slice(start, start + pageSize),
    totalItems: data.length,
    totalPages: Math.max(1, Math.ceil(data.length / pageSize)),
  };
};

/* ======================================================
   MOCK DATA
====================================================== */

const PROPERTIES: Property[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Premium Property ${i + 1}`,
  location: i % 2 === 0 ? "Downtown Metro" : "Green Valley",
  price: i % 3 === 0 ? "$1,250,000" : "$3,500 / mo",
  priceLabel: i % 3 === 0 ? "For Sale" : "For Rent",
  beds: (i % 5) + 1,
  baths: (i % 3) + 1,
  sqft: 1200 + i * 120,
  image:
    i % 3 === 0
      ? Images.PropertiesImgOne
      : i % 3 === 1
      ? Images.PropertiesImgTwo
      : Images.PropertiesImgThree,
  status: i % 4 === 0 ? "rented" : "available",
  type: i % 2 === 0 ? "Residential" : "Commercial",
  category: i % 3 === 0 ? "sale" : "rent",
}));

/* ======================================================
   COMPONENT
====================================================== */

const Properties = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [category, setCategory] = useState<PropertyCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* Reset page when filters change */
  useEffect(() => {
    setPage(1);
  }, [category, search]);

  /* ======================================================
     FILTERED DATA
  ====================================================== */

  const filteredProperties = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return PROPERTIES.filter((property) => {
      const matchesCategory =
        category === "all" || property.category === category;

      const matchesSearch =
        !keyword ||
        property.title.toLowerCase().includes(keyword) ||
        property.location.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  /* ======================================================
     PAGINATION
  ====================================================== */

  const pagination = useMemo(
    () => paginate(filteredProperties, page, PAGE_SIZE),
    [filteredProperties, page]
  );

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
            {/* SEARCH */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or location"
                className="w-full h-12 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* CATEGORY */}
            <div className="flex gap-2">
              {["all", "sale", "rent"].map((value) => (
                <button
                  key={value}
                  onClick={() =>
                    setCategory(value as PropertyCategory | "all")
                  }
                  className={`px-4 h-12 rounded-lg border transition ${
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

            {/* VIEW MODE */}
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
            Showing {pagination.totalItems} results
          </p>

          {/* PROPERTY LIST */}
          <section
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {pagination.items.map((property) => (
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

          {/* PAGINATION */}
          {pagination.totalPages > 1 && (
            <nav className="flex justify-center gap-2 mt-12">
              {Array.from({ length: pagination.totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg border ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </nav>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;
