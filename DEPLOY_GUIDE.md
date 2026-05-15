# Deploy Frontend on Vercel + Backend on Render

Complete step-by-step guide for production deployment.

---

## 📋 Prerequisites

You'll need:
- ✅ GitHub account (code repository)
- ✅ Vercel account (https://vercel.com)
- ✅ Render account (https://render.com)
- ✅ Git installed locally
- ✅ Code pushed to GitHub

---

## 🔧 STEP 1: Push Your Code to GitHub

### Create a GitHub Repository

1. Go to https://github.com/new
2. Create repository: `msirms` (or your name)
3. **Don't** initialize with README
4. Click "Create repository"

### Push Your Code

```bash
cd d:\miras\msirms

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: MSIRMS with separated frontend and backend"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/msirms.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Done!** Your code is now on GitHub.

---

## 🚀 STEP 2: Deploy Backend on Render

### Step 2A: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (easier)
3. Authorize GitHub access

### Step 2B: Create Database (MySQL)

1. Click **"New +"** → **"MySQL"**
2. Configure:
   - **Name:** `msirms-db`
   - **Database Name:** `msirms`
   - **Username:** `msirms_user`
   - **Region:** Select closest to you
   - **Plan:** Starter (free tier)
3. Click **"Create Database"**
4. ⏳ Wait 2-3 minutes for database to provision
5. Copy connection details (save them):
   - **Internal Database URL** (you'll need this)

### Step 2C: Create Backend Web Service

1. Click **"New +"** → **"Web Service"**
2. Click **"Connect repository"** or paste URL:
   - `https://github.com/YOUR_USERNAME/msirms`
3. Select your repository
4. Configure:
   - **Name:** `msirms-backend`
   - **Branch:** `main`
   - **Runtime:** `PHP 8.2`
   - **Build Command:** `composer install`
   - **Start Command:** `php artisan serve --host=0.0.0.0 --port=$PORT`

5. Click **"Create Web Service"**

### Step 2D: Add Environment Variables to Backend

In Render dashboard for `msirms-backend`:

1. Go to **"Environment"** tab
2. Add each variable:

```
APP_NAME=MSIRMS
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_URL=https://msirms-backend.onrender.com

DB_CONNECTION=mysql
DB_HOST=mysql connection host from Step 2B
DB_PORT=3306
DB_DATABASE=msirms
DB_USERNAME=msirms_user
DB_PASSWORD=your_database_password
DB_SSL_MODE=REQUIRED

FRONTEND_URL=https://msirms-frontend.vercel.app
SANCTUM_STATEFUL_DOMAINS=msirms-frontend.vercel.app
SESSION_DOMAIN=msirms-frontend.vercel.app
```

**Important:** Get `APP_KEY` from your local `.env`:
```bash
cd backend
php artisan key:generate --force
# Copy the key from .env
```

3. Click **"Save"**

### Step 2E: Deploy Backend

1. Render automatically deploys when you push to GitHub
2. Watch the deployment in **"Logs"** tab
3. ⏳ Wait for "Deploy successful" message
4. Copy your backend URL: `https://msirms-backend.onrender.com`

---

## 🎨 STEP 3: Deploy Frontend on Vercel

### Step 3A: Import Project

1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Paste: `https://github.com/YOUR_USERNAME/msirms`
5. Click **"Import"**

### Step 3B: Configure Frontend

In the import dialog:

1. **Project Name:** `msirms-frontend`
2. **Framework:** Select **"Vite"**
3. **Root Directory:** `frontend`
4. Click **"Continue"**

### Step 3C: Add Environment Variables

Before deploying, add your backend URL:

1. **Environment Variables** section:
   ```
   VITE_API_URL=https://msirms-backend.onrender.com/api
   ```

2. Click **"Deploy"**
3. ⏳ Wait for deployment to complete
4. You'll get: `https://msirms-frontend.vercel.app`

---

## ✅ STEP 4: Verify Deployment

### Check Backend is Running

```bash
# Open in browser
https://msirms-backend.onrender.com/api

# Should show: Unauthorized (or JSON response)
```

### Check Frontend is Running

```bash
# Open in browser
https://msirms-frontend.vercel.app

# Should load your React app
```

### Test API Connection

1. Open frontend: `https://msirms-frontend.vercel.app`
2. Open browser DevTools: **F12** → **Console**
3. Check for CORS errors
4. Try logging in (should connect to backend)

---

## 🐛 Troubleshooting

### Backend Won't Start

Check Render logs:
1. Go to Render dashboard → `msirms-backend`
2. Click **"Logs"** tab
3. Look for errors

**Common issues:**
- Missing environment variables
- Database connection failed
- APP_KEY not set

**Fix:**
```bash
# Copy all env vars from backend/.env.example
# Paste them in Render dashboard
# Redeploy
```

### Frontend Can't Connect to Backend

**Check:**
1. Is backend URL correct in `VITE_API_URL`?
2. Is backend actually running?
3. CORS configured in backend?

**Fix in backend `.env` on Render:**
```
FRONTEND_URL=https://msirms-frontend.vercel.app
```

### CORS Errors

**In backend `config/cors.php`:**
```php
'allowed_origins' => [
    'https://msirms-frontend.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
],
```

**Redeploy backend** after changes.

---

## 📱 After Deployment

### Update Your App

When you make changes:

```bash
# Backend changes
cd backend
git add .
git commit -m "Backend updates"
git push origin main
# Render auto-deploys

# Frontend changes
cd frontend
git add .
git commit -m "Frontend updates"
git push origin main
# Vercel auto-deploys
```

### Monitor & Logs

**Vercel:**
- Dashboard → Project → Deployments
- View real-time logs

**Render:**
- Dashboard → Service → Logs
- Real-time deployment logs

---

## 🔑 Final Checklist

### Backend (Render)
- [ ] Database created and running
- [ ] All environment variables set
- [ ] APP_KEY generated
- [ ] Backend service deployed
- [ ] Logs show "Server running"
- [ ] API endpoint accessible

### Frontend (Vercel)
- [ ] Project imported
- [ ] Root directory set to `frontend`
- [ ] VITE_API_URL set correctly
- [ ] Deployment successful
- [ ] App loads in browser
- [ ] Can connect to backend

### Integration
- [ ] Frontend can reach backend API
- [ ] No CORS errors
- [ ] Authentication works
- [ ] Database reads/writes work

---

## 🎉 You're Done!

Your app is now live:
- **Frontend:** https://msirms-frontend.vercel.app
- **Backend API:** https://msirms-backend.onrender.com/api

Share your URLs with others!

---

## 💡 Pro Tips

1. **Use custom domains** (optional)
   - Vercel: Add domain in project settings
   - Render: Add domain in service settings

2. **Set up monitoring**
   - Vercel: Built-in analytics
   - Render: Check logs regularly

3. **Auto-deploy from GitHub**
   - Both platforms watch your repo
   - Changes push automatically = redeploy

4. **Keep secrets safe**
   - Never commit `.env` files
   - Use dashboard for secrets
   - GitHub → Vercel/Render auto-syncs

5. **Scale when needed**
   - Vercel: Automatic scaling
   - Render: Upgrade plan as needed

---

## 📞 Need Help?

- **Vercel Issues:** Check Vercel documentation
- **Render Issues:** Check Render documentation  
- **CORS Issues:** Review backend `config/cors.php`
- **Database Issues:** Check Render database logs

Good luck! 🚀
