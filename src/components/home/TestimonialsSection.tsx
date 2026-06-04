import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Daniel Rivera",
    role: "Lease Client, Hoboken",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    content: "Jersey Auto Lease compared several dealer quotes and delivered a clean lease structure without making me spend a Saturday at a showroom.",
    rating: 5,
  },
  {
    name: "Alyssa Kim",
    role: "SUV Buyer, Fort Lee",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    content: "The broker desk gave me payment options, delivery timing, and the paperwork checklist in one place. It felt organized and transparent.",
    rating: 5,
  },
  {
    name: "Michael Stern",
    role: "Trade-In Client, Paramus",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
    content: "They helped review my trade, compare payoff numbers, and find a better monthly payment than I expected from walking into one dealer.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground mt-4">
            Real broker workflows matter: quote clarity, fast follow-up, and a clean path from vehicle interest to delivery.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative p-8 rounded-2xl bg-background border border-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
