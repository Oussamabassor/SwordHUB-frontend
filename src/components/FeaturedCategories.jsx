import React from "react";

const categories = [
  {
    id: 1,
    name: "Training",
    description: "Get fit with our premium training gear",
    image: "/categories/training.jpg",
    gradient: "from-primary/20 to-transparent",
  },
  {
    id: 2,
    name: "Running",
    description: "Achieve your personal best",
    image: "/categories/running.jpg",
    gradient: "from-secondary/20 to-transparent",
  },
  {
    id: 3,
    name: "Team Sports",
    description: "Gear up for victory",
    image: "/categories/team-sports.jpg",
    gradient: "from-primary/20 to-transparent",
  },
  {
    id: 4,
    name: "Accessories",
    description: "Complete your athletic look",
    image: "/categories/accessories.jpg",
    gradient: "from-secondary/20 to-transparent",
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-primary">Explore</span> Categories
          </h2>
          <p className="text-neutral max-w-2xl mx-auto">
            Discover our wide range of sports equipment and apparel designed for
            peak performance
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative h-80 rounded-lg overflow-hidden cursor-pointer"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.gradient}`}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-light/80 group-hover:text-light transition-colors">
                  {category.description}
                </p>

                {/* Hover effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex justify-center mt-12 space-x-4">
          <button className="px-8 py-3 bg-surface hover:bg-accent text-light rounded-lg transition-colors">
            View All Categories
          </button>
          <button className="px-8 py-3 bg-primary text-background rounded-lg hover:shadow-neon-green transition-all">
            Shop New Arrivals
          </button>
        </div>
      </div>
    </section>
  );
}
