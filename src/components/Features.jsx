import React from "react";
import { Truck, RotateCcw, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all orders over $100",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy for all items",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "2-4 business days delivery time",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "100% secure payment processing",
  },
];

export function Features() {
  return (
    <section className="py-16 bg-surface">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 transition-colors rounded-lg group bg-accent/50 hover:bg-accent"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 transition-all rounded-lg bg-primary/10 text-primary group-hover:shadow-neon-green">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-light">
                    {feature.title}
                  </h3>
                  <p className="transition-colors text-neutral group-hover:text-light/80">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
