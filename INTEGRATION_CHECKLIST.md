# ✅ Integration Checklist

Use this checklist to ensure everything is working correctly when connecting frontend with backend.

## 🎯 Pre-Integration Checklist

### Frontend Setup
- [x] Dependencies installed (`npm install`)
- [x] `.env` file created with `VITE_API_URL`
- [x] Frontend starts without errors (`npm run dev`)
- [x] Can access http://localhost:5173
- [x] No console errors on homepage

### Backend Setup (Your Task)
- [ ] Backend project created
- [ ] Dependencies installed
- [ ] Database setup (MongoDB/PostgreSQL)
- [ ] `.env` file configured
- [ ] Backend starts without errors
- [ ] Can access http://localhost:5000
- [ ] Database connection successful

## 🔐 Authentication Tests

- [ ] **Login Endpoint Works**
  - POST /api/auth/login returns token
  - Returns user object with role
  - Status code 200 on success
  - Status code 401 on wrong credentials

- [ ] **Frontend Login Works**
  - Navigate to http://localhost:5173/admin/login
  - Enter admin credentials
  - Token stored in localStorage
  - Redirected to /admin dashboard
  - No console errors

- [ ] **Protected Routes Work**
  - Accessing /admin without login redirects to /admin/login
  - After login, can access /admin pages
  - Token included in API requests

- [ ] **Current User Endpoint**
  - GET /api/auth/me returns user data
  - Works with valid token
  - Returns 401 without token

## 📦 Products Management Tests

### Backend API
- [ ] **GET /api/products**
  - Returns array of products
  - Status code 200
  - Correct data structure

- [ ] **GET /api/products/:id**
  - Returns single product
  - Status code 200 on success
  - Status code 404 if not found

- [ ] **POST /api/products** (Admin)
  - Creates new product
  - Requires authentication
  - Status code 201 on success
  - Validates required fields

- [ ] **PUT /api/products/:id** (Admin)
  - Updates existing product
  - Requires authentication
  - Status code 200 on success

- [ ] **DELETE /api/products/:id** (Admin)
  - Deletes product
  - Requires authentication
  - Status code 200 on success

- [ ] **POST /api/products/upload** (Admin)
  - Uploads image file
  - Returns image URL
  - Validates file type
  - Enforces file size limit

### Frontend Integration
- [ ] **Homepage Products Display**
  - Navigate to http://localhost:5173
  - Products load from API
  - Loading skeleton shows while fetching
  - Products display correctly
  - Images load correctly

- [ ] **Admin Products Page**
  - Navigate to /admin/products
  - Products table loads
  - Can search products
  - All product data displays correctly

- [ ] **Create Product**
  - Click "Add Product" button
  - Modal form opens
  - Fill in all fields
  - Upload an image
  - Submit form
  - Product created successfully
  - Table refreshes with new product

- [ ] **Edit Product**
  - Click edit icon on a product
  - Modal opens with product data
  - Modify some fields
  - Submit form
  - Product updated successfully
  - Changes reflect in table

- [ ] **Delete Product**
  - Click delete icon on a product
  - Confirmation dialog appears
  - Confirm deletion
  - Product removed from table
  - Success message shows

## 🏷️ Categories Management Tests

### Backend API
- [ ] **GET /api/categories**
  - Returns array of categories
  - Status code 200

- [ ] **POST /api/categories** (Admin)
  - Creates new category
  - Requires authentication
  - Status code 201 on success

- [ ] **PUT /api/categories/:id** (Admin)
  - Updates category
  - Status code 200 on success

- [ ] **DELETE /api/categories/:id** (Admin)
  - Deletes category
  - Status code 200 on success

### Frontend Integration
- [ ] **Admin Categories Page**
  - Navigate to /admin/categories
  - Categories table loads
  - Shows product count per category

- [ ] **Create Category**
  - Click "Add Category"
  - Modal form opens
  - Enter name and description
  - Submit form
  - Category created
  - Table refreshes

- [ ] **Edit Category**
  - Click edit icon
  - Modal opens with data
  - Modify fields
  - Submit form
  - Category updated

- [ ] **Delete Category**
  - Click delete icon
  - Confirm deletion
  - Category removed

- [ ] **Categories in Product Form**
  - Open product creation/edit form
  - Category dropdown populated from API
  - Can select category

## 📋 Orders Management Tests

### Backend API
- [ ] **GET /api/orders** (Admin)
  - Returns array of orders
  - Requires authentication
  - Supports status filter

- [ ] **POST /api/orders**
  - Creates new order
  - Calculates total correctly
  - Validates product availability
  - Reduces stock

- [ ] **PATCH /api/orders/:id/status** (Admin)
  - Updates order status
  - Requires authentication
  - Validates status value

- [ ] **DELETE /api/orders/:id** (Admin)
  - Deletes order
  - Requires authentication

### Frontend Integration
- [ ] **Admin Orders Page**
  - Navigate to /admin/orders
  - Orders table loads
  - Shows all order details

- [ ] **Filter Orders**
  - Use status filter dropdown
  - Table updates with filtered orders

- [ ] **Update Order Status**
  - Change status in dropdown
  - Order status updates
  - No errors in console

- [ ] **Delete Order**
  - Click delete icon
  - Confirm deletion
  - Order removed from table

## 📊 Dashboard Tests

### Backend API
- [ ] **GET /api/dashboard/stats** (Admin)
  - Returns statistics object
  - Requires authentication
  - Correct calculations

### Frontend Integration
- [ ] **Admin Dashboard**
  - Navigate to /admin
  - Statistics cards load
  - Correct numbers displayed
  - No loading errors

## 🔍 Additional Tests

### Error Handling
- [ ] **Network Errors**
  - Stop backend server
  - Try to load products
  - Error message displays
  - Retry button works

- [ ] **Validation Errors**
  - Try to create product with missing fields
  - Appropriate error messages show
  - Form doesn't submit

- [ ] **Authentication Errors**
  - Try to access admin route without login
  - Redirected to login page
  - Login with wrong credentials
  - Error message displays

### Performance
- [ ] **Page Load Times**
  - Homepage loads quickly
  - Admin pages load quickly
  - No significant delays

- [ ] **Image Loading**
  - Product images load correctly
  - No broken image icons
  - Appropriate placeholders

### Responsive Design
- [ ] **Mobile View**
  - Test on mobile viewport
  - Navigation works
  - Admin sidebar collapses
  - Forms are usable

- [ ] **Tablet View**
  - Test on tablet viewport
  - Layout adjusts correctly
  - All features accessible

- [ ] **Desktop View**
  - Full features available
  - Optimal layout

## 🔒 Security Tests

- [ ] **Token Expiration**
  - Token expires after configured time
  - Redirects to login when expired

- [ ] **Admin-Only Routes**
  - Regular users cannot access admin routes
  - Proper authorization checks

- [ ] **SQL/NoSQL Injection**
  - Try injecting malicious input
  - Backend properly sanitizes

- [ ] **File Upload Security**
  - Cannot upload non-image files
  - File size limit enforced
  - Files stored securely

## 🌐 CORS Tests

- [ ] **Cross-Origin Requests**
  - Frontend can make requests to backend
  - No CORS errors in console
  - Credentials included if needed

## 📱 User Flow Tests

### Customer Flow
- [ ] Navigate to homepage
- [ ] Browse products
- [ ] Search for products
- [ ] Filter by category
- [ ] View product details
- [ ] Add to cart
- [ ] Proceed to checkout
- [ ] Place order successfully

### Admin Flow
- [ ] Login at /admin/login
- [ ] View dashboard statistics
- [ ] Navigate to products management
- [ ] Create new product
- [ ] Upload product image
- [ ] Edit existing product
- [ ] Delete product
- [ ] Navigate to orders management
- [ ] View all orders
- [ ] Update order status
- [ ] Navigate to categories management
- [ ] Create category
- [ ] Edit category
- [ ] Delete category
- [ ] Logout

## 🐛 Known Issues Tracker

Document any issues you find:

| Issue | Location | Severity | Status | Notes |
|-------|----------|----------|--------|-------|
| Example: Token not refreshing | Auth | Medium | Open | Need to implement refresh logic |
|  |  |  |  |  |
|  |  |  |  |  |

## ✨ Final Verification

Before deploying to production:

- [ ] All tests above passed
- [ ] No console errors
- [ ] No console warnings
- [ ] All features work as expected
- [ ] Error handling works properly
- [ ] Loading states display correctly
- [ ] Success messages show
- [ ] Data persists correctly
- [ ] Images upload and display
- [ ] Authentication is secure
- [ ] Environment variables configured
- [ ] Production API URL updated
- [ ] Database backups configured
- [ ] SSL certificates installed (production)

## 📝 Test Results Summary

| Component | Tests Passed | Tests Failed | Pass Rate |
|-----------|--------------|--------------|-----------|
| Authentication | /10 | /10 | % |
| Products | /15 | /15 | % |
| Categories | /10 | /10 | % |
| Orders | /12 | /12 | % |
| Dashboard | /5 | /5 | % |
| **TOTAL** | **/52** | **/52** | **%** |

## 🎉 Completion Criteria

Project is ready for deployment when:
- ✅ All tests pass (100%)
- ✅ No critical issues
- ✅ All features work
- ✅ Performance acceptable
- ✅ Security verified

---

**Date Started**: _______________
**Date Completed**: _______________
**Tested By**: _______________
**Sign Off**: _______________
