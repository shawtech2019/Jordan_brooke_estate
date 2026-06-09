import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
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

const properties = [
  {
    id: 1,
    name: "Greenwood Apartment",
    location: "Austin, TX",
    units: 300,
    occ: "98%",
    status: "Active",
    type: "Apartment Building",
    address: "1234 W 5th Ave, Austin, TX 78703",
    income: "$56,000/mo",
    image: "",
  },
  {
    id: 2,
    name: "Lake View Estate",
    location: "Orlando, FL",
    units: 50,
    occ: "65%",
    status: "Active",
    type: "Apartment Building",
    address: "89 Lake Shore Dr, Orlando, FL 32801",
    income: "$18,000/mo",
    image: "",
  },
  {
    id: 3,
    name: "Desert Heights",
    location: "Phoenix, AZ",
    units: 75,
    occ: "88%",
    status: "Inactive",
    type: "Commercial",
    address: "300 Desert Blvd, Phoenix, AZ 85001",
    income: "$22,000/mo",
    image: "",
  },
  {
    id: 4,
    name: "Chicago Prime",
    location: "Chicago, IL",
    units: 150,
    occ: "72%",
    status: "Active",
    type: "Single Family",
    address: "500 N Michigan Ave, Chicago, IL 60611",
    income: "$42,000/mo",
    image: "",
  },
];

type Property = (typeof properties)[0];

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
            ["Occupancy Rate", prop.occ],
            ["Property Type", prop.type],
            ["Monthly Income", prop.income],
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

function AddPropertyModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (p: Property) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    address: "",
    units: "",
    status: "Active" as "Active" | "Inactive",
    type: "Apartment Building",
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    image: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreview(url);

    setForm((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleAdd = () => {
    const newProp: Property = {
      id: Date.now(),
      name: form.name,
      location: form.location,
      address: form.address,
      units: Number(form.units) || 0,
      occ: "0%",
      status: form.status,
      type: form.type,
      income: "$0/mo",
      image: preview || "",
    };

    onAdd(newProp);
    onClose();
  };

  return (
    <LandlordModal
      title="Add Property"
      onClose={onClose}
      size="lg"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Property Image
            </label>

            <div className="relative border-2 border-dashed rounded-xl h-40 overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Upload Image
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(
                    e.target.files?.[0] || null
                  )
                }
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Title"
              className="input"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />

            <input
              placeholder="Location"
              className="input"
              value={form.location}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
            />

            <input
              placeholder="Price"
              className="input"
              value={form.price}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
            />

            <input
              placeholder="Units"
              type="number"
              className="input"
              value={form.units}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  units: e.target.value,
                }))
              }
            />

            <input
              placeholder="Beds"
              className="input"
              value={form.beds}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  beds: e.target.value,
                }))
              }
            />

            <input
              placeholder="Baths"
              className="input"
              value={form.baths}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  baths: e.target.value,
                }))
              }
            />

            <input
              placeholder="Sqft"
              className="input col-span-2"
              value={form.sqft}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  sqft: e.target.value,
                }))
              }
            />
          </div>

          <button
            onClick={handleAdd}
            className="w-full h-11 bg-[#e5383b] text-white rounded-lg"
          >
            Add Property
          </button>
        </div>

        <div>
          <h3 className="font-semibold mb-3">
            Live Preview
          </h3>

          <div className="rounded-2xl overflow-hidden border shadow">
            <div className="aspect-[4/3]">
              <img
                src={
                  preview ||
                  "https://via.placeholder.com/600x400?text=Preview"
                }
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold">
                {form.name || "Property Title"}
              </h3>

              <p className="text-sm text-gray-500">
                {form.location || "Location"}
              </p>

              <div className="flex gap-3 text-sm mt-2 text-gray-500">
                <span>{form.beds || 0} Beds</span>
                <span>{form.baths || 0} Baths</span>
                <span>{form.sqft || 0} sqft</span>
              </div>

              <p className="mt-2 font-bold">
                {form.price || "$0"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </LandlordModal>
  );
}

export default function PropertiesPage() {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    city: "",
    status: "",
    type: "",
  });

  const [propertyList, setPropertyList] =
    useState<Property[]>(properties);

  const [viewProp, setViewProp] =
    useState<Property | null>(null);

  const [editProp, setEditProp] =
    useState<Property | null>(null);

  const [showAdd, setShowAdd] = useState(false);

  const cities = [
    ...new Set(propertyList.map((p) => p.location)),
  ];

  const statuses = ["Active", "Inactive"];

  const types = [
    ...new Set(propertyList.map((p) => p.type)),
  ];

  const handleAddProperty = (newProp: Property) => {
    setPropertyList((prev) => [newProp, ...prev]);
  };

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
          onClick={() => setShowAdd(true)}
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

        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              {[
                "Property Name",
                "Location",
                "Total Units",
                "Occupancy",
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
            {paginatedData.map((p) => (
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

                <td className="td">{p.occ}</td>

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

      {showAdd && (
        <AddPropertyModal
          onClose={() => setShowAdd(false)}
          onAdd={handleAddProperty}
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
          disabled={currentPage === totalPages}
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