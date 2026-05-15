# Deploy on Render + Vercel with MongoDB Atlas

Complete step-by-step guide for production deployment using **MongoDB Atlas**.

---

## ✨ **What's New?**

✅ **MongoDB Atlas** - Cloud-hosted, no setup needed  
✅ **Simpler** - No local database to manage  
✅ **Faster** - No Docker database container  
✅ **Free tier** - 512MB included  
✅ **Same backend code** - Already updated!  

---

## 📋 Prerequisites

You need:
- ✅ GitHub account with code pushed
- ✅ Vercel account (https://vercel.com)
- ✅ Render account (https://render.com)
- ✅ MongoDB Atlas account (https://www.mongodb.com/cloud/atlas) - NEW!
- ✅ Code already on GitHub: https://github.com/hargunkaur28/miras.git ✅

---

## 🚀 STEP 1: Set Up MongoDB Atlas

### Step 1A: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"**
3. Sign up with email
4. Create a new project:
   - **Project Name:** `msirms`
   - Click **"Create Project"**

### Step 1B: Create a Cluster

1. Click **"Build a Database"**
2. Select **"M0 Shared"** (Free tier)
3. Configure:
   - **Cloud Provider:** Choose closest (AWS, Google Cloud, Azure)
   - **Region:** Pick closest to you
4. Click **"Create"**
5. ⏳ Wait 2-3 minutes for cluster to deploy

### Step 1C: Create Database User

1. Go to **"Database Access"** tab
2. Click **"Add New Database User"**
3. Configure:
   - **Authentication Method:** Password
   - **Username:** `admin`
   - **Password:** Generate strong password (copy it!)
   - **Built-in Roles:** `Atlas admin`
4. Click **"Add User"**

### Step 1D: Get Connection String

1. Go to **"Database"** tab
2. Click **"Connect"** on your cluster
3. Select **"Drivers"**
4. Choose **"PHP"**
5. Copy the connection string:
   ```
   mongodb+srv://admin:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
   *(Replace PASSWORD with your actual password)*
6. **Keep this safe!** You'll need it in Render

---

## 🚀 STEP 2: Deploy Backend on Render

### Step 2A: Create Backend Web Service

1. Go to https://render.com (sign in)
2. Click **"New +"** → **"Web Service"**
3. Select **"Deploy an existing repository"**
4. Paste: `https://github.com/hargunkaur28/miras`
5. Click **"Connect"**
6. Configure:
   - **Name:** `msirms-backend`
   - **Branch:** `main`
   - **Runtime:** `Docker`
   - **Root Directory:** `backend`
7. Click **"Create Web Service"** (don't add env vars yet)

### Step 2B: Add Environment Variables

In Render dashboard for `msirms-backend`:

1. Go to **"Environment"** tab
2. Add these variables:

```
APP_NAME=MSIRMS
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:N0M2EzhDK/amhK8TQS9halWy5Upz5mOqyZxebVpaxD8=
APP_URL=https://msirms-backend.onrender.com

DB_CONNECTION=mongodb
DB_CONNECTION_STRING=mongodb+srv://admin:YOUR_PASSWORD@cluster.mongodb.net/msirms?retryWrites=true&w=majority

FRONTEND_URL=https://msirms-frontend.vercel.app
SANCTUM_STATEFUL_DOMAINS=msirms-frontend.vercel.app
SESSION_DOMAIN=msirms-frontend.vercel.app
```

**Replace:**
- `YOUR_PASSWORD` - With your MongoDB Atlas password
- `cluster.mongodb.net` - Your actual cluster connection string

3. Click **"Save"**
4. Render will auto-redeploy ✅

### Step 2C: Verify Backend is Running

1. Wait for deployment to complete (check Logs tab)
2. Backend URL: `https://msirms-backend.onrender.com`
3. API URL: `https://msirms-backend.onrender.com/api`

---

## 🎨 STEP 3: Deploy Frontend on Vercel

### Step 3A: Import GitHub Repository

1. Go to https://vercel.com (sign in)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Paste: `https://github.com/hargunkaur28/miras`
5. Click **"Import"**

### Step 3B: Configure Frontend

In the import wizard:

1. **Project Name:** `msirms-frontend`
2. **Framework Preset:** Select **"Vite"**
3. **Root Directory:** `frontend`
4. **Build & Development Settings:** (keep defaults)

### Step 3C: Add Environment Variables

In the **"Environment Variables"** section:

Add this variable:
```
VITE_API_URL=https://msirms-backend.onrender.com/api
```

5. Click **"Deploy"**
6. ⏳ Wait for deployment (usually 1-2 minutes)
7. Frontend URL: `https://msirms-frontend.vercel.app` (or custom name)

---

## ✅ STEP 4: Update Backend .env for Local Development

Your local `.env` now uses MongoDB. Set it up:

1. Open `backend/.env`
2. Update database section:

```env
DB_CONNECTION=mongodb
DB_CONNECTION_STRING=mongodb+srv://admin:YOUR_PASSWORD@cluster.mongodb.net/msirms?retryWrites=true&w=majority
```

3. Replace `YOUR_PASSWORD` with your MongoDB Atlas password

---

## 🔗 STEP 5: Verify Everything Works

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

## 🗄️ STEP 6: View MongoDB Data

### Via MongoDB Atlas UI

1. Go to MongoDB Atlas dashboard
2. Click your cluster
3. Click **"Browse Collections"**
4. View all data in real-time

### Via DBeaver (Optional)

1. Download **DBeaver Community** (free): https://dbeaver.io/
2. Create new MongoDB connection:
   - **Connection URL:** Your MongoDB Atlas connection string
3. Browse collections and data

---

## 🔍 Troubleshooting

### Backend deployment fails

**Check Render logs:**
1. Render dashboard → `msirms-backend` → **Logs**
2. Look for errors

**Common issues:**

| Error | Solution |
|-------|----------|
| `Failed to connect to database` | Check DB_CONNECTION_STRING in env vars |
| `APP_KEY not set` | Add APP_KEY to env vars |
| `Connection timeout` | Check MongoDB Atlas IP allowlist (should be 0.0.0.0/0 for testing) |
| `MongoException` | Database name might be wrong in connection string |

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

**MongoDB:**
- Atlas Dashboard → Metrics
- Monitor database performance and usage

---

## 🎯 Final Checklist

### MongoDB Atlas
- [ ] Account created
- [ ] Cluster deployed (M0 free tier)
- [ ] Database user created (admin)
- [ ] Connection string copied
- [ ] IP allowlist configured

### Backend (Render)
- [ ] Web Service created
- [ ] All environment variables set
- [ ] APP_KEY added
- [ ] DB_CONNECTION_STRING correct
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
- **MongoDB:** MongoDB Atlas cloud (automatic backups)

---

## 💡 Pro Tips

1. **MongoDB Atlas Free Tier**
   - 512MB storage
   - 100 connections
   - Adequate for MVP/demo
   - Upgrade anytime to paid tier

2. **Backups**
   - MongoDB Atlas: Automatic daily snapshots
   - Vercel: Built-in version history
   - Render: Automatic logs and monitoring

3. **Security**
   - Keep DB_CONNECTION_STRING secret
   - Use strong MongoDB password
   - Configure IP allowlist in MongoDB (optional)
   - Never commit secrets to GitHub

4. **Scaling**
   - MongoDB: Upgrade to M2/M5 tier ($9-99/month)
   - Render: Upgrade plan for more compute
   - Vercel: Automatic scaling (always free)

5. **Monitoring**
   - MongoDB Atlas: Built-in monitoring
   - Render: Check logs for errors
   - Vercel: Analytics dashboard

---

## 🆘 Need Help?

**Common Documentation:**
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Laravel MongoDB](https://laravel-mongodb.com/)

**MongoDB + Laravel:**
```bash
# Query example (in your Laravel code)
$users = User::all();
$invoice = Invoice::find($id);
```

Models work exactly like regular Eloquent - no code changes needed!

---

## ✨ You're All Set!

Your app is now live with:
- ✅ Separate frontend & backend repos
- ✅ MongoDB Atlas database (cloud-hosted)
- ✅ Auto-deployment from GitHub
- ✅ Production-ready setup
- ✅ Zero database maintenance

**Next:** Monitor performance and add features! 🎉

---

## 🔄 What Changed from PostgreSQL?

| Aspect | PostgreSQL | MongoDB |
|--------|-----------|---------|
| **Setup** | Required local/cloud database | Automatic cloud (Atlas) |
| **Connection** | TCP socket | Connection string URL |
| **Migrations** | File-based SQL migrations | Schemaless (optional migrations) |
| **Code Changes** | None (Laravel Eloquent) | None (works as-is) |
| **Backups** | Manual setup | Automatic daily |
| **Free Tier** | Limited | 512MB generous |

**Your code works the same!** MongoDB driver is a drop-in replacement for Laravel.
