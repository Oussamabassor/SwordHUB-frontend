# 🧪 API Testing Guide

This guide helps you test the backend API endpoints to ensure proper integration with the frontend.

## Testing Tools

You can use any of these tools:
- **Postman** (Recommended) - https://www.postman.com/downloads/
- **Thunder Client** (VS Code Extension)
- **curl** (Command line)
- **Insomnia** - https://insomnia.rest/

## Base URL
```
http://localhost:5000/api
```

## Authentication Flow

### 1. Admin Login
**Endpoint**: `POST /api/auth/login`

**Request**:
```json
{
  "email": "admin@swordhub.com",
  "password": "Admin123!"
}
```

**Expected Response** (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id_here",
    "name": "Admin",
    "email": "admin@swordhub.com",
    "role": "admin"
  }
}
```

**Save the token** - You'll need it for all admin requests!

### 2. Get Current User
**Endpoint**: `GET /api/auth/me`

**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "Admin",
    "email": "admin@swordhub.com",
    "role": "admin"
  }
}
```

## Product Endpoints

### 3. Get All Products
**Endpoint**: `GET /api/products`

**Optional Query Parameters**:
- `?search=shirt` - Search products
- `?category=category_id` - Filter by category
- `?minPrice=10&maxPrice=100` - Price range
- `?featured=true` - Only featured products

**Expected Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "product_id",
      "name": "Pro Performance T-Shirt",
      "description": "High-quality training shirt",
      "price": 49.99,
      "category": "category_id",
      "stock": 50,
      "image": "http://localhost:5000/uploads/image.jpg",
      "featured": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 4. Get Single Product
**Endpoint**: `GET /api/products/:id`

**Example**: `GET /api/products/507f1f77bcf86cd799439011`

**Expected Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "product_id",
    "name": "Pro Performance T-Shirt",
    "description": "High-quality training shirt",
    "price": 49.99,
    "category": {
      "id": "category_id",
      "name": "Training"
    },
    "stock": 50,
    "image": "http://localhost:5000/uploads/image.jpg",
    "featured": true
  }
}
```

### 5. Create Product (Admin Only)
**Endpoint**: `POST /api/products`

**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "New Training Shorts",
  "description": "Comfortable training shorts",
  "price": 39.99,
  "category": "category_id_here",
  "stock": 100,
  "image": "http://localhost:5000/uploads/shorts.jpg",
  "featured": false
}
```

**Expected Response** (201):
```json
{
  "success": true,
  "data": {
    "id": "new_product_id",
    "name": "New Training Shorts",
    "description": "Comfortable training shorts",
    "price": 39.99,
    "category": "category_id_here",
    "stock": 100,
    "image": "http://localhost:5000/uploads/shorts.jpg",
    "featured": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Product created successfully"
}
```

### 6. Update Product (Admin Only)
**Endpoint**: `PUT /api/products/:id`

**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body** (all fields optional):
```json
{
  "name": "Updated Product Name",
  "price": 44.99,
  "stock": 75
}
```

**Expected Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "product_id",
    "name": "Updated Product Name",
    "price": 44.99,
    "stock": 75
  },
  "message": "Product updated successfully"
}
```

### 7. Delete Product (Admin Only)
**Endpoint**: `DELETE /api/products/:id`

**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response** (200):
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### 8. Upload Product Image (Admin Only)
**Endpoint**: `POST /api/products/upload`

**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: multipart/form-data
```

**Body**: Form data with key `image` and file value

**Expected Response** (200):
```json
{
  "success": true,
  "imageUrl": "http://localhost:5000/uploads/1234567890-image.jpg"
}
```

## Category Endpoints

### 9. Get All Categories
**Endpoint**: `GET /api/categories`

**Expected Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "category_id",
      "name": "Training",
      "description": "Training equipment and apparel",
      "productCount": 15,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 10. Create Category (Admin Only)
**Endpoint**: `POST /api/categories`

**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Accessories",
  "description": "Training accessories"
}
```

**Expected Response** (201):
```json
{
  "success": true,
  "data": {
    "id": "new_category_id",
    "name": "Accessories",
    "description": "Training accessories",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Category created successfully"
}
```

### 11. Update Category (Admin Only)
**Endpoint**: `PUT /api/categories/:id`

**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Updated Category Name",
  "description": "Updated description"
}
```

### 12. Delete Category (Admin Only)
**Endpoint**: `DELETE /api/categories/:id`

**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## Order Endpoints

### 13. Get All Orders (Admin Only)
**Endpoint**: `GET /api/orders`

**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Optional Query Parameters**:
- `?status=pending` - Filter by status
- `?startDate=2024-01-01` - From date
- `?endDate=2024-12-31` - To date

**Expected Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "order_id",
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "customerPhone": "+1234567890",
      "customerAddress": "123 Main St, City, Country",
      "items": [
        {
          "productId": "product_id",
          "productName": "Pro Performance T-Shirt",
          "quantity": 2,
          "price": 49.99
        }
      ],
      "total": 99.98,
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 14. Create Order
**Endpoint**: `POST /api/orders`

**Request Body**:
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1234567890",
  "customerAddress": "123 Main St, City, Country",
  "items": [
    {
      "productId": "product_id_1",
      "quantity": 2
    },
    {
      "productId": "product_id_2",
      "quantity": 1
    }
  ]
}
```

**Expected Response** (201):
```json
{
  "success": true,
  "data": {
    "id": "new_order_id",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "items": [...],
    "total": 149.97,
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Order created successfully"
}
```

### 15. Update Order Status (Admin Only)
**Endpoint**: `PATCH /api/orders/:id/status`

**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body**:
```json
{
  "status": "processing"
}
```

**Valid Status Values**:
- `pending`
- `processing`
- `shipped`
- `delivered`
- `cancelled`

**Expected Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "order_id",
    "status": "processing"
  },
  "message": "Order status updated successfully"
}
```

### 16. Delete Order (Admin Only)
**Endpoint**: `DELETE /api/orders/:id`

**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## Dashboard Endpoints

### 17. Get Dashboard Statistics (Admin Only)
**Endpoint**: `GET /api/dashboard/stats`

**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response** (200):
```json
{
  "success": true,
  "data": {
    "totalProducts": 100,
    "totalOrders": 150,
    "totalRevenue": 15000.50,
    "pendingOrders": 20,
    "totalCategories": 10
  }
}
```

### 18. Get Sales Analytics (Admin Only)
**Endpoint**: `GET /api/dashboard/analytics?period=week`

**Headers**:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Query Parameters**:
- `period`: `day`, `week`, `month`, `year`

**Expected Response** (200):
```json
{
  "success": true,
  "data": {
    "period": "week",
    "sales": [
      {
        "date": "2024-01-01",
        "orders": 10,
        "revenue": 1000.50
      },
      {
        "date": "2024-01-02",
        "orders": 15,
        "revenue": 1500.75
      }
    ]
  }
}
```

## Error Responses

All error responses should follow this format:

**400 Bad Request** (Validation Error):
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**401 Unauthorized**:
```json
{
  "success": false,
  "message": "Authentication required"
}
```

**403 Forbidden**:
```json
{
  "success": false,
  "message": "Admin access required"
}
```

**404 Not Found**:
```json
{
  "success": false,
  "message": "Product not found"
}
```

**500 Internal Server Error**:
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Postman Collection

You can import this collection into Postman:

1. Create a new collection named "SwordHub API"
2. Add environment variable `baseUrl` = `http://localhost:5000/api`
3. Add environment variable `token` = (will be set after login)
4. Create folders for: Auth, Products, Categories, Orders, Dashboard
5. Add the endpoints above to respective folders

## Testing Checklist

- [ ] Login works and returns token
- [ ] Token stored in environment/variable
- [ ] Get all products works
- [ ] Create product works (with token)
- [ ] Update product works (with token)
- [ ] Delete product works (with token)
- [ ] Image upload works
- [ ] Get all categories works
- [ ] Category CRUD works
- [ ] Get all orders works (with token)
- [ ] Create order works
- [ ] Update order status works (with token)
- [ ] Dashboard stats work (with token)
- [ ] Unauthorized requests return 401
- [ ] Invalid data returns 400 with errors
- [ ] Not found returns 404

## Common Issues

### CORS Error
Make sure backend has CORS enabled for `http://localhost:5173`

### 401 Unauthorized
- Check if token is included in headers
- Verify token format: `Bearer YOUR_TOKEN`
- Token might be expired

### 404 Not Found
- Verify the endpoint URL is correct
- Check if backend server is running
- Ensure route is implemented

### 500 Internal Server Error
- Check backend console/logs for error details
- Verify database is connected
- Check for missing required fields

## Next Steps

After testing all endpoints:
1. Verify frontend can connect
2. Test complete user flows
3. Check error handling
4. Verify data persistence
5. Test edge cases

---

Happy Testing! 🧪
