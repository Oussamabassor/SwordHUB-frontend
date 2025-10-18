# 🚀 SwordHub Deployment Guide - FREE Hosting

## Overview
This guide will help you deploy your SwordHub project (React frontend + PHP backend + MongoDB) completely **FREE**.

---

## 📋 **Deployment Stack**

| Component | Service | Cost |
|-----------|---------|------|
| **Frontend** | Vercel / Netlify | FREE |
| **Backend** | Railway / Render | FREE |
| **Database** | MongoDB Atlas | FREE (512MB) |
| **Images** | Cloudinary / ImgBB | FREE |

---

## 🗄️ **Step 1: Deploy MongoDB Database**

### **MongoDB Atlas (Recommended)**

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with Google/GitHub (faster)

2. **Create Cluster**
   - Choose: **M0 Sandbox (FREE)**
   - Region: Choose closest to your users
   - Cluster Name: `swordhub-cluster`
   - Click "Create"

3. **Setup Database Access**
   - Go to: **Database Access** → **Add New Database User**
   - Username: `swordhub_admin`
   - Password: Generate strong password (save it!)
   - Database User Privileges: **Read and write to any database**
   - Click "Add User"

4. **Setup Network Access**
   - Go to: **Network Access** → **Add IP Address**
   - Click: **Allow Access from Anywhere** (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to: **Database** → **Connect** → **Connect your application**
   - Copy the connection string:
   ```
   mongodb+srv://swordhub_admin:<password>@swordhub-cluster.xxxxx.mongodb.net/swordhub?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Replace `swordhub` with your database name

6. **Import Your Data**
   - Download MongoDB Compass: https://www.mongodb.com/products/compass
   - Connect using your connection string
   - Import your data or let backend create collections automatically

---

## 🖥️ **Step 2: Deploy PHP Backend**

### **Option A: Railway (Recommended - Easiest)**

1. **Prepare Backend**
   - Create `.railwayignore` file:
   ```
   node_modules/
   .git/
   .env
   uploads/
   vendor/
   ```

2. **Create `railway.toml`**
   ```toml
   [build]
   builder = "nixpacks"
   buildCommand = "composer install --no-dev --optimize-autoloader"

   [deploy]
   startCommand = "php -S 0.0.0.0:$PORT -t ."
   healthcheckPath = "/"
   healthcheckTimeout = 300
   restartPolicyType = "always"
   ```

3. **Deploy to Railway**
   - Go to: https://railway.app
   - Sign up with GitHub
   - Click: **New Project** → **Deploy from GitHub repo**
   - Select your `SwordHub-backend` repository
   - Railway will auto-detect PHP and deploy

4. **Add Environment Variables**
   - In Railway dashboard → **Variables** tab
   - Add these variables:
   ```
   MONGODB_URI=mongodb+srv://swordhub_admin:<password>@...
   DB_NAME=swordhub
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

5. **Get Backend URL**
   - Railway will give you a URL like: `https://swordhub-backend.up.railway.app`
   - Save this URL for frontend configuration

### **Option B: Render.com**

1. **Create `render.yaml`**
   ```yaml
   services:
     - type: web
       name: swordhub-backend
       env: php
       buildCommand: composer install --no-dev
       startCommand: php -S 0.0.0.0:$PORT -t .
       envVars:
         - key: MONGODB_URI
           sync: false
         - key: JWT_SECRET
           sync: false
   ```

2. **Deploy**
   - Go to: https://render.com
   - Sign up with GitHub
   - **New** → **Web Service**
   - Connect your GitHub repository
   - Add environment variables
   - Deploy

---

## 🎨 **Step 3: Deploy React Frontend**

### **Option A: Vercel (Recommended)**

1. **Prepare Frontend**
   - Create `.vercelignore`:
   ```
   node_modules/
   .env.local
   .env
   ```

2. **Update Environment Variables**
   - Create `.env.production`:
   ```env
   VITE_API_URL=https://swordhub-backend.up.railway.app
   ```

3. **Deploy to Vercel**
   - Go to: https://vercel.com
   - Sign up with GitHub
   - Click: **Add New** → **Project**
   - Import your `SwordHub-frontend` repository
   - Configure:
     - Framework Preset: **Vite**
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add Environment Variables:
     - `VITE_API_URL` = your backend URL
   - Click **Deploy**

4. **Get Frontend URL**
   - Vercel gives you: `https://swordhub.vercel.app`
   - Custom domain available (free with Vercel)

### **Option B: Netlify**

1. **Create `netlify.toml`**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [build.environment]
     NODE_VERSION = "18"
   ```

2. **Deploy**
   - Go to: https://netlify.com
   - Sign up with GitHub
   - **Add new site** → **Import an existing project**
   - Connect GitHub repository
   - Add environment variables
   - Deploy

---

## 📁 **Step 4: Handle File Uploads (Images)**

Your backend has product images in `/uploads/products/`. Free hosting usually doesn't support persistent file storage. Here are solutions:

### **Option A: Cloudinary (Recommended)**

1. **Create Account**
   - Go to: https://cloudinary.com/users/register/free
   - Free plan: 25GB storage, 25GB bandwidth/month

2. **Update Backend Code**
   
   Install Cloudinary SDK:
   ```bash
   composer require cloudinary/cloudinary_php
   ```

   Update `utils/FileUpload.php`:
   ```php
   <?php
   require_once __DIR__ . '/../vendor/autoload.php';

   use Cloudinary\Cloudinary;

   class FileUpload {
       private $cloudinary;
       
       public function __construct() {
           $this->cloudinary = new Cloudinary([
               'cloud' => [
                   'cloud_name' => getenv('CLOUDINARY_CLOUD_NAME'),
                   'api_key' => getenv('CLOUDINARY_API_KEY'),
                   'api_secret' => getenv('CLOUDINARY_API_SECRET')
               ]
           ]);
       }

       public function uploadProductImage($file) {
           try {
               $result = $this->cloudinary->uploadApi()->upload(
                   $file['tmp_name'],
                   [
                       'folder' => 'swordhub/products',
                       'resource_type' => 'image'
                   ]
               );
               return $result['secure_url'];
           } catch (Exception $e) {
               throw new Exception("Upload failed: " . $e->getMessage());
           }
       }
   }
   ```

3. **Add Environment Variables**
   - In Railway/Render, add:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Upload Existing Images**
   - Use Cloudinary dashboard to bulk upload existing images
   - Update MongoDB with new Cloudinary URLs

### **Option B: ImgBB**

Free image hosting with API:
- Sign up: https://imgbb.com/
- Get API key
- Upload images via API
- Store returned URLs in database

---

## 🔧 **Step 5: Update Backend CORS**

Update `index.php` or create `config/cors.php`:

```php
<?php
// Allow requests from your Vercel domain
$allowedOrigins = [
    'https://swordhub.vercel.app',
    'https://your-custom-domain.com',
    'http://localhost:5173' // Keep for development
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
```

---

## ✅ **Step 6: Final Configuration**

### **Backend Environment Variables (Railway/Render)**
```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/swordhub
DB_NAME=swordhub

# Security
JWT_SECRET=your-very-long-and-secure-random-secret-key-here-min-32-chars
CORS_ORIGIN=https://swordhub.vercel.app

# Cloudinary (if using)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz

# App Config
APP_ENV=production
```

### **Frontend Environment Variables (Vercel/Netlify)**
```env
VITE_API_URL=https://swordhub-backend.up.railway.app
```

---

## 🧪 **Step 7: Test Your Deployment**

1. **Test Backend**
   ```bash
   curl https://your-backend.up.railway.app/api/products
   ```

2. **Test Frontend**
   - Visit: `https://your-app.vercel.app`
   - Check browser console for errors
   - Test all features:
     - ✅ View products
     - ✅ Add to cart
     - ✅ Checkout process
     - ✅ Admin login
     - ✅ Product management

3. **Check Database**
   - MongoDB Compass → Connect
   - Verify data is being saved

---

## 🐛 **Common Issues & Solutions**

### **Issue: CORS Errors**
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:**
- Update backend CORS to include frontend URL
- Check Railway/Render environment variables
- Restart backend service

### **Issue: Images Not Loading**
```
404 Not Found for image URLs
```
**Solution:**
- Migrate to Cloudinary (persistent storage)
- Update image URLs in database
- Use absolute URLs, not relative paths

### **Issue: MongoDB Connection Failed**
```
Failed to connect to MongoDB
```
**Solution:**
- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Verify connection string in environment variables
- Check database user permissions

### **Issue: 502 Bad Gateway**
```
Application failed to respond
```
**Solution:**
- Check Railway/Render logs
- Verify PHP version compatibility
- Check composer dependencies installed

---

## 💰 **Free Tier Limits**

| Service | Limits | Upgrade Cost |
|---------|--------|--------------|
| **Vercel** | 100GB bandwidth/month | $20/month for Pro |
| **Railway** | $5 free credit/month, then $0.000231/GB-hour | Pay as you go |
| **MongoDB Atlas** | 512MB storage, Shared cluster | $9/month for M10 |
| **Cloudinary** | 25GB storage, 25GB bandwidth | $99/month for Plus |

---

## 🎯 **Deployment Checklist**

- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with proper permissions
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Backend deployed to Railway/Render
- [ ] Backend environment variables set
- [ ] Backend URL obtained and tested
- [ ] Frontend environment variables updated
- [ ] Frontend deployed to Vercel/Netlify
- [ ] CORS configured correctly
- [ ] Images migrated to Cloudinary (if needed)
- [ ] All features tested on production
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic on Vercel/Railway)

---

## 🌐 **Custom Domain (Optional)**

### **For Frontend (Vercel)**
1. Buy domain from Namecheap/GoDaddy (~$12/year)
2. Vercel → Settings → Domains
3. Add your domain
4. Update DNS records as instructed
5. Wait for SSL certificate (automatic)

### **For Backend (Railway)**
1. Railway → Settings → Domains
2. Add custom domain
3. Update DNS CNAME record
4. Update frontend API URL

---

## 📚 **Additional Resources**

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **PHP Deployment Guide**: https://www.php.net/manual/en/features.commandline.webserver.php

---

## 🆘 **Need Help?**

If you encounter issues:
1. Check service status pages
2. Review deployment logs
3. Test API endpoints with Postman
4. Check browser console for errors
5. Verify environment variables

---

## 🎉 **Congratulations!**

Your SwordHub project is now live and accessible worldwide! 🌍

**Share your project:**
- Frontend: `https://swordhub.vercel.app`
- Backend API: `https://swordhub-backend.up.railway.app`

---

**Last Updated:** October 14, 2025
**Author:** GitHub Copilot
**Project:** SwordHub E-commerce Platform
