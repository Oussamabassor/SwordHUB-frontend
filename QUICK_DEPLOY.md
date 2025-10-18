# 🚀 Quick Deployment Steps

## Prerequisites
- [ ] GitHub account
- [ ] MongoDB Atlas account (free)
- [ ] Railway account (free)
- [ ] Vercel account (free)

---

## Part 1: Database (5 minutes)

1. **MongoDB Atlas**
   ```
   → Sign up: https://www.mongodb.com/cloud/atlas/register
   → Create M0 (FREE) cluster
   → Create database user
   → Whitelist all IPs (0.0.0.0/0)
   → Get connection string
   ```

2. **Save this info:**
   ```
   MongoDB URI: mongodb+srv://username:password@cluster.mongodb.net/dbname
   Database Name: swordhub
   ```

---

## Part 2: Backend (10 minutes)

1. **Push to GitHub** (if not already)
   ```bash
   cd SwordHub-backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/swordhub-backend.git
   git push -u origin main
   ```

2. **Deploy to Railway**
   ```
   → Go to: https://railway.app
   → Sign in with GitHub
   → New Project → Deploy from GitHub
   → Select: swordhub-backend repository
   → Wait for deployment
   ```

3. **Add Environment Variables in Railway**
   ```
   Variables Tab → Add All:
   
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/swordhub
   DB_NAME = swordhub
   JWT_SECRET = your-super-secret-key-minimum-32-characters-long
   CORS_ORIGIN = https://your-frontend.vercel.app
   APP_ENV = production
   ```

4. **Get Backend URL**
   ```
   Railway gives you: https://swordhub-backend-production.up.railway.app
   SAVE THIS URL!
   ```

---

## Part 3: Frontend (5 minutes)

1. **Update API URL**
   ```bash
   cd SwordHub-frontend
   
   # Create production env file
   echo "VITE_API_URL=https://your-backend-url.up.railway.app" > .env.production
   ```

2. **Push to GitHub** (if not already)
   ```bash
   git init
   git add .
   git commit -m "Initial frontend commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/swordhub-frontend.git
   git push -u origin main
   ```

3. **Deploy to Vercel**
   ```
   → Go to: https://vercel.com
   → Sign in with GitHub
   → Add New → Project
   → Import: swordhub-frontend
   → Framework: Vite
   → Add Environment Variable:
     VITE_API_URL = your-railway-backend-url
   → Deploy
   ```

4. **Get Frontend URL**
   ```
   Vercel gives you: https://swordhub.vercel.app
   ```

---

## Part 4: Update CORS (2 minutes)

1. **Go back to Railway**
   ```
   → Your backend project
   → Variables
   → Edit CORS_ORIGIN
   → Set to: https://swordhub.vercel.app
   → Save & Redeploy
   ```

---

## Part 5: Test Everything (5 minutes)

1. **Test Backend**
   ```bash
   # In browser or Postman
   https://your-backend.up.railway.app/api/products
   
   ✅ Should return JSON data
   ```

2. **Test Frontend**
   ```
   → Visit: https://your-frontend.vercel.app
   → Check browser console (F12)
   → Test features:
     ✅ Products display
     ✅ Add to cart
     ✅ Cart sidebar
     ✅ Checkout
   ```

---

## 🎉 YOU'RE LIVE!

**Your URLs:**
- Frontend: `https://swordhub.vercel.app`
- Backend: `https://swordhub-backend.up.railway.app`
- Database: MongoDB Atlas

**Free Resources Used:**
- ✅ Vercel: 100GB bandwidth/month
- ✅ Railway: $5 credit/month
- ✅ MongoDB: 512MB storage

---

## ⚠️ Important Notes

### **Images/Uploads Issue**
Free hosting doesn't support persistent file storage for uploads.

**Quick Solutions:**

**Option 1: Use Cloudinary (Recommended)**
- Sign up: https://cloudinary.com (25GB free)
- Upload all product images
- Get URLs and update database
- Update backend to use Cloudinary API for new uploads

**Option 2: Keep Images in Frontend**
- Move images to `/SwordHub-frontend/public/images/products/`
- Update database URLs to use frontend domain
- Images will be served from Vercel CDN

### **Admin Panel**
Make sure to test:
- ✅ Login with admin credentials
- ✅ Add/Edit/Delete products
- ✅ View orders
- ✅ Category management

---

## 🔧 Common First-Time Issues

1. **CORS Error**
   - Check Railway CORS_ORIGIN matches Vercel URL
   - Redeploy backend after changing

2. **API Not Found (404)**
   - Verify VITE_API_URL in Vercel environment variables
   - Check if backend is running (Railway dashboard)

3. **Database Connection Failed**
   - Check MongoDB IP whitelist includes 0.0.0.0/0
   - Verify connection string is correct

4. **Images Not Loading**
   - Migrate to Cloudinary or
   - Move images to frontend public folder

---

## 📞 Need Help?

Check the full deployment guide: `DEPLOYMENT_GUIDE.md`

---

**Estimated Total Time: 30 minutes**
**Cost: $0 (100% FREE)**

Good luck! 🚀
