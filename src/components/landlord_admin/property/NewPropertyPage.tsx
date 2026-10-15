import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { httpGet, httpUploadWithToken } from "../../utils/api_utils";
import {
  ArrowLeft,
  ImagePlus,
  Plus,
  Save,
  Trash2,
  Upload,
  Video,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Nigerian market options                                             */
/* ------------------------------------------------------------------ */

const NIGERIA_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

const DEFAULT_PERIODS = ["Per Annum", "Per Month", "Per Week", "Per Night", "Total (Outright)"];

const DEFAULT_PROPERTY_TYPES = [
  "Detached Duplex",
  "Semi-Detached Duplex",
  "Terraced Duplex",
  "Block of Flats / Apartment",
  "Mini Flat",
  "Self-Contained (Self-Con)",
  "Studio Apartment",
  "Bungalow",
  "Penthouse",
  "Maisonette",
  "Boys' Quarters (BQ)",
  "Land / Plot",
  "Commercial - Shop",
  "Commercial - Office",
  "Commercial - Warehouse",
  "Short-let Apartment",
  "Hostel",
  "Hotel / Guest House",
];

const DEFAULT_PURPOSES = ["For Rent", "For Sale", "Short Let", "Lease"];

const FURNISHING = ["Furnished", "Semi-Furnished", "Unfurnished"];

const CONDITIONS = [
  "Newly Built",
  "Excellent",
  "Fairly Used",
  "Needs Renovation",
];

const DEFAULT_AMENITIES = [
  "24/7 Power Supply",
  "Standby Generator",
  "Solar / Inverter",
  "Prepaid Meter",
  "Borehole / Water Supply",
  "Water Heater",
  "Air Conditioning",
  "Fitted Kitchen",
  "POP Ceiling",
  "Tiled Floors",
  "Built-in Wardrobes",
  "Balcony / Terrace",
  "Swimming Pool",
  "Gym",
  "Elevator / Lift",
  "Gated Estate",
  "24/7 Security / CCTV",
  "Interlocked Compound",
  "Parking Space",
  "Serviced",
  "Pet Friendly",
  "Garden / Green Area",
  "Boys' Quarters (BQ)",
  "Wheelchair Accessible",
  "Close to School",
  "Close to Market",
  "Good Road Network",
];
const DEFAULT_TITLE_DOCUMENTS = [
  "Certificate of Occupancy (C of O)",
  "Governor's Consent",
  "Deed of Assignment",
  "Survey Plan",
  "Excision & Gazette",
  "Registered Deed",
  "Right of Occupancy (R of O)",
  "Freehold",
  "Leasehold",
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card p-6">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

const label = "text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5";

function CheckboxGrid({
  options,
  selected,
  onToggle,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  columns?: string;
}) {
  return (
    <div className={`grid grid-cols-1 ${columns} gap-2`}>
      {options.map((option) => {
        const checked = selected.includes(option);
        return (
          <label
            key={option}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors ${
              checked
                ? "border-green-500 bg-green-50 text-green-800"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(option)}
              className="accent-green-600"
            />
            {option}
          </label>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function NewPropertyPage() {
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [videos, setVideos] = useState<
    { file?: File; url: string; name: string }[]
  >([]);
  const [videoLink, setVideoLink] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [documents, setDocuments] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    propertyType: DEFAULT_PROPERTY_TYPES[0],
    purpose: DEFAULT_PURPOSES[0],
    description: "",
    price: "",
    period: DEFAULT_PERIODS[0],
    negotiable: true,
    serviceCharge: "",
    cautionDeposit: "",
    agencyFee: "",
    legalFee: "",
    bedrooms: "",
    bathrooms: "",
    toilets: "",
    parking: "",
    furnishing: "Unfurnished",
    condition: "Excellent",
    totalUnits: "",
    floorArea: "",
    landSize: "",
    floors: "",
    yearBuilt: "",
    state: "",
    city: "",
    lga: "",
    estate: "",
    address: "",
    landmark: "",
    agentName: "",
    agentPhone: "",
    agentWhatsapp: "",
    availableFrom: "",
    status: "Active",
    featured: false,
  });

  const set = (key: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /* Lookup lists (property type, purpose, period, amenities, title docs)
     come from the database and are seeded on `npm start`. The local
     defaults are only a fallback if the API is unreachable. */
  const [lookup, setLookup] = useState({
    propertyTypes: DEFAULT_PROPERTY_TYPES,
    purposes: DEFAULT_PURPOSES,
    pricePeriods: DEFAULT_PERIODS,
    amenities: DEFAULT_AMENITIES,
    titleDocuments: DEFAULT_TITLE_DOCUMENTS,
  });

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const res: any = await httpGet("/lookup");
        const data = res?.data ?? res;

        const names = (rows: any[] | undefined, fallback: string[]) =>
          Array.isArray(rows) && rows.length
            ? rows.map((row) => String(row?.name ?? row))
            : fallback;

        const next = {
          propertyTypes: names(data?.propertyTypes, DEFAULT_PROPERTY_TYPES),
          purposes: names(data?.purposes, DEFAULT_PURPOSES),
          pricePeriods: names(data?.pricePeriods, DEFAULT_PERIODS),
          amenities: names(data?.amenities, DEFAULT_AMENITIES),
          titleDocuments: names(data?.titleDocuments, DEFAULT_TITLE_DOCUMENTS),
        };

        if (!active) return;
        setLookup(next);

        // Keep current selections valid if a list changed underneath us.
        setForm((prev) => ({
          ...prev,
          propertyType: next.propertyTypes.includes(prev.propertyType)
            ? prev.propertyType
            : next.propertyTypes[0],
          purpose: next.purposes.includes(prev.purpose)
            ? prev.purpose
            : next.purposes[0],
          period: next.pricePeriods.includes(prev.period)
            ? prev.period
            : next.pricePeriods[0],
        }));
      } catch {
        // Silently keep the built-in fallbacks.
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  /* Release object URLs when leaving the page */
  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
      videos.forEach((video) => video.file && URL.revokeObjectURL(video.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (
    list: string[],
    setList: (value: string[]) => void,
    value: string
  ) =>
    setList(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
    );

  /* ---------------- media ---------------- */

  const handleImages = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...next]);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleVideos = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setVideos((prev) => [...prev, ...next]);
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const addVideoLink = () => {
    const link = videoLink.trim();
    if (!link) return;
    setVideos((prev) => [...prev, { url: link, name: link }]);
    setVideoLink("");
  };

  const removeVideo = (index: number) => {
    setVideos((prev) => {
      if (prev[index].file) URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  /* ---------------- submit ---------------- */

  const isSale = form.purpose === "For Sale";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.title.trim()) return toast.error("Enter a property title");
    if (!form.state) return toast.error("Select a state");
    if (!form.city.trim()) return toast.error("Enter a city / area");
    if (!form.price.trim()) return toast.error("Enter a price");

    const formData = new FormData();
    formData.append("title", form.title.trim());
    formData.append("propertyType", form.propertyType);
    formData.append("purpose", form.purpose);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("pricePeriod", isSale ? "Total (Outright)" : form.period);
    formData.append("negotiable", String(form.negotiable));
    formData.append("serviceCharge", form.serviceCharge);
    formData.append("cautionDeposit", form.cautionDeposit);
    formData.append("agencyFee", form.agencyFee);
    formData.append("legalFee", form.legalFee);
    formData.append("bedrooms", form.bedrooms);
    formData.append("bathrooms", form.bathrooms);
    formData.append("toilets", form.toilets);
    formData.append("parking", form.parking);
    formData.append("furnishing", form.furnishing);
    formData.append("condition", form.condition);
    formData.append("totalUnits", form.totalUnits);
    formData.append("floorArea", form.floorArea);
    formData.append("landSize", form.landSize);
    formData.append("floors", form.floors);
    formData.append("yearBuilt", form.yearBuilt);
    formData.append("country", "Nigeria");
    formData.append("state", form.state);
    formData.append("city", form.city);
    formData.append("lga", form.lga);
    formData.append("estate", form.estate);
    formData.append("address", form.address);
    formData.append("landmark", form.landmark);
    formData.append("agentName", form.agentName);
    formData.append("agentPhone", form.agentPhone);
    formData.append("agentWhatsapp", form.agentWhatsapp);
    formData.append("availableFrom", form.availableFrom);
    formData.append("status", form.status);
    formData.append("featured", String(form.featured));
    formData.append("amenities", JSON.stringify(amenities));
    formData.append("titleDocuments", JSON.stringify(documents));
    formData.append(
      "videoLinks",
      JSON.stringify(videos.filter((video) => !video.file).map((v) => v.url))
    );
    images.forEach((image) => formData.append("images", image.file));
    videos.forEach((video) => {
      if (video.file) formData.append("videos", video.file);
    });

    setSaving(true);
    try {
      await httpUploadWithToken("/investor/properties", formData);
      toast.success("Property saved");
      setTimeout(() => navigate("/investor/properties"), 700);
    } catch (error) {
      toast.error((error as Error).message || "Could not save property");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-24">
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/investor/properties")}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50"
          aria-label="Back to properties"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            List a property for the Nigerian market.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Overview */}
        <Section title="Property Overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={label}>Property Title</label>
              <input
                className="input"
                placeholder="e.g. 4 Bedroom Detached Duplex at Lekki Phase 1"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Property Type</label>
              <select
                className="input"
                value={form.propertyType}
                onChange={(e) => set("propertyType", e.target.value)}
              >
                {lookup.propertyTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Purpose</label>
              <select
                className="input"
                value={form.purpose}
                onChange={(e) => set("purpose", e.target.value)}
              >
                {lookup.purposes.map((purpose) => (
                  <option key={purpose}>{purpose}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={label}>Description</label>
              <textarea
                className="input min-h-[110px]"
                placeholder="Describe the property, its finishes, neighbourhood and access..."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>
          </div>
        </Section>

        {/* Pricing */}
        <Section title="Pricing & Fees" subtitle="Amounts in Naira (₦).">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={label}>Price (₦)</label>
              <input
                className="input"
                type="number"
                placeholder="e.g. 85000000"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Price Period</label>
              <select
                className="input"
                disabled={isSale}
                value={isSale ? "Total (Outright)" : form.period}
                onChange={(e) => set("period", e.target.value)}
              >
                {lookup.pricePeriods.map((period) => (
                  <option key={period}>{period}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Service Charge (₦ / year)</label>
              <input
                className="input"
                type="number"
                placeholder="Optional"
                value={form.serviceCharge}
                onChange={(e) => set("serviceCharge", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Caution / Security Deposit (₦)</label>
              <input
                className="input"
                type="number"
                placeholder="Refundable deposit"
                value={form.cautionDeposit}
                onChange={(e) => set("cautionDeposit", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Agency Fee (%)</label>
              <input
                className="input"
                type="number"
                placeholder="e.g. 10"
                value={form.agencyFee}
                onChange={(e) => set("agencyFee", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Legal Fee (%)</label>
              <input
                className="input"
                type="number"
                placeholder="e.g. 5"
                value={form.legalFee}
                onChange={(e) => set("legalFee", e.target.value)}
              />
            </div>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.negotiable}
              onChange={(e) => set("negotiable", e.target.checked)}
              className="accent-green-600"
            />
            Price is negotiable
          </label>
        </Section>

        {/* Details */}
        <Section title="Property Details">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ["Bedrooms", "bedrooms"],
              ["Bathrooms", "bathrooms"],
              ["Toilets", "toilets"],
              ["Parking Spaces", "parking"],
              ["Total Units", "totalUnits"],
              ["Floor Area (sqm)", "floorArea"],
              ["Land Size (sqm)", "landSize"],
              ["Floors / Storey", "floors"],
              ["Year Built", "yearBuilt"],
            ].map(([text, key]) => (
              <div key={key}>
                <label className={label}>{text}</label>
                <input
                  className="input"
                  type="number"
                  value={form[key as keyof typeof form] as string}
                  onChange={(e) => set(key as keyof typeof form, e.target.value)}
                />
              </div>
            ))}
            <div>
              <label className={label}>Furnishing</label>
              <select
                className="input"
                value={form.furnishing}
                onChange={(e) => set("furnishing", e.target.value)}
              >
                {FURNISHING.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Condition</label>
              <select
                className="input"
                value={form.condition}
                onChange={(e) => set("condition", e.target.value)}
              >
                {CONDITIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </Section>

        {/* Location */}
        <Section title="Location" subtitle="Nigeria 🇳🇬">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={label}>Country</label>
              <input className="input bg-gray-100 text-gray-500" value="Nigeria" readOnly />
            </div>
            <div>
              <label className={label}>State</label>
              <select
                className="input"
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
              >
                <option value="">Select state</option>
                {NIGERIA_STATES.map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>City / Area</label>
              <input
                className="input"
                placeholder="e.g. Lekki"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Local Government Area (LGA)</label>
              <input
                className="input"
                placeholder="e.g. Eti-Osa"
                value={form.lga}
                onChange={(e) => set("lga", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Estate / Neighbourhood</label>
              <input
                className="input"
                placeholder="e.g. Cowrie Creek Estate"
                value={form.estate}
                onChange={(e) => set("estate", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Nearest Landmark</label>
              <input
                className="input"
                placeholder="e.g. Beside Admiralty Way"
                value={form.landmark}
                onChange={(e) => set("landmark", e.target.value)}
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className={label}>Street Address</label>
              <input
                className="input"
                placeholder="Plot 12, Admiralty Way, Lekki Phase 1"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
              />
            </div>
          </div>
        </Section>

        {/* Amenities */}
        <Section title="Amenities & Features">
          <CheckboxGrid
            options={lookup.amenities}
            selected={amenities}
            onToggle={(value) => toggle(amenities, setAmenities, value)}
          />
        </Section>

        {/* Title documents */}
        <Section title="Title / Documentation">
          <CheckboxGrid
            options={lookup.titleDocuments}
            selected={documents}
            onToggle={(value) => toggle(documents, setDocuments, value)}
          />
        </Section>

        {/* Media */}
        <Section
          title="Photos & Videos"
          subtitle="Add multiple images and videos. The first image becomes the cover."
        >
          {/* Images */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                Images ({images.length})
              </span>
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="btn-outline text-xs py-1.5 flex items-center gap-1.5"
              >
                <ImagePlus size={14} />
                Add Images
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((image, index) => (
                <div
                  key={image.url}
                  className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group"
                >
                  <img
                    src={image.url}
                    alt={`Property ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 0 && (
                    <span className="absolute top-2 left-2 badge badge-dark text-[10px]">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-green-500 hover:text-green-600 transition-colors"
              >
                <Plus size={22} />
                <span className="text-xs">Add</span>
              </button>
            </div>

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleImages(e.target.files)}
            />
          </div>

          {/* Videos */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                Videos ({videos.length})
              </span>
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="btn-outline text-xs py-1.5 flex items-center gap-1.5"
              >
                <Upload size={14} />
                Upload Videos
              </button>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                className="input"
                placeholder="Paste a video link (YouTube, Vimeo, Drive...)"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              />
              <button
                type="button"
                onClick={addVideoLink}
                className="btn-outline whitespace-nowrap flex items-center gap-1.5"
              >
                <Plus size={14} />
                Add Link
              </button>
            </div>

            {videos.length > 0 && (
              <ul className="space-y-2">
                {videos.map((video, index) => (
                  <li
                    key={`${video.url}-${index}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2"
                  >
                    <span className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                      <Video size={16} />
                    </span>
                    {video.file ? (
                      <video
                        src={video.url}
                        className="h-9 w-14 rounded object-cover shrink-0"
                        muted
                      />
                    ) : null}
                    <span className="flex-1 truncate text-sm text-gray-700">
                      {video.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeVideo(index)}
                      className="text-red-500 hover:text-red-600 p-1.5"
                      aria-label="Remove video"
                    >
                      <Trash2 size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={(e) => handleVideos(e.target.files)}
            />
          </div>
        </Section>

        {/* Agent + publishing */}
        <Section title="Agent & Publishing">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={label}>Agent / Lister Name</label>
              <input
                className="input"
                value={form.agentName}
                onChange={(e) => set("agentName", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Phone Number</label>
              <input
                className="input"
                type="tel"
                placeholder="+234 800 000 0000"
                value={form.agentPhone}
                onChange={(e) => set("agentPhone", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>WhatsApp Number</label>
              <input
                className="input"
                type="tel"
                placeholder="+234 800 000 0000"
                value={form.agentWhatsapp}
                onChange={(e) => set("agentWhatsapp", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Available From</label>
              <input
                className="input"
                type="date"
                value={form.availableFrom}
                onChange={(e) => set("availableFrom", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Status</label>
              <select
                className="input"
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Under Maintenance</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 md:mt-6">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="accent-green-600"
              />
              Mark as featured listing
            </label>
          </div>
        </Section>
      </form>

      {/* Sticky actions */}
      <div className="sticky bottom-0 -mx-1 px-1 pt-3 pb-3 bg-gradient-to-t from-background via-background to-transparent">
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/investor/properties")}
            className="btn-outline py-2.5 px-6"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="btn-green py-2.5 px-6 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Publish Property"}
          </button>
        </div>
      </div>
    </div>
  );
}
