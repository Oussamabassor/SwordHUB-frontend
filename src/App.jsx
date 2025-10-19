import React, { Suspense, lazy } from "react";
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
import { LoadingScreen } from "./components/LoadingScreen";

// Eager load HomePage for instant first render
import { HomePage } from "./pages/HomePage";

// Lazy load customer pages (code splitting for better initial load)
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const Collection = lazy(() => import("./pages/Collection"));
const SizeGuide = lazy(() => import("./pages/SizeGuide"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));

// Lazy load all admin pages (users rarely visit admin, no need to bundle initially)
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const ProductsManagement = lazy(() => import("./pages/admin/ProductsManagement"));
const OrdersManagement = lazy(() => import("./pages/admin/OrdersManagement"));
const CategoriesManagement = lazy(() => import("./pages/admin/CategoriesManagement"));

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
                <Suspense fallback={<LoadingScreen />}>
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
                </Suspense>
              </NavigationLoader>
            </ToastProvider>
          </OrderProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
