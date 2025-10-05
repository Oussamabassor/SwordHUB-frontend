const API_URL = "http://localhost/ecommerce-app/backend/api";

export const productsApi = {
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/products/read.php`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await fetch(`${API_URL}/products/create.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  // Add other CRUD operations...
};

export const authApi = {
  login: async (credentials) => {
    // Implement admin login
  },
  // Add other auth methods...
};
