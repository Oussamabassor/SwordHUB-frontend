import axios from "axios";

// Get API URL from environment variables (without /api suffix as backend handles it)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("authToken") || localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("authToken");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("user");
      // Only redirect if not already on login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ==================== PRODUCTS API ====================
export const productsApi = {
  // Get all products with optional filters
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.search) params.append("search", filters.search);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

      const response = await apiClient.get(`/products?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Get single product by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  // Create new product (Admin only)
  create: async (productData) => {
    try {
      const response = await apiClient.post("/products", productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  // Update product (Admin only)
  update: async (id, productData) => {
    try {
      const response = await apiClient.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  // Delete product (Admin only)
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },

  // Upload product image
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await apiClient.post("/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },
};

// ==================== CATEGORIES API ====================
export const categoriesApi = {
  // Get all categories
  getAll: async () => {
    try {
      const response = await apiClient.get("/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Get single category by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error;
    }
  },

  // Create new category (Admin only)
  create: async (categoryData) => {
    try {
      const response = await apiClient.post("/categories", categoryData);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  // Update category (Admin only)
  update: async (id, categoryData) => {
    try {
      const response = await apiClient.put(`/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  // Delete category (Admin only)
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },
};

// ==================== ORDERS API ====================
export const ordersApi = {
  // Get all orders for current user or all orders for admin
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);
      if (filters.page) params.append("page", filters.page);
      if (filters.limit) params.append("limit", filters.limit);

      // Backend handles admin check via middleware - just call /orders
      const response = await apiClient.get(`/orders?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Get single order by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },

  // Create new order (Customer)
  create: async (orderData) => {
    try {
      const response = await apiClient.post("/orders", orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Update order status (Admin only)
  updateStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(`/orders/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },

  // Delete order (Admin only)
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },

  // Get order statistics (Admin only)
  getStats: async () => {
    try {
      const response = await apiClient.get("/orders/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching order stats:", error);
      throw error;
    }
  },
};

// ==================== AUTH API ====================
export const authApi = {
  // Login (User or Admin)
  login: async (credentials) => {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      if (response.data.success && response.data.token) {
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        // For admin compatibility
        if (user.role === "admin") {
          localStorage.setItem("adminToken", token);
          localStorage.setItem("adminUser", JSON.stringify(user));
        }
      }
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await apiClient.post("/auth/register", userData);
      if (response.data.success && response.data.token) {
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return response.data;
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await apiClient.post("/auth/logout");
      localStorage.removeItem("authToken");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("user");
      localStorage.removeItem("adminUser");
    } catch (error) {
      console.error("Error logging out:", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("user");
      localStorage.removeItem("adminUser");
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get("/auth/me");
      return response.data;
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await apiClient.get("/auth/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put("/auth/profile", profileData);
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },

  // Get stored user
  getStoredUser: () => {
    const user =
      localStorage.getItem("user") || localStorage.getItem("adminUser");
    return user ? JSON.parse(user) : null;
  },

  // Check if user is admin
  isAdmin: () => {
    const user = authApi.getStoredUser();
    return user && user.role === "admin";
  },
};

// ==================== DASHBOARD/STATS API ====================
export const dashboardApi = {
  // Get dashboard statistics (Admin only)
  getStats: async () => {
    try {
      const response = await apiClient.get("/dashboard/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  },

  // Get sales analytics
  getSalesAnalytics: async (period = "week") => {
    try {
      const response = await apiClient.get(
        `/dashboard/analytics?period=${period}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching sales analytics:", error);
      throw error;
    }
  },
};

// Export axios instance for custom requests
export default apiClient;
