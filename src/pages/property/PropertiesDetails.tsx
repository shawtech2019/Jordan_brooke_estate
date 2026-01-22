/* ======================================================
   IMPORTS
====================================================== */

import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  Heart,
  Share2,
  Check,
} from "lucide-react";
import Footer from "../../components/layout/footer/Footer";
import Images from "../../components/constants/Images";

/* ======================================================
   TYPES
====================================================== */

interface Property {
  id: number;
  title: string;
  location: string;
  address: string;
  price: string;
  priceLabel: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  images: string[];
  status: "available" | "rented";
  type: "Residential" | "Commercial";
  description: string;
  features: string[];
  agent: {
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
    images: [Images.PropertiesImgOne, Images.PropertiesImgTwo, Images.PropertiesImgThree],
    status: "available",
    type: "Residential",
    description:
      "Experience luxury living with panoramic city views, premium finishes, and smart home technology.",
    features: [
      "Private rooftop terrace",
      "Smart home system",
      "24/7 concierge",
      "Gym & spa access",
      "Private parking",
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
  {
    id: 3,
    title: "Premium Office Space",
    location: "Business District",
    address: "789 Commerce Tower, Business District",
    price: "$8,500/mo",
    priceLabel: "For Rent",
    beds: 0,
    baths: 2,
    sqft: "5,500",
    image: Images.PropertiesImgThree,
    images: [Images.PropertiesImgThree, Images.PropertiesImgOne, Images.PropertiesImgTwo],
    status: "available",
    type: "Commercial",
    description: "Prime commercial office space in the heart of the business district. This modern space features an open floor plan, high ceilings, and abundant natural light. Perfect for growing businesses seeking a prestigious address and professional environment.",
    features: [
      "Open floor plan",
      "High-speed internet ready",
      "Conference room",
      "Reception area",
      "Kitchenette",
      "24/7 building access",
      "Underground parking",
      "On-site security",
    ],
    agent: {
      name: "Emily Rodriguez",
      phone: "+1 (555) 345-6789",
      email: "emily@irems.com",
    },
  },
];

/* ======================================================
   COMPONENT
====================================================== */

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);

  const property = useMemo<Property | undefined>(() => {
    if (!id) return undefined;
    return PROPERTIES.find((item) => item.id === Number(id));
  }, [id]);

  if (!property) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Property not found</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* BACK */}
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft size={16} />
            Back to Properties
          </Link>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* LEFT */}
            <section className="lg:col-span-2 space-y-8">
              {/* IMAGE GALLERY */}
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden relative">
                  <img
                    src={property.images[activeImage]}
                    alt={property.title}
                    className="w-full h-[420px] object-cover"
                  />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge label={property.status} />
                    <Badge label={property.type} />
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2">
                    <IconButton icon={<Heart size={18} />} />
                    <IconButton icon={<Share2 size={18} />} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {property.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`rounded-xl overflow-hidden border-2 ${
                        activeImage === index
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${index + 1}`}
                        className="h-32 w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* DETAILS */}
              <div>
                <h1 className="text-3xl font-bold">{property.title}</h1>

                <div className="flex items-center gap-2 text-gray-500 mt-2">
                  <MapPin size={16} />
                  {property.address}
                </div>

                <div className="flex gap-6 mt-6">
                  <Info icon={<Bed />} label="Beds" value={property.beds} />
                  <Info icon={<Bath />} label="Baths" value={property.baths} />
                  <Info icon={<Square />} label="Sq Ft" value={property.sqft} />
                </div>

                <p className="mt-6 text-gray-600">
                  {property.description}
                </p>

                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">
                    Features & Amenities
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {property.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check size={16} className="text-primary" />
                        {feature}
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

                <button className="btn-primary">
                  <Calendar size={16} />
                  Schedule Viewing
                </button>

                <button className="btn-outline">
                  <Mail size={16} />
                  Contact Agent
                </button>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">Listed by</p>
                  <div className="font-semibold">
                    {property.agent.name}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Phone size={14} />
                    {property.agent.phone}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Mail size={14} />
                    {property.agent.email}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

/* ======================================================
   SUB COMPONENTS
====================================================== */

const Info = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}) => (
  <div className="flex items-center gap-2">
    {icon}
    <div>
      <div className="font-semibold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  </div>
);

const Badge = ({ label }: { label: string }) => (
  <span className="px-3 py-1 text-xs rounded-full bg-black/70 text-white">
    {label}
  </span>
);

const IconButton = ({ icon }: { icon: React.ReactNode }) => (
  <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:opacity-80">
    {icon}
  </button>
);

export default PropertyDetail;
