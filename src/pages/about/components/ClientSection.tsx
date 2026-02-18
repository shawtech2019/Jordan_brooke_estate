


const ClientSection = () => {
    const stats = [
        { value: "10+", label: "Years Experience" },
        { value: "5,000+", label: "Properties Managed" },
        { value: "15,000+", label: "Happy Clients" },
        { value: "98%", label: "Satisfaction Rate" },
      ];
  return (
    <section className="py-12 bg-[#031F22]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-4xl font-inter font-bold text-[#ffffff] tracking-[0.7px] mb-2">
                  {stat.value}
                </div>
                <div className="text-[#ffffff]/70 font-display tracking-[0.8px] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default ClientSection
