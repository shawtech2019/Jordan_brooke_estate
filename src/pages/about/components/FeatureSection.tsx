import { CheckCircle} from "lucide-react"
import Images from "../../../components/constants/Images"

const FEATURES: string[] = [
  "Comprehensive property management tools",
    "Secure tenant and landlord portals",
    "Real-time financial tracking and reporting",
    "Integrated maintenance request system",
    "Smart investment analytics",
    "24/7 customer support",
]

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-[#e5383b] font-display font-semibold text-sm uppercase tracking-wider mb-2">
              Why Choose IREMS
            </p>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#031F22] mb-6">
              A Smarter Way to Manage Real Estate
            </h2>

            <p className="text-gray-600 mb-8 max-w-xl">
              Our platform brings together all the tools you need to manage properties,
              tenants, and investments in one seamless experience.
            </p>

            <ul className="space-y-4">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#e5383b] flex-shrink-0 mt-1" />
                  <span className="text-[#031F22]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-white shadow flex items-center justify-center"
             style={{ backgroundImage: `url(${Images.HeroSectionImg})` }}
            >
                <div className="w-40 h-40">
            <img src={Images.LogoImg} className="rounded-[20px]"/>
          </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-[#e5383b]/10" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
