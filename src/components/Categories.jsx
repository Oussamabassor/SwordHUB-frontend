import React from 'react';
import { Shirt, Watch, Briefcase, Footprints } from 'lucide-react';
import '../styles/components/Categories.css';

const categories = [
  {
    name: 'Clothing',
    icon: Shirt,
    description: 'Premium quality clothing for every occasion'
  },
  {
    name: 'Accessories',
    icon: Watch,
    description: 'Elegant accessories to complete your look'
  },
  {
    name: 'Bags',
    icon: Briefcase,
    description: 'Stylish bags for work and leisure'
  },
  {
    name: 'Footwear',
    icon: Footprints,
    description: 'Comfortable and trendy footwear collection'
  },
  {
    name: 'Clothing',
    icon: Shirt,
    description: 'Premium quality clothing for every occasion'
  },
  {
    name: 'Accessories',
    icon: Watch,
    description: 'Elegant accessories to complete your look'
  },
];

export function Categories() {
  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.name} className="category-card">
                <Icon className="category-icon" />
                <h3 className="category-title">{category.name}</h3>
                <p className="category-description">{category.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}