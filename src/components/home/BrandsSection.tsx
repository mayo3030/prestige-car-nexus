const brands = [
  { name: "Honda", logo: "🔴" },
  { name: "Mazda", logo: "Ⓜ️" },
  { name: "Toyota", logo: "🔵" },
];

export function BrandsSection() {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-champagne text-xs md:text-sm font-medium uppercase tracking-[0.15em]">
            All Makes & Models
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold mt-2">
            Browse By Brand
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <span className="text-4xl">{brand.logo}</span>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-champagne transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
