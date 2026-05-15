# Backend Deployment Guide

## Overview
The backend is a Laravel 12 API server that can be deployed to:
- **Vercel** - Serverless PHP functions
- **Render** - Managed PHP hosting with MySQL database

---

## Prerequisites

### Vercel
- Vercel account (https://vercel.com)
- Vercel CLI: `npm i -g vercel`

### Render
- Render account (https://render.com)
- GitHub repository with backend code

---

## Deploying to Vercel

### Step 1: Prepare Environment Variables
1. Copy `.env.example` to `.env.local`
2. Generate APP_KEY: `php artisan key:generate`
3. Update database and API settings

### Step 2: Deploy
```bash
cd backend
vercel --prod
```

### Step 3: Set Environment Variables in Vercel Dashboard
1. Go to your project settings
2. Add environment variables:
   - `APP_KEY` - From your local `.env`
   - `DB_HOST` - Your database host
   - `DB_DATABASE` - Your database name
   - `DB_USERNAME` - Your database user
   - `DB_PASSWORD` - Your database password
   - `FRONTEND_URL` - Your frontend URL

---

## Deploying to Render

### Step 1: Connect Repository
1. Push your code to GitHub
2. Go to Render.com dashboard
3. Click "New +"
4. Select "Web Service"
5. Connect your GitHub repository
6. Select the `backend` directory

### Step 2: Configure Service
- **Name**: `msirms-backend`
- **Runtime**: PHP 8.2
- **Build Command**: `composer install`
- **Start Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`

### Step 3: Add Database (MySQL)
1. Create new MySQL database on Render
2. Get connection credentials
3. Add environment variables (see below)

### Step 4: Set Environment Variables
In Render dashboard, add:
```
APP_ENV=production
APP_DEBUG=false
APP_KEY=your-generated-key
DB_CONNECTION=mysql
DB_HOST=your-render-db-host
DB_DATABASE=msirms
DB_USERNAME=render_user
DB_PASSWORD=your-db-password
FRONTEND_URL=https://your-frontend-domain.com
```

---

## Database Migration

After deployment, run migrations:

### Vercel (one-time)
```bash
vercel env pull
php artisan migrate --force
```

### Render
1. Go to service logs
2. Migrations run automatically on deploy if configured

---

## API Endpoints

Once deployed, your API will be available at:
- **Vercel**: `https://your-project.vercel.app/api`
- **Render**: `https://your-project.render.com/api`

Configure your frontend `.env` with:
```
VITE_API_URL=https://your-backend-url/api
```

---

## Troubleshooting

### Vercel Issues
- Check logs: `vercel logs`
- PHP extensions: Verify `php.ini` is correct
- Database connection: Test credentials in `.env.local`

### Render Issues
- Check service logs in dashboard
- Verify database is running
- Ensure migrations complete successfully

---

## Local Development

### Run Backend Locally
```bash
cd backend
composer install
php artisan serve
```

Backend runs on: `http://localhost:8000`

### Run Frontend Locally
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

Configure frontend `.env.local`:
```
VITE_API_URL=http://localhost:8000/api
```
