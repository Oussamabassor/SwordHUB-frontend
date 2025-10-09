# Frontend-Backend Integration Guide

## ✅ Integration Complete!

Your SwordHub frontend is now properly configured to fetch data from the MongoDB Atlas backend.

---

## 🔗 API Configuration

### Backend
- **URL**: `http://localhost:5000`
- **Database**: MongoDB Atlas (`swordhub`)
- **Status**: ✅ Connected and Running

### Frontend
- **API Service**: `src/services/apiService.js`
- **Base URL**: `http://localhost:5000` (configured in `.env`)
- **Authentication**: JWT Bearer tokens

---

## 📊 Available API Endpoints

### For All Users (Public)
```javascript
// Get all products
productsApi.getAll({ category, search, minPrice, maxPrice })

// Get single product
productsApi.getById(productId)

// Get all categories
categoriesApi.getAll()

// Get single category
categoriesApi.getById(categoryId)
```

### For Authenticated Users
```javascript
// Login
authApi.login({ email, password })

// Register
authApi.register({ name, email, password, phone, address })

// Get profile
authApi.getProfile()

// Update profile
authApi.updateProfile({ name, phone, address })

// Create order
ordersApi.create({ items, shippingAddress, paymentMethod })

// Get user orders
ordersApi.getAll()

// Get single order
ordersApi.getById(orderId)

// Logout
authApi.logout()
```

### For Admin Users Only
```javascript
// Products Management
productsApi.create({ name, description, price, category, stock, images })
productsApi.update(productId, { name, price, stock })
productsApi.delete(productId)
productsApi.uploadImage(file)

// Categories Management
categoriesApi.create({ name, description })
categoriesApi.update(categoryId, { name, description })
categoriesApi.delete(categoryId)

// Orders Management
ordersApi.getAll({ status, startDate, endDate }) // Get all orders
ordersApi.updateStatus(orderId, status)
ordersApi.delete(orderId)

// Dashboard Statistics
dashboardApi.getStats()
dashboardApi.getSalesAnalytics(period)
```

---

## 🎯 Usage Examples

### 1. Fetch Products in Your Component

```javascript
import { productsApi } from '../services/apiService';
import { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await productsApi.getAll();
        if (response.success) {
          setProducts(response.data.products || response.data);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### 2. Admin Login

```javascript
import { authApi } from '../services/apiService';

async function handleLogin(email, password) {
  try {
    const response = await authApi.login({ email, password });
    
    if (response.success) {
      const user = response.data.user;
      
      // Check if admin
      if (user.role === 'admin') {
        // Redirect to admin dashboard
        window.location.href = '/admin/dashboard';
      } else {
        // Redirect to user dashboard
        window.location.href = '/dashboard';
      }
    }
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed. Please check your credentials.');
  }
}

// Usage
handleLogin('admin@swordhub.com', 'Admin123!');
```

### 3. Admin Dashboard - Fetch Stats

```javascript
import { dashboardApi } from '../services/apiService';
import { useState, useEffect } from 'react';

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await dashboardApi.getStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    }

    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <div>Total Revenue: ${stats.overview?.totalRevenue}</div>
      <div>Total Orders: {stats.overview?.totalOrders}</div>
      <div>Total Products: {stats.overview?.totalProducts}</div>
      <div>Total Users: {stats.overview?.totalUsers}</div>
    </div>
  );
}
```

### 4. Admin - Create Product

```javascript
import { productsApi, categoriesApi } from '../services/apiService';

async function handleCreateProduct(productData) {
  try {
    const response = await productsApi.create({
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price),
      category: productData.categoryId,
      stock: parseInt(productData.stock),
      images: productData.images
    });

    if (response.success) {
      alert('Product created successfully!');
      return response.data;
    }
  } catch (error) {
    console.error('Error creating product:', error);
    alert('Failed to create product: ' + error.message);
  }
}
```

### 5. Admin - Update Order Status

```javascript
import { ordersApi } from '../services/apiService';

async function updateOrderStatus(orderId, newStatus) {
  try {
    const response = await ordersApi.updateStatus(orderId, newStatus);
    
    if (response.success) {
      alert('Order status updated successfully!');
      return response.data;
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    alert('Failed to update order status');
  }
}

// Usage
// Valid statuses: 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
updateOrderStatus('67123456789abcdef', 'processing');
```

### 6. Filter Products

```javascript
import { productsApi } from '../services/apiService';

async function searchProducts(searchTerm, categoryId, priceRange) {
  try {
    const response = await productsApi.getAll({
      search: searchTerm,
      category: categoryId,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      page: 1,
      limit: 20
    });

    if (response.success) {
      return response.data.products;
    }
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

// Usage
const products = await searchProducts('sword', '67123...', { min: 50, max: 200 });
```

---

## 🔐 Authentication Flow

### Login Process
1. User enters credentials
2. Frontend calls `authApi.login({ email, password })`
3. Backend validates and returns token + user data
4. Token is automatically saved to `localStorage`
5. Token is automatically included in all subsequent API calls
6. User role is checked (admin/user)

### Protected Routes
```javascript
import { authApi } from '../services/apiService';

// Check if user is authenticated
if (!authApi.isAuthenticated()) {
  // Redirect to login
  window.location.href = '/login';
}

// Check if user is admin
if (authApi.isAdmin()) {
  // Show admin features
} else {
  // Show user features
}
```

---

## 🧪 Testing the Integration

### Step 1: Start Backend
```powershell
cd C:\xampp\htdocs\SwordHUB\SwordHub-backend
php -S localhost:5000 index.php
```

### Step 2: Start Frontend
```powershell
cd C:\xampp\htdocs\SwordHUB\SwordHub-frontend
npm run dev
```

### Step 3: Test in Browser Console

Open browser console (F12) and test:

```javascript
// Import the API (if using React/Vite, APIs are already imported)
// Test fetch products
fetch('http://localhost:5000/products')
  .then(res => res.json())
  .then(data => console.log('Products:', data));

// Test login
fetch('http://localhost:5000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@swordhub.com',
    password: 'Admin123!'
  })
})
  .then(res => res.json())
  .then(data => console.log('Login:', data));
```

---

## 📝 Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": { ... }
}
```

### Products List Response
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "_id": "671234567890",
        "name": "Professional Training Sword",
        "description": "High-quality...",
        "price": 129.99,
        "category": {
          "_id": "...",
          "name": "Training"
        },
        "stock": 50,
        "images": ["image1.jpg"],
        "rating": 4.5
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 12,
      "pages": 2
    }
  }
}
```

---

## 🎨 Admin Dashboard Features

All these features are now available via API:

### ✅ Dashboard Overview
- Total revenue
- Total orders
- Total products
- Total users
- Pending orders count
- Recent orders list
- Top selling products
- Sales by month

### ✅ Products Management
- View all products
- Add new product
- Edit product
- Delete product
- Upload product images
- Filter by category
- Search products

### ✅ Categories Management
- View all categories
- Add new category
- Edit category
- Delete category

### ✅ Orders Management
- View all orders
- Filter by status
- Update order status
- View order details
- Delete orders

### ✅ Analytics
- Sales trends
- Revenue analytics
- Order statistics
- Product performance

---

## 🔧 Troubleshooting

### Issue: "Network Error" or "Failed to fetch"

**Solution 1**: Ensure backend is running
```powershell
cd C:\xampp\htdocs\SwordHUB\SwordHub-backend
php -S localhost:5000 index.php
```

**Solution 2**: Check CORS settings
- Backend already configured for `http://localhost:5173`
- If using different port, update backend `.env` file

**Solution 3**: Verify API URL
- Check `SwordHub-frontend/.env` has: `VITE_API_URL=http://localhost:5000`

### Issue: "401 Unauthorized"

**Solution**: Login again to get fresh token
```javascript
import { authApi } from './services/apiService';
await authApi.login({ email: 'admin@swordhub.com', password: 'Admin123!' });
```

### Issue: "Products not loading"

**Solution**: Check backend has data
```powershell
cd C:\xampp\htdocs\SwordHUB\SwordHub-backend
php verify-data.php
```

If empty, re-seed database:
```powershell
php seed.php
```

### Issue: "Admin features not working"

**Solution**: Ensure logged in as admin
- Email: `admin@swordhub.com`
- Password: `Admin123!`
- Check user role: `localStorage.getItem('user')` should show `"role": "admin"`

---

## 📦 Current Database Content

Your MongoDB Atlas database currently has:
- ✅ **1 Admin User** (`admin@swordhub.com`)
- ✅ **4 Categories** (Training, Footwear, Accessories, Apparel)
- ✅ **12 Products** (various swords and equipment)
- 📝 **0 Orders** (create through frontend)

---

## 🚀 Next Steps

1. ✅ **Backend is running** - `http://localhost:5000`
2. ✅ **MongoDB connected** - Atlas cloud database
3. ✅ **Frontend configured** - API service ready
4. ✅ **APIs accessible** - All endpoints working

Now you can:
1. Start your frontend dev server: `npm run dev`
2. Login as admin: `admin@swordhub.com` / `Admin123!`
3. Access all admin dashboard features
4. View/manage products, categories, orders
5. View dashboard statistics

---

## 📚 API Service Location

All API functions are in:
```
SwordHub-frontend/src/services/apiService.js
```

Import in your components:
```javascript
import { 
  productsApi, 
  categoriesApi, 
  ordersApi, 
  authApi, 
  dashboardApi 
} from '../services/apiService';
```

---

**Your frontend can now fully interact with the backend! 🎉**

Test admin credentials:
- **Email**: admin@swordhub.com
- **Password**: Admin123!
