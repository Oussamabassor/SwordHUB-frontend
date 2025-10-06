# 🚀 Quick Start Guide - SwordHub E-Commerce Platform

## Overview
This guide will help you quickly set up both frontend and backend for the SwordHub e-commerce platform.

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB or PostgreSQL (depending on your backend choice)
- Git

## Frontend Setup (React)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

The frontend will be available at: `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

## Backend Setup (Follow BACKEND_PROMPT.md)

For detailed backend setup, see `BACKEND_PROMPT.md`. Here's a quick summary:

### Option 1: Node.js + Express + MongoDB

1. **Create backend folder**
```bash
mkdir backend
cd backend
npm init -y
```

2. **Install dependencies**
```bash
npm install express mongoose bcryptjs jsonwebtoken cors dotenv multer helmet express-rate-limit
npm install --save-dev nodemon
```

3. **Create .env file**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/swordhub
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=24h
FRONTEND_URL=http://localhost:5173
```

4. **Run MongoDB**
```bash
mongod
```

5. **Start backend server**
```bash
npm run dev
```

## Testing the Full Stack

### 1. Test Backend API (Using curl or Postman)
```bash
# Test health check
curl http://localhost:5000/api/health

# Test products endpoint
curl http://localhost:5000/api/products
```

### 2. Test Admin Login
1. Navigate to: `http://localhost:5173/admin/login`
2. Login with seeded admin credentials:
   - Email: `admin@swordhub.com`
   - Password: `Admin123!`

### 3. Test Product Management
1. Go to: `http://localhost:5173/admin/products`
2. Try creating, editing, and deleting products
3. Upload product images

### 4. Test Customer Features
1. Go to: `http://localhost:5173`
2. Browse products
3. View product details
4. Add items to cart

## Default Admin Credentials
After seeding the database:
- **Email**: admin@swordhub.com
- **Password**: Admin123!

⚠️ **Important**: Change these credentials in production!

## Common Issues & Solutions

### Issue: CORS Error
**Solution**: Make sure your backend has CORS configured for `http://localhost:5173`
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Issue: Cannot connect to database
**Solution**: 
- Ensure MongoDB/PostgreSQL is running
- Check database connection string in `.env`
- Verify database server is accessible

### Issue: 401 Unauthorized on admin routes
**Solution**:
- Verify you're logged in at `/admin/login`
- Check JWT token is stored in localStorage
- Verify backend JWT secret matches

### Issue: Images not uploading
**Solution**:
- Check `uploads` folder exists in backend
- Verify multer configuration
- Check file size limits (max 5MB)

### Issue: Port already in use
**Solution**:
```bash
# Find process using port
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or use different port
```

## Project Structure Overview

```
SwordHub/
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── contexts/           # React contexts
│   │   └── App.jsx             # Main app component
│   ├── public/                 # Static assets
│   ├── .env                    # Environment variables
│   └── package.json
│
└── backend/                     # Backend API (to be created)
    ├── src/
    │   ├── models/             # Database models
    │   ├── routes/             # API routes
    │   ├── controllers/        # Route controllers
    │   ├── middleware/         # Custom middleware
    │   └── config/             # Configuration files
    ├── uploads/                # Uploaded images
    ├── .env                    # Environment variables
    └── package.json
```

## API Endpoints Quick Reference

### Public Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - Get all categories
- `POST /api/orders` - Create order

### Admin Endpoints (Requires Authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/dashboard/stats` - Dashboard statistics
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/orders` - Get all orders
- `PATCH /api/orders/:id/status` - Update order status

## Development Workflow

1. **Start Backend** (Terminal 1)
```bash
cd backend
npm run dev
```

2. **Start Frontend** (Terminal 2)
```bash
cd frontend
npm run dev
```

3. **Make Changes**
- Frontend changes auto-reload
- Backend changes auto-reload (if using nodemon)

4. **Test Changes**
- Test in browser at `http://localhost:5173`
- Test API with Postman/Thunder Client

## Deployment Checklist

### Frontend (Vercel/Netlify)
- [ ] Update `VITE_API_URL` to production backend URL
- [ ] Run `npm run build`
- [ ] Deploy `dist/` folder
- [ ] Configure environment variables on hosting platform

### Backend (Heroku/Railway/DigitalOcean)
- [ ] Update `FRONTEND_URL` to production frontend URL
- [ ] Set all environment variables
- [ ] Configure production database
- [ ] Set `NODE_ENV=production`
- [ ] Deploy backend code

## Next Steps

1. ✅ Complete backend development using `BACKEND_PROMPT.md`
2. ✅ Seed database with sample data
3. ✅ Test all API endpoints
4. ✅ Test frontend-backend integration
5. ✅ Implement additional features (reviews, wishlist, etc.)
6. ✅ Add unit and integration tests
7. ✅ Optimize performance
8. ✅ Deploy to production

## Resources

- **Frontend Documentation**: See `FRONTEND_README.md`
- **Backend Guide**: See `BACKEND_PROMPT.md`
- **React Documentation**: https://react.dev
- **Express Documentation**: https://expressjs.com
- **MongoDB Documentation**: https://docs.mongodb.com

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure both frontend and backend servers are running
4. Check that the database is accessible
5. Review the API endpoint URLs

## License

MIT License - Feel free to use this project for learning and commercial purposes.

---

Happy coding! 🎉
