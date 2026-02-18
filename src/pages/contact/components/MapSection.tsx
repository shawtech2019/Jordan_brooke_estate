import { MapPin } from "lucide-react"

const MapSection = () => {
  return (
    <section className="pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-80 rounded-2xl overflow-hidden shadow">
          {/* Google Map */}
          <iframe
            title="IREMS Location"
            src="https://www.google.com/maps?q=4%20Dada%20Fayemi%20Close,%20Osapa%20London,%20Lekki,%20Lagos&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Overlay Badge */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-xl px-4 py-2 shadow flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#e5383b]" />
            <span className="text-sm font-medium text-[#031F22]">
              Osapa London, Lekki
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection
