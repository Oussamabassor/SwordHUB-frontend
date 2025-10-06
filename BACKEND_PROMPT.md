# Backend Development Prompt for SwordHub E-Commerce Platform

## Project Overview
Create a complete RESTful backend API for the SwordHub e-commerce platform. The backend should handle product management, order processing, category management, admin authentication, and provide analytics for the admin dashboard.

## Technology Stack Recommendation

### Option 1: Node.js + Express (Recommended)
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose OR PostgreSQL with Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer
- **Validation**: Joi or express-validator
- **Security**: bcryptjs, helmet, cors, express-rate-limit
- **Environment**: dotenv

### Option 2: Python + Flask/FastAPI
- **Framework**: Flask or FastAPI
- **Database**: PostgreSQL with SQLAlchemy OR MongoDB with PyMongo
- **Authentication**: PyJWT, Flask-JWT-Extended
- **File Upload**: Flask-Upload or FastAPI File handling
- **Validation**: Pydantic (FastAPI) or Marshmallow (Flask)

### Option 3: Java + Spring Boot
- **Framework**: Spring Boot
- **Database**: PostgreSQL or MySQL with Spring Data JPA
- **Authentication**: Spring Security + JWT
- **File Upload**: MultipartFile
- **Validation**: Hibernate Validator

## Database Schema

### Users Collection/Table
```javascript
{
  id: ObjectId/UUID,
  name: String,
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['admin', 'customer'], default: 'customer'),
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection/Table
```javascript
{
  id: ObjectId/UUID,
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: ObjectId/UUID (reference to Categories),
  stock: Number (required, min: 0),
  image: String (URL or path),
  featured: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Categories Collection/Table
```javascript
{
  id: ObjectId/UUID,
  name: String (required, unique),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection/Table
```javascript
{
  id: ObjectId/UUID,
  customerName: String (required),
  customerEmail: String (required),
  customerPhone: String,
  customerAddress: String,
  items: Array [{
    productId: ObjectId/UUID,
    productName: String,
    quantity: Number,
    price: Number
  }],
  total: Number (required),
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  createdAt: Date,
  updatedAt: Date
}
```

## Required API Endpoints

### 1. Authentication Routes (`/api/auth`)

#### POST `/api/auth/login`
- **Purpose**: Admin login
- **Request Body**: 
  ```json
  {
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
- **Response**: 
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "Admin Name",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
  ```
- **Status Codes**: 200 (success), 401 (invalid credentials), 400 (validation error)

#### POST `/api/auth/logout`
- **Purpose**: Admin logout (optional - can be handled client-side)
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ "message": "Logged out successfully" }`

#### GET `/api/auth/me`
- **Purpose**: Get current authenticated user
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User object
- **Status Codes**: 200 (success), 401 (unauthorized)

### 2. Products Routes (`/api/products`)

#### GET `/api/products`
- **Purpose**: Get all products with optional filters
- **Query Parameters**: 
  - `category` (optional): Filter by category ID
  - `search` (optional): Search by product name
  - `minPrice` (optional): Minimum price
  - `maxPrice` (optional): Maximum price
  - `featured` (optional): Boolean for featured products
  - `page` (optional): Page number for pagination
  - `limit` (optional): Items per page
- **Response**: 
  ```json
  {
    "products": [...],
    "total": 100,
    "page": 1,
    "pages": 10
  }
  ```

#### GET `/api/products/:id`
- **Purpose**: Get single product by ID
- **Response**: Product object
- **Status Codes**: 200 (success), 404 (not found)

#### POST `/api/products` (Admin Only)
- **Purpose**: Create new product
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "price": 99.99,
    "category": "category_id",
    "stock": 50,
    "image": "image_url",
    "featured": false
  }
  ```
- **Response**: Created product object
- **Status Codes**: 201 (created), 400 (validation error), 401 (unauthorized)

#### PUT `/api/products/:id` (Admin Only)
- **Purpose**: Update existing product
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: Same as POST (all fields optional)
- **Response**: Updated product object
- **Status Codes**: 200 (success), 404 (not found), 401 (unauthorized)

#### DELETE `/api/products/:id` (Admin Only)
- **Purpose**: Delete product
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ "message": "Product deleted successfully" }`
- **Status Codes**: 200 (success), 404 (not found), 401 (unauthorized)

#### POST `/api/products/upload` (Admin Only)
- **Purpose**: Upload product image
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Request Body**: FormData with `image` field
- **Response**: 
  ```json
  {
    "imageUrl": "http://localhost:5000/uploads/image_filename.jpg"
  }
  ```
- **Status Codes**: 200 (success), 400 (no file or invalid file)

### 3. Categories Routes (`/api/categories`)

#### GET `/api/categories`
- **Purpose**: Get all categories
- **Response**: Array of category objects with product count

#### GET `/api/categories/:id`
- **Purpose**: Get single category
- **Response**: Category object with products

#### POST `/api/categories` (Admin Only)
- **Purpose**: Create new category
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "Category Name",
    "description": "Category Description"
  }
  ```

#### PUT `/api/categories/:id` (Admin Only)
- **Purpose**: Update category
- **Headers**: `Authorization: Bearer <token>`

#### DELETE `/api/categories/:id` (Admin Only)
- **Purpose**: Delete category
- **Headers**: `Authorization: Bearer <token>`

### 4. Orders Routes (`/api/orders`)

#### GET `/api/orders` (Admin Only)
- **Purpose**: Get all orders
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**: 
  - `status` (optional): Filter by order status
  - `startDate` (optional): Filter by start date
  - `endDate` (optional): Filter by end date

#### GET `/api/orders/:id`
- **Purpose**: Get single order
- **Response**: Order object with full details

#### POST `/api/orders`
- **Purpose**: Create new order (customer checkout)
- **Request Body**:
  ```json
  {
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+1234567890",
    "customerAddress": "123 Main St, City, Country",
    "items": [
      {
        "productId": "product_id",
        "quantity": 2
      }
    ]
  }
  ```
- **Response**: Created order with total calculated

#### PATCH `/api/orders/:id/status` (Admin Only)
- **Purpose**: Update order status
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: 
  ```json
  {
    "status": "processing"
  }
  ```

#### DELETE `/api/orders/:id` (Admin Only)
- **Purpose**: Delete order
- **Headers**: `Authorization: Bearer <token>`

#### GET `/api/orders/stats` (Admin Only)
- **Purpose**: Get order statistics
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "totalOrders": 150,
    "pendingOrders": 20,
    "totalRevenue": 15000.50
  }
  ```

### 5. Dashboard Routes (`/api/dashboard`)

#### GET `/api/dashboard/stats` (Admin Only)
- **Purpose**: Get dashboard overview statistics
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "totalProducts": 100,
    "totalOrders": 150,
    "totalRevenue": 15000.50,
    "pendingOrders": 20,
    "totalCategories": 10,
    "recentOrders": [...]
  }
  ```

#### GET `/api/dashboard/analytics` (Admin Only)
- **Purpose**: Get sales analytics
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**: 
  - `period`: 'day', 'week', 'month', 'year'
- **Response**: Sales data grouped by date

## Security Requirements

1. **Password Hashing**: Use bcrypt/bcryptjs with at least 10 salt rounds
2. **JWT Configuration**: 
   - Secret key in environment variables
   - Token expiration: 24 hours
   - Include user ID and role in payload
3. **CORS**: Enable CORS for frontend URL (http://localhost:5173)
4. **Rate Limiting**: Implement rate limiting on authentication routes
5. **Input Validation**: Validate all input data before processing
6. **SQL/NoSQL Injection Protection**: Use parameterized queries or ORM
7. **File Upload Security**: 
   - Validate file types (only images)
   - Limit file size (max 5MB)
   - Generate unique filenames
   - Store in `/uploads` directory

## Middleware Requirements

1. **Authentication Middleware**: Verify JWT token and attach user to request
2. **Admin Authorization Middleware**: Check if user role is 'admin'
3. **Error Handling Middleware**: Catch and format all errors
4. **Request Logger**: Log all API requests (optional)
5. **Validation Middleware**: Validate request bodies

## Environment Variables (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/swordhub
# OR for PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/swordhub

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=24h

# Frontend
FRONTEND_URL=http://localhost:5173

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

## Folder Structure (Node.js Example)

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── products.routes.js
│   │   ├── categories.routes.js
│   │   ├── orders.routes.js
│   │   └── dashboard.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── products.controller.js
│   │   ├── categories.controller.js
│   │   ├── orders.controller.js
│   │   └── dashboard.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── admin.middleware.js
│   │   ├── validation.middleware.js
│   │   └── error.middleware.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── fileUpload.js
│   └── app.js
├── uploads/
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Initial Data Seeding

Create a seed script to populate the database with:
1. **Admin User**:
   - Email: admin@swordhub.com
   - Password: Admin123!
   - Role: admin

2. **Sample Categories**:
   - Training
   - Footwear
   - Accessories
   - Apparel

3. **Sample Products**: 10-15 products across different categories

## Testing Requirements

1. Test all authentication endpoints
2. Test CRUD operations for products, categories, and orders
3. Test authorization (admin-only routes)
4. Test input validation
5. Test file upload functionality
6. Test error handling

## Error Response Format

All errors should follow this format:
```json
{
  "success": false,
  "message": "Error message here",
  "errors": [] // Optional: validation errors
}
```

## Success Response Format

All successful responses should follow this format:
```json
{
  "success": true,
  "data": {...},
  "message": "Optional success message"
}
```

## Development Steps

1. **Initialize Project**
   - Create project folder
   - Initialize package manager (npm/pip/maven)
   - Install dependencies

2. **Setup Database**
   - Configure database connection
   - Create models/schemas
   - Create migrations (if using SQL)

3. **Implement Authentication**
   - User model
   - Registration/Login routes
   - JWT generation and verification
   - Auth middleware

4. **Implement Products API**
   - Product model
   - CRUD routes and controllers
   - Image upload functionality

5. **Implement Categories API**
   - Category model
   - CRUD routes and controllers

6. **Implement Orders API**
   - Order model
   - CRUD routes and controllers
   - Order calculations

7. **Implement Dashboard API**
   - Statistics aggregation
   - Analytics queries

8. **Add Security Features**
   - CORS configuration
   - Rate limiting
   - Input validation
   - Error handling

9. **Create Seed Script**
   - Admin user
   - Sample data

10. **Testing**
    - Test all endpoints with Postman/Thunder Client
    - Fix bugs and edge cases

11. **Documentation**
    - API documentation
    - Setup instructions

## CORS Configuration Example

```javascript
// For Node.js/Express
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

## Important Notes

- Frontend expects JWT token in response on login
- Frontend stores token in localStorage
- Frontend sends token in Authorization header: `Bearer <token>`
- All admin routes must be protected with authentication + authorization
- File uploads should be saved to `/uploads` directory and served statically
- Product images should return full URL in API responses
- Order total should be calculated on backend, not trusted from frontend
- Validate product stock before creating orders
- Reduce product stock after successful order creation

## Success Criteria

✅ All API endpoints working as specified
✅ Authentication and authorization working correctly
✅ CRUD operations for products, categories, and orders
✅ Image upload functionality
✅ Dashboard statistics accurate
✅ Input validation on all routes
✅ Error handling comprehensive
✅ CORS configured for frontend
✅ Database seeded with initial data
✅ No console errors or warnings
✅ Frontend can successfully connect and perform all operations

## Additional Recommendations

1. Add API documentation using Swagger/OpenAPI
2. Implement request logging for debugging
3. Add database indexes for better performance
4. Implement pagination for large datasets
5. Add caching for frequently accessed data (Redis)
6. Implement email notifications for orders
7. Add backup and restore functionality
8. Create Docker configuration for easy deployment
9. Add API versioning (/api/v1/...)
10. Implement WebSocket for real-time order updates

## Testing the Integration

After implementing the backend:

1. Start backend server: `npm start` (or equivalent)
2. Start frontend server: `npm run dev`
3. Test login at `http://localhost:5173/admin/login`
4. Test product management at `http://localhost:5173/admin/products`
5. Test order management at `http://localhost:5173/admin/orders`
6. Test category management at `http://localhost:5173/admin/categories`
7. Test customer product browsing at `http://localhost:5173`

## Contact & Support

If you encounter issues during backend development, ensure:
- Database is running and accessible
- Environment variables are correctly configured
- CORS is properly configured
- JWT secret is set and consistent
- All required packages are installed
- Port 5000 is available and not blocked by firewall

Good luck with your backend development! 🚀
