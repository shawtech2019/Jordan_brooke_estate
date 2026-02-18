import { Send, Mail, Phone, MapPin, Clock } from "lucide-react"
import { useState } from "react"

type ContactItem = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  title: string
  details: string[]
}

const CONTACT_INFO: ContactItem[] = [
    {
        icon: MapPin,
        title: "Visit Us",
        details: ["4 Dada Fayemi Close, Osapa London, Lekki, Lagos"],
      },
      {
        icon: Phone,
        title: "Call Us",
        details: ["+234 8140458563", "+2347033423975"],
      },
      {
        icon: Mail,
        title: "Email Us",
        details: ["facilities@jordanbrookeestates.com", "support@irems.com"],
      },
      {
        icon: Clock,
        title: "Business Hours",
        details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      },
]

const ContactFormSection = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      alert("Message sent successfully!")
    }, 1500)
  }

  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-display font-bold text-[#031F22] mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below and we'll respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#031F22] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Shaw Samuel"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#e5383b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#031F22] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="samuelshaw@gmail.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#e5383b] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#031F22] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+2349067157664"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#e5383b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#031F22] mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="How can we help?"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#e5383b] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#031F22] mb-1">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us more about your inquiry..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#e5383b] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg bg-[#e5383b] px-6 py-3 text-white font-semibold hover:bg-[#c72f32] transition disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#e5383b]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#e5383b]" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#031F22] mb-1">
                        {item.title}
                      </h3>
                      {item.details.map((detail) => (
                        <p
                          key={detail}
                          className="text-sm text-gray-600"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactFormSection
