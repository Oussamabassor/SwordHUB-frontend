import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import { OrderProvider } from "./contexts/OrderContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./components/ToastProvider";
import { CartSidebar } from "./components/CartSidebar";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { NavigationLoader } from "./components/NavigationLoader";

// Customer Pages
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { Collection } from "./pages/Collection";
import { SizeGuide } from "./pages/SizeGuide";
import { CheckoutPage } from "./pages/CheckoutPage";

// Admin Pages
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminAnalytics } from "./pages/admin/AdminAnalytics";
import { ProductsManagement } from "./pages/admin/ProductsManagement";
import { OrdersManagement } from "./pages/admin/OrdersManagement";
import { CategoriesManagement } from "./pages/admin/CategoriesManagement";

import "./index.css";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <OrderProvider>
            <ToastProvider>
              <CartSidebar />
              <NavigationLoader>
                <Routes>
                  {/* Customer Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route
                    path="/collection/:category"
                    element={<Collection />}
                  />
                  <Route path="/size-guide" element={<SizeGuide />} />
                  <Route path="/checkout" element={<CheckoutPage />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/analytics"
                    element={
                      <ProtectedRoute>
                        <AdminAnalytics />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/products"
                    element={
                      <ProtectedRoute>
                        <ProductsManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <ProtectedRoute>
                        <OrdersManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/categories"
                    element={
                      <ProtectedRoute>
                        <CategoriesManagement />
                      </ProtectedRoute>
                    }
                  />

                  {/* Fallback Route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </NavigationLoader>
            </ToastProvider>
          </OrderProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
