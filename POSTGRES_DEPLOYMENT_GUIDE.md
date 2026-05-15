# Deploy on Render (PostgreSQL) + Vercel - Updated Guide

Complete step-by-step guide for production deployment with **PostgreSQL on Render**.

---

## 🔄 **What Changed?**

✅ Now using **PostgreSQL** instead of MySQL  
✅ Simpler 1-click setup on Render  
✅ Better for production  
✅ Still 100% compatible with your Laravel app  

---

## 📋 Prerequisites

You need:
- ✅ GitHub account with code pushed
- ✅ Vercel account (https://vercel.com)
- ✅ Render account (https://render.com)
- ✅ Code already on GitHub: https://github.com/hargunkaur28/miras.git ✅

---

## 🚀 STEP 1: Deploy Backend on Render

### Step 1A: Create PostgreSQL Database

1. Go to https://render.com (sign in)
2. Click **"New +"**
3. Select **"PostgreSQL"** (not MySQL - it's listed directly!)
4. Configure:
   - **Name:** `msirms-db`
   - **Database:** `msirms` (auto-filled)
   - **User:** `postgres` (default)
   - **Region:** Pick closest to you
   - **Version:** Latest stable
   - **Plan:** Starter (free tier)
5. Click **"Create Database"**
6. ⏳ Wait 2-3 minutes for database to start
7. Copy the **Internal Database URL** (save it!)
   - Example: `postgresql://postgres:xxxx@dpg-xxx.render.internal:5432/msirms`

### Step 1B: Create Backend Web Service

1. Click **"New +"** → **"Web Service"**
2. Select **"Deploy an existing repository"**
3. Paste: `https://github.com/hargunkaur28/miras`
4. Click **"Connect"**
5. Configure:
   - **Name:** `msirms-backend`
   - **Branch:** `main`
   - **Runtime:** `PHP 8.2`
   - **Build Command:** `composer install`
   - **Start Command:** `php artisan serve --host=0.0.0.0 --port=$PORT`
   - **Root Directory:** `backend`

6. Click **"Create Web Service"** (don't add env vars yet)

### Step 1C: Get APP_KEY

Generate a new APP_KEY:

```bash
cd d:\miras\msirms\backend
php artisan key:generate --force
```

Open `backend/.env` and copy the `APP_KEY` value (the long base64 string after `base64:`).

### Step 1D: Add Environment Variables to Backend

In Render dashboard for `msirms-backend`:

1. Go to **"Environment"** tab
2. Add each variable:

```
APP_NAME=MSIRMS
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:YOUR_KEY_HERE
APP_URL=https://msirms-backend.onrender.com

DB_CONNECTION=pgsql
DB_HOST=dpg-xxx.render.internal
DB_PORT=5432
DB_DATABASE=msirms
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_SSLMODE=require

FRONTEND_URL=https://msirms-frontend.vercel.app
SANCTUM_STATEFUL_DOMAINS=msirms-frontend.vercel.app
SESSION_DOMAIN=msirms-frontend.vercel.app
```

**Where to find these values:**
- **APP_KEY:** From step 1C above
- **DB_HOST, DB_PASSWORD:** From PostgreSQL connection details in Render
- **DB_USERNAME:** `postgres` (default)
- **DB_PORT:** `5432` (PostgreSQL default)

3. Click **"Save"**
4. Render will redeploy automatically ✅

### Step 1E: Verify Backend is Running

1. Wait for deployment to complete (check Logs tab)
2. You should see: "Server running on [::]:8000"
3. Backend URL: `https://msirms-backend.onrender.com`

---

## 🎨 STEP 2: Deploy Frontend on Vercel

### Step 2A: Import GitHub Repository

1. Go to https://vercel.com (sign in)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Paste: `https://github.com/hargunkaur28/miras`
5. Click **"Import"**

### Step 2B: Configure Frontend

In the import wizard:

1. **Project Name:** `msirms-frontend`
2. **Framework Preset:** Select **"Vite"**
3. **Root Directory:** `frontend`
4. **Build & Development Settings:** (keep defaults)

### Step 2C: Add Environment Variables

In the **"Environment Variables"** section:

Add this variable:
```
VITE_API_URL=https://msirms-backend.onrender.com/api
```

(Replace with your actual Render backend URL)

5. Click **"Deploy"**
6. ⏳ Wait for deployment (usually 1-2 minutes)
7. Frontend URL: `https://msirms-frontend.vercel.app` (or custom name)

---

## ✅ STEP 3: Update Backend .env for Local Development

Your local `.env` now uses PostgreSQL. Set it up:

1. Open `backend/.env`
2. Update database section:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=msirms
DB_USERNAME=postgres
DB_PASSWORD=your_local_postgres_password
```

3. If you don't have PostgreSQL locally, install it:
   - Download: https://www.postgresql.org/download/
   - Or use Docker: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:latest`

---

## 🔗 STEP 4: Verify Everything Works

### Test Backend API

```bash
# Open in browser
https://msirms-backend.onrender.com/api

# Should show API response (Unauthorized or JSON)
```

### Test Frontend

```bash
# Open in browser
https://msirms-frontend.vercel.app

# Should load your React app
```

### Test Connection

1. Open frontend in browser
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Try logging in
5. Check Network tab for API calls
6. Should see API calls to your Render backend

---

## 🔍 Troubleshooting

### Backend deployment fails

**Check Render logs:**
1. Render dashboard → `msirms-backend` → **Logs**
2. Look for errors

**Common issues:**

| Error | Solution |
|-------|----------|
| `SQLSTATE[HY000]` | Database credentials wrong |
| `APP_KEY not set` | Add APP_KEY to env vars |
| `Port already in use` | Render assigns $PORT automatically |
| `Permission denied` | Check DB_SSLMODE=require is set |

### Frontend can't reach backend

**Check:**
1. Is `VITE_API_URL` correct?
   ```bash
   # In browser console, run:
   console.log(import.meta.env.VITE_API_URL)
   ```
2. Is backend actually running?
3. Check browser DevTools → Network tab for API calls

**Fix:**
1. Update `VITE_API_URL` in Vercel env vars
2. Redeploy Vercel project

### CORS Errors

**In backend `config/cors.php`, update:**
```php
'allowed_origins' => [
    'https://msirms-frontend.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

**Then push to GitHub:**
```bash
git add .
git commit -m "Update CORS for Vercel domain"
git push
```

Render will auto-redeploy.

---

## 📱 After Deployment

### Make Updates

Any time you update code:

```bash
# Make changes
git add .
git commit -m "Your message"
git push origin main
```

**Both platforms auto-deploy!**
- Backend: Render redeploys automatically
- Frontend: Vercel redeploys automatically

### Monitor

**Vercel:**
- Dashboard → Project → Deployments
- View logs in real-time

**Render:**
- Dashboard → Service → Logs
- View deployment progress

---

## 🎯 Final Checklist

### Backend (Render)
- [ ] PostgreSQL database created
- [ ] Web Service created
- [ ] All environment variables set
- [ ] APP_KEY added
- [ ] DB_PASSWORD matches PostgreSQL credentials
- [ ] Deployment successful (check logs)
- [ ] Backend URL accessible

### Frontend (Vercel)
- [ ] Project imported from GitHub
- [ ] Root directory set to `frontend`
- [ ] VITE_API_URL set to your backend URL
- [ ] Deployment successful
- [ ] Frontend loads in browser
- [ ] API calls work

### Integration
- [ ] Frontend can reach backend API
- [ ] No CORS errors in console
- [ ] Authentication works
- [ ] Database reads/writes work

---

## 🚀 Your Live URLs

Once deployed:
- **Frontend:** https://msirms-frontend.vercel.app
- **Backend API:** https://msirms-backend.onrender.com/api
- **Database:** PostgreSQL on Render (internal)

---

## 💡 Pro Tips

1. **Use Render's PostgreSQL UI**
   - Render dashboard → Database → Open in browser
   - Query builder, backups, logs

2. **Auto-scaling**
   - Vercel: Automatic
   - Render: Upgrade plan if needed

3. **Custom Domains**
   - Vercel: Settings → Domains
   - Render: Service → Custom Domain

4. **Monitor Performance**
   - Vercel analytics built-in
   - Render: Check service metrics

5. **Backups**
   - Render PostgreSQL: Automatic daily
   - Vercel: Built-in version history

---

## 🆘 Need Help?

**Common Documentation:**
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [PostgreSQL with Laravel](https://laravel.com/docs/database)

**Issues?**
1. Check platform logs first
2. Verify environment variables
3. Test locally before deploying

---

## ✨ You're All Set!

Your app is now live with:
- ✅ Separate frontend & backend repos
- ✅ PostgreSQL database on Render
- ✅ Auto-deployment from GitHub
- ✅ Production-ready setup

**Next:** Monitor performance and add features! 🎉
