import { Target, Users, Award } from "lucide-react"
import type { FC, SVGProps } from "react"

type ValueItem = {
  icon: FC<SVGProps<SVGSVGElement>>
  title: string
  description: string
}

const VALUES: ValueItem[] = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To revolutionize real estate management by providing an integrated platform that simplifies property transactions for all stakeholders.",
  },
  {
    icon: Users,
    title: "Our Team",
    description:
      "A dedicated team of real estate professionals, technologists, and customer service experts committed to your success.",
  },
  {
    icon: Award,
    title: "Our Values",
    description:
      "Transparency, integrity, and innovation drive everything we do. We believe in building lasting relationships.",
  },
]

const OurValueSection: FC = () => {
  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#e5383b] font-display font-semibold text-sm uppercase tracking-wider mb-2">
            Our Values
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#031F22] mb-4">
            What Drives Us
          </h2>
          <p className="text-gray-600 font-inter">
            Our commitment to excellence shapes every aspect of our platform and service.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((value, index) => {
            const Icon = value.icon

            return (
              <div
                key={value.title}
                className="group bg-white rounded-2xl p-12 shadow hover:shadow-lg text-center transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="bg-[#e5383b]/10  group-hover:bg-[#e5383b] group-hover:scale-110 transition-all duration-300  w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-[#e5383b] group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-semibold text-[#031F22] tracking-[0.8px] mb-2">
                  {value.title}
                </h3>
                <p className="text-[15px] font-inter text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default OurValueSection
