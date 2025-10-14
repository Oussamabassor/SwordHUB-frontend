import React from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ProductGrid } from "../components/ProductGrid";
import { Footer } from "../components/Footer";

export const HomePage = () => {
  return (
    <div className="min-h-screen transition-colors bg-background text-text">
      <Header />
      <main className="pt-20">
        <Hero />
        <ProductGrid />
      </main>

      <Footer />
    </div>
  );
};
