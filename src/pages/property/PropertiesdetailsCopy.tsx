/* ======================================================
   IMPORTS
====================================================== */

import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  ArrowLeft,
  Calendar,
  Mail,
} from "lucide-react";

import Images from "../../components/constants/Images";
import type { Property } from "../../components/data/types/properties";

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
    description:
      "Experience luxury living with panoramic city views, smart home technology, and premium finishes designed for modern lifestyles.",
    features: [
      "Smart Home System",
      "Private Rooftop Terrace",
      "24/7 Concierge",
      "Private Parking",
      "Gym & Spa Access",
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
    description:
      "A spacious family home located in a quiet neighborhood with modern interiors and a large outdoor area.",
    features: [
      "Large Backyard",
      "Garage",
      "Home Office",
      "Central Air Conditioning",
    ],
    agent: {
      name: "Michael Chen",
      phone: "+1 555 234 5678",
      email: "michael@irems.com",
    },
  },
];

/* ======================================================
   COMPONENT
====================================================== */

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();

  const property = useMemo<Property | undefined>(() => {
    if (!id) return undefined;
    return PROPERTIES.find((item) => item.id === Number(id));
  }, [id]);

  if (!property) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Property not found</p>
          <Link to="/properties" className="text-primary underline">
            Back to Properties
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* BACK */}
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-6"
        >
          <ArrowLeft size={16} />
          Back to Properties
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT CONTENT */}
          <section className="lg:col-span-2 space-y-8">
            {/* IMAGE */}
            <div className="rounded-2xl overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-[420px] object-cover"
              />
            </div>

            {/* DETAILS */}
            <div>
              <h1 className="text-3xl font-bold">{property.title}</h1>

              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <MapPin size={16} />
                {property.address}
              </div>

              {/* STATS */}
              <div className="flex gap-6 mt-6">
                <Info icon={<Bed size={20} />} label="Beds" value={property.beds} />
                <Info icon={<Bath size={20} />} label="Baths" value={property.baths} />
                <Info
                  icon={<Square size={20} />}
                  label="Sq Ft"
                  value={property.sqft}
                />
              </div>

              {/* DESCRIPTION */}
              <p className="mt-6 text-gray-600 leading-relaxed">
                {property.description}
              </p>

              {/* FEATURES */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">
                  Features & Amenities
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {property.features.map((feature) => (
                    <li key={feature} className="text-gray-600">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SIDEBAR */}
          <aside className="sticky top-28 h-fit">
            <div className="border rounded-2xl p-6 space-y-6">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {property.price}
                </div>
                <span className="text-sm text-gray-500">
                  {property.priceLabel}
                </span>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white hover:opacity-90">
                <Calendar size={16} />
                Schedule Viewing
              </button>

              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border hover:bg-gray-50">
                <Mail size={16} />
                Contact Agent
              </button>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Listed by</p>
                <div className="font-semibold">{property.agent.name}</div>
                <p className="text-sm text-gray-500">
                  {property.agent.phone}
                </p>
                <p className="text-sm text-gray-500">
                  {property.agent.email}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

/* ======================================================
   SUB COMPONENT
====================================================== */

interface InfoProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}

const Info = ({ icon, value, label }: InfoProps) => (
  <div className="flex items-center gap-2">
    {icon}
    <div>
      <div className="font-semibold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  </div>
);

export default PropertyDetail;
