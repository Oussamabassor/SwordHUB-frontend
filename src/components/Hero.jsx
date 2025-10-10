import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  ChevronRight,
  ArrowRight,
  Leaf,
  Truck,
  Shield,
  Loader,
} from "lucide-react";
import { motion } from "framer-motion";
import { ProductViewer } from "./ProductViewer";
import { productsApi } from "../services/apiService";
import "../styles/components/Hero.css";

export const Hero = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsApi.getAll();
      console.log("Hero Products API Response:", response);

      // Backend returns: { success: true, data: { products: [...], total, page, limit } }
      const productsData = response?.data?.products || response?.products || [];
      console.log("Extracted products data:", productsData);

      // Log first product to see structure
      if (productsData.length > 0) {
        console.log("First product structure:", productsData[0]);
      }

      // Get first 4 products with images (check both 'images' array and 'image' string)
      const products = Array.isArray(productsData)
        ? productsData
            .filter((p) => {
              const hasImages = (p.images && p.images.length > 0) || p.image;
              if (!hasImages) {
                console.log("Product without image:", p.name, p);
              }
              return hasImages;
            })
            .slice(0, 4)
            .map((p) => ({
              id: p._id || p.id,
              name: p.name,
              // Try images array first, then single image field
              image: (p.images && p.images[0]) || p.image,
            }))
        : [];

      console.log("Featured products to display:", products);

      if (products.length === 0) {
        console.warn("No products with images found, using fallback");
        // Fallback to placeholder images
        setFeaturedProducts([
          {
            id: "1",
            name: "Featured Product 1",
            image: "/images/placeholders/swordshirt.jpg",
          },
          {
            id: "2",
            name: "Featured Product 2",
            image: "/images/placeholders/swordshirt2.jpg",
          },
          {
            id: "3",
            name: "Featured Product 3",
            image: "/images/products/T-shirt3.png",
          },
          {
            id: "4",
            name: "Featured Product 4",
            image: "/images/products/T-shirt4.png",
          },
        ]);
      } else {
        setFeaturedProducts(products);
      }
    } catch (error) {
      console.error("Error fetching featured products:", error);
      // Fallback to placeholder images
      setFeaturedProducts([
        {
          id: "1",
          name: "Featured Product 1",
          image: "/images/placeholders/swordshirt.jpg",
        },
        {
          id: "2",
          name: "Featured Product 2",
          image: "/images/placeholders/swordshirt2.jpg",
        },
        {
          id: "3",
          name: "Featured Product 3",
          image: "/images/products/T-shirt3.png",
        },
        {
          id: "4",
          name: "Featured Product 4",
          image: "/images/products/T-shirt4.png",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      const targetPosition =
        productsSection.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500; // 1.5 seconds for smooth, slow scroll
      let start = null;

      // Easing function for smooth animation
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  const navigateToSizeGuide = () => {
    navigate("/size-guide");
  };
  const stats = [
    {
      label: "Eco-Friendly Materials",
      value: "100%",
      icon: <Leaf className="text-primary" size={20} />,
    },
    {
      label: "Express Delivery",
      value: "2-3 Days",
      icon: <Truck className="text-primary" size={20} />,
    },
    {
      label: "Quality Guarantee",
      value: "Lifetime",
      icon: <Shield className="text-primary" size={20} />,
    },
  ];

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-background min-h-[600px] flex items-center justify-center py-6">
        <Loader className="animate-spin h-12 w-12 text-primary" />
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-background min-h-[600px] flex items-center py-6">
      {/* Ambient Background */}
      <div className="absolute inset-0 hero-wrapper">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/90 to-background/70" />
        <div className="absolute inset-0 z-0 hero-background">
          <img
            src="/images/logo/hero-bg3.jpeg"
            alt="Background"
            className="object-cover w-full h-full opacity-60"
          />
        </div>
        <div className="absolute inset-0 z-20 bg-gradient-to-tr from-primary/20 to-secondary/20" />
      </div>

      {/* Content Grid */}
      <div className="container relative z-30 px-4 mx-auto lg:px-8">
        <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center py-4 sm:py-6">
            {/* Tag line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-1.5 mb-6 border rounded-full bg-primary/10 text-primary backdrop-blur-sm border-primary/20"
            >
              <span className="text-sm font-medium">New Collection 2025</span>
              <ChevronRight size={16} className="ml-2" />
            </motion.div>

            {/* Main content */}
            <div className="max-w-xl space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl font-bold leading-tight lg:text-6xl"
              >
                Premium Gym <span className="text-primary">T-Shirts</span> for
                Peak <span className="text-primary">Performance</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-text-muted"
              >
                Discover our collection of high-performance gym t-shirts
                designed for maximum comfort and breathability.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <button
                  onClick={scrollToProducts}
                  className="flex items-center px-6 py-3 text-base font-semibold transition-all rounded-lg group bg-primary text-background hover:shadow-neon-green"
                >
                  Browse T-Shirts
                  <ShoppingBag className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={navigateToSizeGuide}
                  className="flex items-center px-6 py-3 text-base font-semibold transition-all border rounded-lg group border-primary/50 text-primary hover:bg-primary/10"
                >
                  Size Guide
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-4 pt-6"
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="p-3 text-center border rounded-xl bg-surface/30 backdrop-blur-sm border-primary/10"
                  >
                    <div className="flex justify-center mb-1">{stat.icon}</div>
                    <div className="mb-0.5 text-lg font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-text-muted">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right Column - Interactive Product View */}
          <div className="flex items-center justify-center h-full py-4 sm:py-6">
            <ProductViewer
              products={featuredProducts}
              onProductClick={handleProductClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
