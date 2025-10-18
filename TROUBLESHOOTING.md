# 🐛 Deployment Troubleshooting Guide

## Quick Diagnostic Checklist

Run through this checklist when something isn't working:

```
□ Backend is deployed and running (check Railway dashboard)
□ Frontend is deployed and running (check Vercel dashboard)
□ MongoDB cluster is running (check Atlas dashboard)
□ Environment variables are set correctly
□ CORS is configured with correct frontend URL
□ Database connection string is correct
□ No errors in browser console
□ No errors in backend logs
```

---

## Issue Categories

### 1️⃣ **Backend Won't Start**

**Symptom:** Railway shows "Failed to start" or "Application error"

**Debug Steps:**
1. Check Railway logs:
   ```
   Railway Dashboard → Deployments → View Logs
   ```

2. Common causes:
   - ❌ Missing composer dependencies
   - ❌ PHP syntax error
   - ❌ Missing environment variables

**Solutions:**
```bash
# Make sure composer.json has all dependencies
{
  "require": {
    "php": ">=8.0",
    "mongodb/mongodb": "^1.15"
  }
}

# Railway should run:
composer install --no-dev --optimize-autoloader
```

---

### 2️⃣ **CORS Errors**

**Symptom:** Browser console shows:
```
Access to XMLHttpRequest at 'https://backend.com' from origin 'https://frontend.com' 
has been blocked by CORS policy
```

**Solution:**
1. Update backend CORS configuration
2. Check `index.php` or CORS middleware:

```php
<?php
// In your backend index.php or cors.php

$allowedOrigins = [
    'https://swordhub.vercel.app',
    'https://your-custom-domain.com',
    'http://localhost:5173'  // For development
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
```

3. Update Railway environment variable:
   ```
   CORS_ORIGIN = https://swordhub.vercel.app
   ```

4. Redeploy backend

---

### 3️⃣ **MongoDB Connection Failed**

**Symptom:** Backend logs show:
```
Failed to connect to MongoDB: Connection timeout
```

**Debug Steps:**

1. **Check IP Whitelist**
   ```
   MongoDB Atlas → Network Access
   ✅ Must have: 0.0.0.0/0 (Allow from anywhere)
   ```

2. **Verify Connection String**
   ```
   Railway → Variables → MONGODB_URI
   
   Format should be:
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   
   ⚠️ Common mistakes:
   - Password contains special characters (URL encode them)
   - Missing database name
   - Wrong cluster URL
   ```

3. **Test Connection String**
   ```bash
   # Use MongoDB Compass to test
   # If Compass can't connect, Railway won't either
   ```

**Solution for Special Characters in Password:**
```
If password is: P@ssw0rd!
URL encoded: P%40ssw0rd%21

@ = %40
! = %21
# = %23
$ = %24
% = %25
```

---

### 4️⃣ **Frontend Not Connecting to Backend**

**Symptom:** Products don't load, API calls fail

**Debug Steps:**

1. **Check Browser Console** (F12)
   ```
   Look for:
   - Network errors (CORS, 404, 500)
   - Failed API requests
   - Wrong API URLs
   ```

2. **Verify API URL**
   ```
   Vercel → Settings → Environment Variables
   
   VITE_API_URL = https://your-backend.up.railway.app
   
   ⚠️ Common mistakes:
   - Trailing slash: https://backend.com/ ❌
   - Correct: https://backend.com ✅
   - Missing https://
   - Wrong domain
   ```

3. **Test Backend Directly**
   ```bash
   # In browser or Postman
   https://your-backend.up.railway.app/api/products
   
   ✅ Should return JSON
   ❌ If 404: Backend routes not working
   ❌ If timeout: Backend not running
   ```

4. **Redeploy Frontend**
   ```
   Vercel → Deployments → Redeploy
   
   ⚠️ Environment variables only apply to NEW deployments
   ```

---

### 5️⃣ **Images Not Loading**

**Symptom:** Products show broken image icons

**Cause:** Free hosting doesn't have persistent storage for uploads

**Solution A: Use Cloudinary (Recommended)**

1. **Sign up for Cloudinary**
   ```
   https://cloudinary.com
   Free: 25GB storage + 25GB bandwidth
   ```

2. **Upload images manually**
   ```
   Cloudinary Dashboard → Media Library → Upload
   
   Organize in folders:
   - swordhub/products/
   ```

3. **Get image URLs**
   ```
   Example:
   https://res.cloudinary.com/yourcloud/image/upload/v123456/swordhub/products/sword1.jpg
   ```

4. **Update MongoDB**
   ```javascript
   // In MongoDB Compass or Atlas
   db.products.updateMany(
     {},
     {
       $set: {
         image: "https://res.cloudinary.com/yourcloud/image/upload/v123456/swordhub/products/"
       }
     }
   )
   ```

**Solution B: Move to Frontend**

1. **Copy images to frontend**
   ```bash
   # Copy from backend/uploads/products/
   # To frontend/public/images/products/
   ```

2. **Update database**
   ```javascript
   // Update all product images
   image: "/images/products/sword1.jpg"
   
   // Frontend will serve from:
   https://swordhub.vercel.app/images/products/sword1.jpg
   ```

---

### 6️⃣ **Build Failed on Vercel**

**Symptom:** Vercel deployment fails with build errors

**Common Issues:**

1. **Missing Dependencies**
   ```bash
   # Run locally first
   cd SwordHub-frontend
   npm install
   npm run build
   
   # If it builds locally, it should build on Vercel
   ```

2. **Environment Variables**
   ```
   Vercel → Settings → Environment Variables
   
   Add:
   VITE_API_URL = your-backend-url
   
   Then: Redeploy
   ```

3. **Node Version**
   ```
   Vercel uses Node 18 by default
   
   If you need different version:
   package.json:
   {
     "engines": {
       "node": "18.x"
     }
   }
   ```

---

### 7️⃣ **JWT Authentication Not Working**

**Symptom:** Can't login to admin panel

**Debug Steps:**

1. **Check JWT Secret**
   ```
   Railway → Variables → JWT_SECRET
   
   ⚠️ Must be at least 32 characters long
   ⚠️ Same secret for all instances
   ```

2. **Test Login Endpoint**
   ```bash
   curl -X POST https://your-backend.up.railway.app/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@swordhub.com","password":"your-password"}'
   
   ✅ Should return JWT token
   ```

3. **Check CORS for Credentials**
   ```php
   // Backend must have:
   header("Access-Control-Allow-Credentials: true");
   ```

---

### 8️⃣ **Railway App Sleeping**

**Symptom:** First request takes long time, then works fine

**Cause:** Railway free tier sleeps after 5 minutes of inactivity

**Solutions:**

1. **Use Cron Job (Free)**
   ```
   UptimeRobot (https://uptimerobot.com)
   - Pings your backend every 5 minutes
   - Keeps it awake
   - Free tier: 50 monitors
   ```

2. **Add Health Check**
   ```php
   // In backend root
   if ($_SERVER['REQUEST_URI'] === '/health') {
       echo json_encode(['status' => 'ok']);
       exit;
   }
   ```

---

## 🔍 **Debugging Tools**

### **Browser DevTools**
```
F12 → Network Tab
- See all API requests
- Check status codes
- View request/response headers
```

### **Railway Logs**
```
Railway Dashboard → Deployments → View Logs
- See PHP errors
- Database connection issues
- Application output
```

### **MongoDB Atlas Logs**
```
Atlas Dashboard → Metrics
- Connection attempts
- Query performance
- Storage usage
```

### **Test API with Postman**
```
Download: https://www.postman.com
Test each endpoint individually
```

---

## 📊 **Health Check URLs**

Add these to your monitoring:

```
Backend Health:
https://your-backend.up.railway.app/api/products

Frontend Health:
https://your-frontend.vercel.app/

Database Health:
Check in MongoDB Atlas → Metrics
```

---

## 🆘 **Still Having Issues?**

1. **Check Service Status**
   - Railway: https://railway.app/status
   - Vercel: https://www.vercel-status.com
   - MongoDB Atlas: https://status.mongodb.com

2. **Review Logs**
   - Railway: Deployment logs
   - Vercel: Build logs
   - Browser: Console (F12)

3. **Test Locally**
   ```bash
   # Backend
   cd SwordHub-backend
   php -S localhost:8000
   
   # Frontend
   cd SwordHub-frontend
   npm run dev
   
   # If it works locally but not deployed, it's a config issue
   ```

4. **Common Commands**
   ```bash
   # Clear Vercel cache
   vercel --prod --force
   
   # Trigger Railway redeploy
   git commit --allow-empty -m "Redeploy"
   git push
   
   # Check MongoDB connection
   mongo "mongodb+srv://your-connection-string"
   ```

---

## ✅ **Deployment Verification Checklist**

After fixing issues, verify:

```
□ Backend responds: https://backend.com/api/products
□ Frontend loads: https://frontend.com
□ Products display on homepage
□ Can add items to cart
□ Cart sidebar opens
□ Can proceed to checkout
□ Admin login works
□ Can create/edit products
□ Images display correctly
□ No console errors
□ No CORS errors
□ Database operations work
```

---

## 📞 **Get Help**

- Railway Discord: https://discord.gg/railway
- Vercel Support: https://vercel.com/support
- MongoDB Forums: https://www.mongodb.com/community/forums

---

**Remember:** Most deployment issues are configuration-related, not code issues!
