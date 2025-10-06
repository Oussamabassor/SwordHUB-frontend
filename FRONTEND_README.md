# SwordHub Frontend - E-Commerce Platform

A modern, full-featured e-commerce frontend built with React, featuring a complete admin dashboard for managing products, orders, and categories.

## 🚀 Features

### Customer Features
- 🛍️ Product browsing and search
- 🎨 Dark/Light theme toggle
- 📱 Fully responsive design
- 🛒 Shopping cart functionality
- 💳 Order placement system
- 🔍 Product filtering and categories

### Admin Features
- 🔐 Secure admin authentication
- 📊 Dashboard with statistics
- 📦 Complete Product Management (CRUD)
  - Add, edit, delete products
  - Image upload
  - Stock management
  - Featured products
- 📋 Order Management
  - View all orders
  - Update order status
  - Filter by status
- 🏷️ Category Management
  - Create and manage categories
  - Organize products
- 📈 Sales analytics (ready for backend integration)

## 🛠️ Technologies Used

- **React 18** - UI Library
- **React Router DOM** - Navigation
- **Axios** - HTTP Client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Framer Motion** - Animations
- **Vite** - Build Tool

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   │   ├── AdminLayout.jsx
│   │   ├── DataTable.jsx
│   │   ├── ProductForm.jsx
│   │   └── ProtectedRoute.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   └── ...
├── contexts/           # React Context providers
│   ├── AuthContext.jsx
│   └── OrderContext.jsx
├── pages/              # Page components
│   ├── admin/          # Admin pages
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── ProductsManagement.jsx
│   │   ├── OrdersManagement.jsx
│   │   └── CategoriesManagement.jsx
│   ├── HomePage.jsx
│   ├── ProductDetails.jsx
│   └── Collection.jsx
├── services/           # API services
│   └── apiService.js   # Centralized API calls
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── styles/             # CSS files
```

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SwordHub-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔌 API Integration

The frontend is designed to work with a RESTful backend API. All API calls are centralized in `src/services/apiService.js`.

### API Endpoints Expected

#### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current user

#### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/upload` - Upload product image (Admin)

#### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

#### Orders
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update order status (Admin)
- `DELETE /api/orders/:id` - Delete order (Admin)
- `GET /api/orders/stats` - Get order statistics (Admin)

#### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (Admin)
- `GET /api/dashboard/analytics` - Get sales analytics (Admin)

### Authentication

The app uses JWT token-based authentication. Tokens are stored in localStorage and automatically included in API requests via Axios interceptors.

## 🎨 Theming

The app supports dark/light themes using Tailwind CSS and custom theme configuration. Theme preference is persisted in localStorage.

## 📱 Responsive Design

Fully responsive with breakpoints for:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🔐 Admin Access

To access the admin panel:
1. Navigate to `/admin/login`
2. Login with admin credentials
3. Access admin features at `/admin`

Protected routes automatically redirect to login if not authenticated.

## 🚀 Deployment

### Build the project
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service (Vercel, Netlify, etc.).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- Image upload requires backend implementation
- Some features depend on backend API availability
- Initial load shows error if backend is not running (will fallback gracefully)

## 🔮 Future Enhancements

- [ ] Add product reviews and ratings
- [ ] Implement wishlist functionality
- [ ] Add advanced search with filters
- [ ] Implement customer authentication
- [ ] Add order tracking
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Inventory alerts
- [ ] Sales reports and charts

## 📞 Support

For support, email support@swordhub.com or open an issue in the repository.
