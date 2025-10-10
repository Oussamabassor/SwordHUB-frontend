import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Check,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  Minus,
  Plus,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ImageWithLoader } from "../components/ImageWithLoader";
import { useOrders } from "../contexts/OrderContext";
import { productsApi } from "../services/apiService";
import { useToast } from "../components/ToastProvider";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openCart } = useOrders();
  const showToast = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsApi.getById(id);
      const productData = response?.data || response;
      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
      showToast("Failed to load product", "error");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      showToast("Please select a size", "error");
      return;
    }

    setAddingToCart(true);

    // Add to cart
    addToCart({
      ...product,
      selectedSize,
      quantity,
    });

    // Show success message
    showToast(`${product.name} added to cart!`, "success");

    // Wait a moment then open cart
    setTimeout(() => {
      openCart();
      setAddingToCart(false);
    }, 500);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container flex items-center justify-center px-4 py-20 mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
            <p className="text-light">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 py-20 mx-auto text-center">
          <h2 className="mb-4 text-2xl font-bold text-light">
            Product not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 transition-all rounded-lg bg-primary text-background hover:shadow-neon-green"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const productImages = product.images || [product.image];
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 mx-auto mt-20 lg:py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 transition-colors text-light hover:text-primary"
        >
          <ChevronLeft size={20} />
          Back to Products
        </motion.button>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative overflow-hidden border aspect-square rounded-2xl border-primary/10 bg-surface/50 view-bg">
              {discount && (
                <div className="absolute z-10 px-4 py-2 font-medium text-white bg-red-500 rounded-full shadow-lg top-4 right-4 shadow-red-500/20">
                  Save {discount}%
                </div>
              )}
              <ImageWithLoader
                src={
                  productImages[selectedImage] ||
                  "/images/placeholders/swordshirt.jpg"
                }
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary shadow-neon-green"
                        : "border-primary/10 hover:border-primary/30"
                    }`}
                  >
                    <ImageWithLoader
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="ml-2 text-sm text-light/60">(4.0)</span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold lg:text-4xl text-light">
              {product.name}
            </h1>

            {/* Description */}
            <p className="leading-relaxed text-light/80">
              {product.description ||
                "Premium quality sword-themed apparel made with the finest materials."}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl line-through text-light/40">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-light">
                  Select Size
                </label>
                <button
                  onClick={() => navigate("/size-guide")}
                  className="text-sm transition-colors text-primary hover:underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center font-semibold transition-all ${
                      selectedSize === size
                        ? "bg-primary text-background shadow-neon-green scale-105"
                        : "bg-surface/50 border border-primary/20 text-light hover:border-primary hover:bg-surface"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-light">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 p-1 border rounded-lg border-primary/20 bg-surface/50">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 transition-colors rounded hover:bg-primary/20 text-light"
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 font-semibold text-center text-light">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 transition-colors rounded hover:bg-primary/20 text-light"
                    disabled={quantity >= (product.stock || 10)}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-sm text-light/60">
                  {product.stock || 10} items available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={addingToCart || !selectedSize}
                className="flex items-center justify-center flex-1 gap-2 px-8 py-4 text-lg font-semibold transition-all rounded-xl bg-primary text-background hover:shadow-neon-green disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <>
                    <div className="w-5 h-5 border-2 rounded-full border-background border-t-transparent animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={22} />
                    Add to Cart
                  </>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 transition-all rounded-xl border ${
                  isWishlisted
                    ? "bg-red-500 border-red-500 text-white"
                    : "bg-surface/50 border-primary/20 text-light hover:border-primary"
                }`}
              >
                <Heart
                  size={22}
                  className={isWishlisted ? "fill-current" : ""}
                />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-4 transition-all border rounded-xl bg-surface/50 border-primary/20 text-light hover:border-primary"
              >
                <Share2 size={22} />
              </motion.button>
            </div>

            {/* Features */}
            <div className="p-6 space-y-4 border rounded-xl border-primary/10 bg-surface/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Truck className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium text-light">Free Shipping</p>
                  <p className="text-sm text-light/60">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium text-light">Secure Payment</p>
                  <p className="text-sm text-light/60">
                    100% secure transactions
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <RefreshCw className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium text-light">Easy Returns</p>
                  <p className="text-sm text-light/60">30-day return policy</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 space-y-3 border rounded-xl border-primary/10 bg-surface/30">
              <h3 className="text-lg font-semibold text-light">
                Product Details
              </h3>
              <div className="space-y-2 text-sm text-light/80">
                <p>
                  <strong>Material:</strong>{" "}
                  {product.material || "Premium Cotton"}
                </p>
                <p>
                  <strong>Fit:</strong> {product.fit || "Regular Fit"}
                </p>
                <p>
                  <strong>Care:</strong> Machine washable, tumble dry low
                </p>
                <p>
                  <strong>SKU:</strong> {product.id || "N/A"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
