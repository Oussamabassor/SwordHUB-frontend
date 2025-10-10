import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  User,
  Phone,
  MapPin,
  ArrowLeft,
  Check,
  Loader,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ImageWithLoader } from "../components/ImageWithLoader";
import { useOrders } from "../contexts/OrderContext";
import { ordersApi } from "../services/apiService";
import { useToast } from "../components/ToastProvider";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart, getTotalPrice } = useOrders();
  const showToast = useToast();

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.customerPhone)) {
      newErrors.customerPhone = "Please enter a valid phone number";
    }

    if (!formData.customerAddress.trim()) {
      newErrors.customerAddress = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    if (cart.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }

    setLoading(true);

    try {
      // Log cart items to debug
      console.log("Cart items before mapping:", cart);
      cart.forEach((item, index) => {
        console.log(`Cart item ${index}:`, {
          id: item.id,
          name: item.name,
          hasId: "id" in item,
          keys: Object.keys(item),
        });
      });

      // Prepare order data
      const orderData = {
        customerName: formData.customerName,
        customerEmail: "customer@example.com", // You can add email field if needed
        customerPhone: formData.customerPhone,
        customerAddress: formData.customerAddress,
        items: cart.map((item) => ({
          productId: item.id,
          productName: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.selectedSize,
        })),
        total: getTotalPrice(),
        status: "pending",
      };

      console.log("Order data being sent:", orderData);
      console.log("Mapped items:", orderData.items);

      // Create order
      await ordersApi.create(orderData);

      // Success
      setOrderPlaced(true);
      showToast("Order placed successfully!", "success");
      clearCart();

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error placing order:", error);
      showToast(
        error.response?.data?.message ||
          "Failed to place order. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container flex items-center justify-center px-4 py-20 mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md p-8 text-center border rounded-2xl bg-surface/50 border-primary/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20"
            >
              <Check className="w-10 h-10 text-primary" />
            </motion.div>
            <h2 className="mb-3 text-2xl font-bold text-light">
              Order Placed Successfully!
            </h2>
            <p className="mb-6 text-light/70">
              Thank you for your order. We'll call you shortly to confirm the
              details.
            </p>
            <div className="p-4 mb-6 border rounded-lg bg-surface/30 border-primary/10">
              <p className="text-sm text-light/60">Order Total</p>
              <p className="text-3xl font-bold text-primary">
                {getTotalPrice().toFixed(2)} DH
              </p>
            </div>
            <p className="text-sm text-light/60">Redirecting to homepage...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 py-20 mx-auto mt-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-surface/50">
            <ShoppingBag className="w-10 h-10 text-light/40" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-light">
            Your cart is empty
          </h2>
          <p className="mb-6 text-light/70">
            Add some products to your cart to continue
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 transition-all rounded-lg bg-primary text-background hover:shadow-neon-green"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 mx-auto mt-20 lg:py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 transition-colors text-light hover:text-primary"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="p-6 border rounded-2xl bg-surface/30 border-primary/10 md:p-8">
              <h1 className="mb-6 text-2xl font-bold md:text-3xl text-light">
                Checkout
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div>
                  <h2 className="mb-4 text-lg font-semibold text-light">
                    Contact Information
                  </h2>

                  {/* Name */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-light">
                      <User className="inline w-4 h-4 mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-lg bg-background border ${
                        errors.customerName
                          ? "border-red-500"
                          : "border-primary/20"
                      } text-light placeholder-light/40 focus:outline-none focus:border-primary transition-colors`}
                    />
                    {errors.customerName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.customerName}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-light">
                      <Phone className="inline w-4 h-4 mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      placeholder="+1 234 567 8900"
                      className={`w-full px-4 py-3 rounded-lg bg-background border ${
                        errors.customerPhone
                          ? "border-red-500"
                          : "border-primary/20"
                      } text-light placeholder-light/40 focus:outline-none focus:border-primary transition-colors`}
                    />
                    {errors.customerPhone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.customerPhone}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-light">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Delivery Address *
                    </label>
                    <textarea
                      name="customerAddress"
                      value={formData.customerAddress}
                      onChange={handleChange}
                      placeholder="Enter your full address"
                      rows="3"
                      className={`w-full px-4 py-3 rounded-lg bg-background border ${
                        errors.customerAddress
                          ? "border-red-500"
                          : "border-primary/20"
                      } text-light placeholder-light/40 focus:outline-none focus:border-primary transition-colors resize-none`}
                    />
                    {errors.customerAddress && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.customerAddress}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center w-full gap-2 px-6 py-4 text-lg font-semibold transition-all rounded-xl bg-primary text-background hover:shadow-neon-green disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      Place Order
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-light/60">
                  By placing an order, you agree to receive a confirmation call
                  from our team.
                </p>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky p-6 border top-24 rounded-2xl bg-surface/30 border-primary/10">
              <h2 className="mb-4 text-lg font-semibold text-light">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="mb-4 space-y-3 overflow-y-auto max-h-60">
                {cart.map((item) => (
                  <div key={item.cartId} className="flex gap-3">
                    <div className="flex-shrink-0 w-16 h-16 overflow-hidden border rounded-lg border-primary/10 view-bg">
                      <ImageWithLoader
                        src={
                          item.image || "/images/placeholders/swordshirt.jpg"
                        }
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate text-light">
                        {item.name}
                      </h4>
                      <p className="text-xs text-light/60">
                        Size: {item.selectedSize} × {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {(item.price * item.quantity).toFixed(2)} DH
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 space-y-2 border-t border-primary/10">
                <div className="flex justify-between text-sm text-light/70">
                  <span>Subtotal</span>
                  <span>{getTotalPrice().toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between text-sm text-light/70">
                  <span>Shipping</span>
                  <span className="text-primary">Free</span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-bold border-t border-primary/10 text-light">
                  <span>Total</span>
                  <span className="text-primary">
                    {getTotalPrice().toFixed(2)} DH
                  </span>
                </div>
              </div>

              {/* Security Note */}
              <div className="p-3 mt-4 border rounded-lg bg-primary/5 border-primary/20">
                <p className="text-xs text-center text-light/70">
                  🔒 We'll call you to confirm your order and arrange delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
