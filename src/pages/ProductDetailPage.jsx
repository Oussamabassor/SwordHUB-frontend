import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  Eye,
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
  const location = useLocation();
  const { addToCart, openCart } = useOrders();
  const showToast = useToast();

  // Track if user navigated from within our app
  const hasNavigationState = useRef(!!location.state?.from);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Keep loading state to prevent "not found" flash
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isGallerySticky, setIsGallerySticky] = useState(true);

  // Get available sizes from product data
  const availableSizes =
    product?.sizes && product.sizes.length > 0 ? product.sizes : [];

  // All possible sizes
  const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  // Determine which sizes to show based on available sizes
  const displaySizes = availableSizes.length > 0 ? allSizes : allSizes;

  // Get all images from product.images array (first image is the main image)
  const allImages = React.useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) {
      return product.images; // Use all images from the images array
    }
    // Fallback to single image if no images array
    return product.image ? [product.image] : [];
  }, [product]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Intersection Observer to stop sticky gallery when suggestions section comes into view
  useEffect(() => {
    const suggestedSection = document.getElementById("suggested-products");

    if (!suggestedSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When suggestions section is in view, disable sticky
        setIsGallerySticky(!entry.isIntersecting);
      },
      {
        rootMargin: "-100px 0px 0px 0px", // Trigger slightly before reaching section
        threshold: 0,
      }
    );

    observer.observe(suggestedSection);

    return () => {
      observer.disconnect();
    };
  }, [suggestedProducts]); // Re-run when suggestions load

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsApi.getById(id);
      const productData = response?.data || response;
      setProduct(productData);

      // Fetch suggested products after getting the main product
      fetchSuggestedProducts(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
      showToast("Failed to load product", "error");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestedProducts = async (currentProduct) => {
    try {
      // Fetch all products and filter by category on client side
      const response = await productsApi.getAll();

      const allProducts =
        response?.data?.products || response?.products || response || [];
      console.log("All products fetched:", allProducts.length);

      // Filter products by same category and exclude current product
      const similar = allProducts
        .filter((p) => {
          // Filter by category and exclude current product
          const matchesCategory = p.category === currentProduct.category;
          const notCurrentProduct = String(p.id) !== String(currentProduct.id);
          return matchesCategory && notCurrentProduct;
        })
        .slice(0, 4); // Get first 4 matching products

      console.log("Suggested products found:", similar.length, similar);
      setSuggestedProducts(similar);
    } catch (error) {
      console.error("Error fetching suggested products:", error);
      setSuggestedProducts([]); // Set to empty array on error
    }
  };

  const handleAddToCart = async () => {
    // Check if product is out of stock
    if (product.stock === 0) {
      showToast("This product is out of stock", "error");
      return;
    }

    if (!selectedSize) {
      showToast("Please select a size", "error");
      return;
    }

    // Check if quantity exceeds available stock
    if (quantity > product.stock) {
      showToast(`Only ${product.stock} items available`, "error");
      return;
    }

    setAddingToCart(true);

    // Add to cart with animation
    addToCart({
      ...product,
      selectedSize,
      quantity,
    });

    // Show success message with better feedback
    showToast(
      `✓ ${product.name} (Size: ${selectedSize}) added to cart!`,
      "success",
      3000
    );

    // Smooth animation: brief delay then open cart
    setTimeout(() => {
      openCart();
    }, 300);

    // Reset adding state
    setTimeout(() => {
      setAddingToCart(false);
    }, 800);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleBackNavigation = () => {
    // Check if we have navigation state from React Router
    // This indicates user navigated from within the app
    const hasInternalNavigation = !!location.state?.from;

    if (hasInternalNavigation) {
      // User navigated here from another page in the app
      navigate(-1);
    } else {
      // User came directly (refresh, bookmark, external link, or direct URL)
      // Navigate to home page and scroll to products section
      navigate("/", { replace: true });

      // Wait for NavigationLoader (1200ms) + extra time for render
      setTimeout(() => {
        const productsSection = document.getElementById("products-section");
        if (productsSection) {
          // Use custom smooth scroll animation (same as Hero's "Browse T-Shirts" button)
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
      }, 1400); // 1200ms loading + 200ms buffer
    }
  };

  // Show "not found" only if we're done loading AND product is null
  if (!loading && !product) {
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

  // If still loading, show nothing (NavigationLoader handles the loading animation)
  if (loading || !product) {
    return null;
  }

  // Build array of all product images (main image + additional images)
  const productImages = (() => {
    const images = [];
    if (product.image) images.push(product.image);
    if (
      product.images &&
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      images.push(...product.images);
    }
    return images.length > 0 ? images : ["/images/placeholders/swordshirt.jpg"];
  })();

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 pt-24 pb-8 mx-auto overflow-hidden lg:pt-28 lg:pb-12 sm:px-6 lg:px-8 max-w-7xl product-detail-container">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBackNavigation}
          className="flex items-center gap-2 mb-6 transition-colors text-light hover:text-primary"
        >
          <ChevronLeft size={20} />
          Back to Products
        </motion.button>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Images Gallery Section - Sticky on large screens */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3 sm:space-y-4 lg:sticky lg:top-24 lg:self-start"
            style={{ maxHeight: "calc(100vh - 7rem)" }}
          >
            {/* Main Image Viewer - Optimized sizes for better viewport fit */}
            <div className="relative overflow-hidden border rounded-2xl border-primary/10 bg-surface/50 aspect-square md:aspect-[4/3] lg:aspect-[3/2]">
              {/* OUT OF STOCK Badge Overlay */}
              {product.stock === 0 && (
                <div className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden pointer-events-none">
                  <div
                    className="px-6 py-3 sm:px-8 sm:py-4 text-center font-black text-base sm:text-lg md:text-xl tracking-[0.2em] uppercase whitespace-nowrap"
                    style={{
                      transform: "rotate(-45deg)",
                      background: "transparent",
                      border: "4px solid #ef4444",
                      borderRadius: "8px",
                      color: "#ef4444",
                      textShadow:
                        "0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.6)",
                      boxShadow: "0 0 30px rgba(239, 68, 68, 0.4)",
                      backdropFilter: "blur(4px)",
                      minWidth: "200px",
                    }}
                  >
                    OUT OF STOCK
                  </div>
                </div>
              )}

              {discount && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="absolute z-10 px-4 py-2 font-medium text-white bg-red-500 rounded-full shadow-lg top-4 right-4 shadow-red-500/20"
                >
                  Save {discount}%
                </motion.div>
              )}

              <div className="relative w-full h-full">
                <ImageWithLoader
                  src={
                    allImages[selectedImage] ||
                    "/images/placeholders/swordshirt.jpg"
                  }
                  alt={product.name}
                  className={`object-cover w-full h-full ${
                    product.stock === 0 ? "blur-[3px] brightness-[0.65]" : ""
                  }`}
                />
              </div>
            </div>

            {/* Image Navigation Section */}
            {allImages.length > 1 && (
              <div className="space-y-2">
                {/* Counter */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold text-light/60">
                    📸 {allImages.length}{" "}
                    {allImages.length === 1 ? "Image" : "Images"}
                  </span>
                  <span className="text-xs text-light/40">
                    {selectedImage + 1} / {allImages.length}
                  </span>
                </div>

                {/* Desktop/Tablet: Grid layout with all images visible */}
                <div className="hidden sm:block">
                  <div className="relative">
                    {/* Thumbnails Grid - All visible, no scrolling */}
                    <div className="grid grid-cols-5 gap-2 md:gap-3">
                      {allImages.map((img, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImage === index
                              ? "border-primary ring-2 ring-primary/30 shadow-lg shadow-primary/20"
                              : "border-primary/20 hover:border-primary/50"
                          }`}
                        >
                          <ImageWithLoader
                            src={img}
                            alt={`View ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                          {selectedImage === index && (
                            <div className="absolute inset-0 bg-primary/20" />
                          )}
                          <div className="absolute bottom-0 right-0 px-1.5 py-0.5 text-xs font-bold bg-black/70 text-white rounded-tl">
                            {index + 1}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile: Grid Layout - 5 images per row, 2 rows max (10 images), no scrolling */}
                <div className="sm:hidden">
                  <div className="grid grid-cols-5 gap-2 pb-2 auto-rows-auto">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? "border-primary ring-2 ring-primary/30 shadow-lg shadow-primary/20"
                            : "border-primary/20"
                        }`}
                      >
                        <ImageWithLoader
                          src={img}
                          alt={`View ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                        {selectedImage === index && (
                          <div className="absolute inset-0 bg-primary/20" />
                        )}
                        <div className="absolute bottom-0 right-0 px-1 py-0.5 text-[10px] font-bold bg-black/70 text-white rounded-tl">
                          {index + 1}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Product Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Category & Rating */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  {product.category}
                </span>
                {/* Stock Status Badge */}
                {product.stock === 0 ? (
                  <span className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-full animate-pulse">
                    OUT OF STOCK
                  </span>
                ) : product.stock < 10 ? (
                  <span className="px-3 py-1 text-sm font-semibold text-white bg-orange-500 rounded-full animate-pulse">
                    Only {product.stock} left!
                  </span>
                ) : null}
              </div>
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

            {/* Product Name - Professional & Modern */}
            <h1 className="text-3xl font-extrabold leading-tight tracking-wide uppercase break-words transition-all duration-300 sm:text-4xl lg:text-5xl text-light hover:text-primary hover:tracking-wider drop-shadow-sm">
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
                {product.price} DH
              </span>
              {product.originalPrice && (
                <span className="text-xl line-through text-light/40">
                  {product.originalPrice} DH
                </span>
              )}
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-light">
                  Select Size{" "}
                  {availableSizes.length > 0 && (
                    <span className="text-xs text-light/60">
                      (Available sizes)
                    </span>
                  )}
                </label>
                <button
                  onClick={() => navigate("/size-guide")}
                  className="text-sm transition-colors text-primary hover:underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {displaySizes.map((size, index) => {
                  const isAvailable =
                    availableSizes.length === 0 ||
                    availableSizes.includes(size);
                  return (
                    <motion.button
                      key={size}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={isAvailable ? { scale: 1.1 } : {}}
                      whileTap={isAvailable ? { scale: 0.95 } : {}}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      disabled={!isAvailable}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-semibold transition-all relative ${
                        !isAvailable
                          ? "bg-surface/20 border border-primary/10 text-light/30 cursor-not-allowed"
                          : selectedSize === size
                          ? "bg-primary text-background shadow-neon-green scale-105"
                          : "bg-surface/50 border border-primary/20 text-light hover:border-primary hover:bg-surface"
                      }`}
                    >
                      {size}
                      {!isAvailable && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-0.5 bg-red-500 transform rotate-45"></div>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              {availableSizes.length > 0 && (
                <p className="text-xs text-light/50">
                  Only showing available sizes for this product
                </p>
              )}
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
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleAddToCart}
                disabled={addingToCart || !selectedSize || product.stock === 0}
                className={`flex items-center justify-center flex-1 min-w-[200px] gap-2 px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all rounded-xl ${
                  product.stock === 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : addingToCart
                    ? "bg-green-500 animate-pulse"
                    : "bg-primary hover:shadow-neon-green"
                } text-background disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden`}
              >
                {product.stock === 0 ? (
                  <>
                    <ShoppingCart size={22} />
                    Out of Stock
                  </>
                ) : addingToCart ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 rounded-full border-background border-t-transparent"
                    ></motion.div>
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Adding to Cart...
                    </motion.span>
                  </>
                ) : (
                  <>
                    <motion.div
                      whileHover={{ x: [0, -3, 3, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <ShoppingCart size={22} />
                    </motion.div>
                    Add to Cart
                  </>
                )}
              </motion.button>

              {/* <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-3 sm:p-4 transition-all rounded-xl border ${
                  isWishlisted
                    ? "bg-red-500 border-red-500 text-white"
                    : "bg-surface/50 border-primary/20 text-light hover:border-primary"
                }`}
              >
                <Heart
                  size={22}
                  className={isWishlisted ? "fill-current" : ""}
                />
              </motion.button> */}

              {/* <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-3 transition-all border sm:p-4 rounded-xl bg-surface/50 border-primary/20 text-light hover:border-primary"
              >
                <Share2 size={22} />
              </motion.button> */}
            </div>

            {/* Features */}
            <div className="p-4 space-y-3 border sm:p-6 sm:space-y-4 rounded-xl border-primary/10 bg-surface/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Truck className="text-primary" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-light">Free Shipping</p>
                  <p className="text-sm text-light/60">On orders over 500 DH</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="text-primary" size={20} />
                </div>
                <div className="flex-1 min-w-0">
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
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-light">Easy Returns</p>
                  <p className="text-sm text-light/60">30-day return policy</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-3 border sm:p-6 rounded-xl border-primary/10 bg-surface/30">
              <h3 className="text-lg font-semibold text-light">
                Product Details
              </h3>
              <div className="space-y-2 text-sm break-words text-light/80">
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
                <p className="break-all">
                  <strong>SKU:</strong> {product.id || "N/A"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Suggested Products Section - Modern & Amazing Design */}
        {suggestedProducts && suggestedProducts.length > 0 && (
          <motion.section
            id="suggested-products"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative z-10 mt-20 lg:mt-32"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 opacity-20 blur-3xl bg-primary/30 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 opacity-20 blur-3xl bg-secondary/30 -z-10"></div>

            {/* Section Header - Enhanced Design */}
            <div className="mb-12 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-primary/10 border-primary/20"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-sm font-semibold tracking-wider uppercase text-primary">
                  Recommended For You
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl text-light"
              >
                You Might Also{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary">
                  Love
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="max-w-2xl mx-auto text-base text-light/70 md:text-lg"
              >
                Handpicked products from the same collection, designed to match
                your style
              </motion.p>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
              ></motion.div>
            </div>

            {/* Products Grid - Larger Responsive Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-5 lg:grid-cols-6 lg:gap-6">
              {suggestedProducts.map((suggestedProduct, index) => (
                <motion.div
                  key={suggestedProduct.id}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.8 + index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    transition: { duration: 0.15 },
                  }}
                  onClick={() => {
                    navigate(`/products/${suggestedProduct.id}`, {
                      state: { from: "product-detail" },
                    });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="relative overflow-hidden transition-all duration-200 border cursor-pointer rounded-xl group lg:rounded-2xl bg-surface/40 backdrop-blur-md border-primary/10 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/30"
                >
                  {/* Animated gradient border effect */}
                  <div className="absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-lg lg:rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl"></div>
                  </div>

                  {/* Glow Effect - Enhanced */}
                  <div className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100 blur-xl bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/30 -z-10" />

                  {/* Image Container - Larger */}
                  <div className="relative overflow-hidden aspect-[3/4] bg-surface/20">
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 transition-transform duration-500 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    <ImageWithLoader
                      src={
                        (suggestedProduct.images &&
                          suggestedProduct.images[0]) ||
                        suggestedProduct.image ||
                        "/images/placeholders/swordshirt.jpg"
                      }
                      alt={suggestedProduct.name}
                      className="object-cover w-full h-full"
                    />

                    {/* Gradient overlay only on hover */}
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-background/60 via-background/10 to-transparent"></div>

                    {/* Discount badge if applicable */}
                    {suggestedProduct.originalPrice && (
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        className="absolute px-2 py-1 lg:px-3 lg:py-1.5 text-xs lg:text-sm font-bold text-white bg-red-500 rounded-lg top-2 right-2 lg:top-3 lg:right-3 backdrop-blur-md shadow-lg"
                      >
                        SALE
                      </motion.div>
                    )}
                  </div>

                  {/* Product Info - Improved Layout with Better Distribution */}
                  <div className="relative p-3.5 space-y-2.5 lg:p-5 lg:space-y-3 bg-gradient-to-b from-surface/50 to-surface/30">
                    {/* Product Name - Larger, More Prominent */}
                    <h3 className="text-base font-extrabold leading-tight tracking-wide text-left uppercase transition-all duration-300 sm:text-lg lg:text-xl xl:text-2xl line-clamp-2 text-light group-hover:text-primary group-hover:tracking-wider min-h-[3rem] sm:min-h-[3.5rem] lg:min-h-[4rem] drop-shadow-sm">
                      {suggestedProduct.name}
                    </h3>

                    {/* Rating - Better Spacing */}
                    <div className="flex items-center gap-1.5 lg:gap-2 py-0.5">
                      <div className="flex items-center gap-0.5 lg:gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 transition-all ${
                              i < 4
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold sm:text-sm lg:text-base text-light/70">
                        4.0
                      </span>
                    </div>

                    {/* Price - Larger & More Prominent */}
                    <div className="flex flex-col gap-1.5 pt-1.5 lg:pt-2">
                      <div className="flex items-baseline gap-2 lg:gap-2.5">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="text-xl font-bold sm:text-2xl lg:text-3xl xl:text-4xl text-primary"
                        >
                          {suggestedProduct.price}
                        </motion.span>
                        <span className="text-sm font-semibold sm:text-base lg:text-lg text-primary">
                          DH
                        </span>
                      </div>

                      {/* Original price and savings */}
                      {suggestedProduct.originalPrice && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs line-through lg:text-sm text-light/40">
                            {suggestedProduct.originalPrice} DH
                          </span>
                          <span className="text-xs font-medium text-green-500 lg:text-sm">
                            -
                            {Math.round(
                              ((suggestedProduct.originalPrice -
                                suggestedProduct.price) /
                                suggestedProduct.originalPrice) *
                                100
                            )}
                            %
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA - Browse more */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-16 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    const productsSection =
                      document.getElementById("products-section");
                    if (productsSection) {
                      // Use custom smooth scroll animation (same as Hero's "Browse T-Shirts" button)
                      const targetPosition =
                        productsSection.getBoundingClientRect().top +
                        window.pageYOffset;
                      const startPosition = window.pageYOffset;
                      const distance = targetPosition - startPosition;
                      const duration = 1500; // 1.5 seconds for smooth, slow scroll
                      let start = null;

                      // Easing function for smooth animation
                      const easeInOutCubic = (t) => {
                        return t < 0.5
                          ? 4 * t * t * t
                          : 1 - Math.pow(-2 * t + 2, 3) / 2;
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
                  }, 100);
                }}
                className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold transition-all border rounded-xl bg-gradient-to-r from-primary to-secondary text-background hover:shadow-xl hover:shadow-primary/40 border-primary/20"
              >
                <span>Explore All Products</span>
                <ChevronLeft size={20} className="rotate-180" />
              </motion.button>
            </motion.div>
          </motion.section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetailPage;
