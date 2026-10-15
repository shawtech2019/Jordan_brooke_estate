import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import {
  Eye,
  Pencil,
  MoreHorizontal,
  MapPin,
  Save,
  Search,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

import LandlordModal from "../../modal/LandlordModal";
import { httpGet, resolveAssetUrl } from "../../utils/api_utils";

/** Shape returned by GET /api/investor/properties. */
interface ApiProperty {
  id: number;
  title: string;
  propertyType: string;
  purpose: string;
  price: number | null;
  pricePeriod: string | null;
  totalUnits: number | null;
  status: string;
  city: string | null;
  state: string | null;
  address: string | null;
  images: string[];
  videos: string[];
}

/** Row shape used by the table and modals. */
interface Property {
  id: number;
  name: string;
  location: string;
  units: number;
  status: string;
  type: string;
  purpose: string;
  address: string;
  income: string;
  image: string;
}

const formatIncome = (p: ApiProperty): string => {
  if (p.price === null) return "—";
  const amount = `₦${Number(p.price).toLocaleString()}`;
  if (p.purpose === "For Sale") return amount;
  const period = (p.pricePeriod || "").replace("Per ", "").toLowerCase();
  return period ? `${amount}/${period}` : amount;
};

/** Map an API property into the row shape the page renders. */
const toDisplay = (p: ApiProperty): Property => ({
  id: p.id,
  name: p.title,
  location: [p.city, p.state].filter(Boolean).join(", ") || "—",
  units: p.totalUnits ?? 0,
  status: p.status || "Active",
  type: p.propertyType || "—",
  purpose: p.purpose || "—",
  address: p.address || "",
  income: formatIncome(p),
  image: p.images?.[0] ? resolveAssetUrl(p.images[0]) : "",
});

function ViewPropertyModal({
  prop,
  onClose,
}: {
  prop: Property;
  onClose: () => void;
}) {
  return (
    <LandlordModal
      title="Property Details"
      onClose={onClose}
      size="lg"
    >
      <div className="space-y-5">
        <div className="flex gap-4 items-start">
          <div className="w-36 h-28 rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center text-4xl shrink-0">
            🏘️
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {prop.name}
            </h3>

            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <MapPin size={13} />
              {prop.location}
            </p>

            <p className="text-xs text-gray-400 mt-0.5">
              {prop.address}
            </p>

            <span
              className={`badge mt-2 inline-flex ${
                prop.status === "Active"
                  ? "badge-green"
                  : "badge-gray"
              }`}
            >
              {prop.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            ["Total Units", prop.units],
            ["Property Type", prop.type],
            ["Price", prop.income],
            ["Purpose", prop.purpose],
          ].map(([label, value]) => (
            <div
              key={String(label)}
              className="bg-gray-50 rounded-xl p-3"
            >
              <p className="text-xs text-gray-400 font-medium mb-0.5">
                {label}
              </p>

              <p className="text-sm font-bold text-gray-900">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Full Address
          </p>

          <p className="text-sm text-gray-700">
            {prop.address}
          </p>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="btn-outline flex-1 py-2.5"
          >
            Close
          </button>

          <button
            onClick={onClose}
            className="btn-primary flex-1 py-2.5"
          >
            View Full Details
          </button>
        </div>
      </div>
    </LandlordModal>
  );
}

function EditPropertyModal({
  prop,
  onClose,
}: {
  prop: Property;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: prop.name,
    location: prop.location,
    address: prop.address,
    units: String(prop.units),
    status: prop.status,
    type: prop.type,
  });

  return (
    <LandlordModal
      title="Edit Property"
      onClose={onClose}
      size="md"
    >
      <div className="space-y-4">
        {(
          [
            ["Property Name", "name"],
            ["Location", "location"],
            ["Address", "address"],
            ["Total Units", "units"],
          ] as [string, keyof typeof form][]
        ).map(([label, key]) => (
          <div key={key}>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
              {label}
            </label>

            <input
              className="input"
              value={form[key]}
              onChange={(e) =>
                setForm({
                  ...form,
                  [key]: e.target.value,
                })
              }
            />
          </div>
        ))}

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
            Status
          </label>

          <select
            className="input"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
            Property Type
          </label>

          <select
            className="input"
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
          >
            <option>Apartment Building</option>
            <option>Commercial</option>
            <option>Single Family</option>
          </select>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="btn-outline flex-1 py-2.5"
          >
            Cancel
          </button>

          <button
            onClick={onClose}
            className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2"
          >
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </div>
    </LandlordModal>
  );
}

export default function PropertiesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    city: "",
    status: "",
    type: "",
  });

  const [propertyList, setPropertyList] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const data = await httpGet<{ properties: ApiProperty[] }>(
          "/investor/properties"
        );
        if (active) setPropertyList((data.properties || []).map(toDisplay));
      } catch (error) {
        if (active) {
          toast.error((error as Error).message || "Could not load properties");
        }
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const [viewProp, setViewProp] =
    useState<Property | null>(null);

  const [editProp, setEditProp] =
    useState<Property | null>(null);

  const cities = [
    ...new Set(propertyList.map((p) => p.location)),
  ];

  const statuses = [
    ...new Set(propertyList.map((p) => p.status)),
  ];

  const types = [
    ...new Set(propertyList.map((p) => p.type)),
  ];

  const filteredProperties = propertyList.filter((p) => {
    const matchesSearch =
      p.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      p.location
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCity =
      !filters.city || p.location === filters.city;

    const matchesStatus =
      !filters.status ||
      p.status === filters.status;

    const matchesType =
      !filters.type || p.type === filters.type;

    return (
      matchesSearch &&
      matchesCity &&
      matchesStatus &&
      matchesType
    );
  });

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const totalPages = Math.ceil(
    filteredProperties.length / itemsPerPage
  );

  const paginatedData = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Properties
          </h1>

          <p className="text-sm text-gray-500 mt-0.5">
            Manage all your owned properties.
          </p>
        </div>

        <button
          onClick={() => navigate("/investor/properties/new")}
          className="btn-green flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
        >
          + Add Property
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal size={18} />
              Property Filters
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Quickly search and filter your properties.
            </p>
          </div>

          <button
            onClick={() =>
              setFilters({
                city: "",
                status: "",
                type: "",
              })
            }
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            <RotateCcw size={16} />
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Search Property
            </label>

            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search properties..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              City
            </label>

            <select
              className="w-full h-11 px-4 rounded-xl border border-gray-200"
              value={filters.city}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            >
              <option value="">All Cities</option>

              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Status
            </label>

            <select
              className="w-full h-11 px-4 rounded-xl border border-gray-200"
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
            >
              <option value="">All Status</option>

              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Property Type
            </label>

            <select
              className="w-full h-11 px-4 rounded-xl border border-gray-200"
              value={filters.type}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
            >
              <option value="">All Types</option>

              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-700">
            Property List
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
          <thead className="bg-gray-900">
            <tr>
              {[
                "Property Name",
                "Location",
                "Total Units",
                "Price",
                "Status",
                "Actions",
              ].map((h) => (
                <th key={h} className="th">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {loading && (
              <tr>
                <td colSpan={6} className="td text-center text-gray-500">
                  Loading properties...
                </td>
              </tr>
            )}

            {!loading && paginatedData.length === 0 && (
              <tr>
                <td colSpan={6} className="td text-center text-gray-500">
                  No properties yet. Click “+ Add Property” to create one.
                </td>
              </tr>
            )}

            {!loading && paginatedData.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="td">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaCircleUser
                          size={35}
                          color="#e5383b"
                        />
                      )}
                    </div>

                    <span className="font-medium text-gray-900">
                      {p.name}
                    </span>
                  </div>
                </td>

                <td className="td text-gray-500">
                  {p.location}
                </td>

                <td className="td">{p.units}</td>

                <td className="td">{p.income}</td>

                <td className="td">
                  <span
                    className={`badge ${
                      p.status === "Active"
                        ? "badge-green"
                        : "badge-gray"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="td">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewProp(p)}
                      className="flex items-center gap-1 px-2 py-1.5 bg-red-500 text-white rounded text-xs"
                    >
                      <Eye size={11} />
                      View
                    </button>

                    <button
                      onClick={() => setEditProp(p)}
                      className="flex items-center gap-1 px-2 py-1.5 border border-gray-200 rounded text-xs"
                    >
                      <Pencil size={11} />
                      Edit
                    </button>

                    <button className="p-1.5 border border-gray-200 rounded">
                      <MoreHorizontal
                        size={14}
                        className="text-gray-500"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>

      {viewProp && (
        <ViewPropertyModal
          prop={viewProp}
          onClose={() => setViewProp(null)}
        />
      )}

      {editProp && (
        <EditPropertyModal
          prop={editProp}
          onClose={() => setEditProp(null)}
        />
      )}

      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((p) => p - 1)
          }
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <div className="flex gap-2">
          {Array.from(
            { length: totalPages },
            (_, i) => (
              <button
                key={i}
                onClick={() =>
                  setCurrentPage(i + 1)
                }
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-[#e5383b] text-white"
                    : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>

        <button
          disabled={totalPages === 0 || currentPage >= totalPages}
          onClick={() =>
            setCurrentPage((p) => p + 1)
          }
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}