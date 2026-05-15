# Frontend Deployment Guide

## Overview
The frontend is a React application built with Vite that communicates with the Laravel backend API. It can be deployed to:
- **Vercel** - Static hosting + serverless functions
- **Render** - Static site hosting
- **Netlify** - Alternative static hosting

---

## Prerequisites

### Vercel
- Vercel account (https://vercel.com)
- Vercel CLI: `npm i -g vercel`

### Render
- Render account (https://render.com)
- GitHub repository with frontend code

---

## Deploying to Vercel

### Step 1: Configure Environment
1. Copy `.env.example` to `.env.production.local`
2. Update API URL:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

### Step 2: Deploy
```bash
cd frontend
vercel --prod
```

### Step 3: Set Production Environment Variables
In Vercel dashboard:
1. Go to project Settings → Environment Variables
2. Add `VITE_API_URL` for production
3. Redeploy if needed

---

## Deploying to Render

### Step 1: Prepare Repository
1. Push frontend code to GitHub
2. Create `render.yaml` in frontend root (already provided)

### Step 2: Create Static Site on Render
1. Go to Render.com dashboard
2. Click "New +"
3. Select "Static Site"
4. Connect your GitHub repository
5. Select the `frontend` directory

### Step 3: Configure Build
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### Step 4: Set Environment Variables
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Project Structure

```
frontend/
├── node_modules/          # Dependencies
├── public/                # Static files
├── resources/
│   ├── css/              # Tailwind CSS
│   └── js/
│       ├── app.jsx       # React entry point
│       ├── pages/        # Page components
│       └── components/   # Reusable components
├── dist/                 # Build output (created after npm run build)
├── .env.example          # Environment template
├── package.json          # Dependencies & scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS config
└── jsconfig.json         # JavaScript config
```

---

## Available Scripts

```bash
# Development server
npm run dev          # Starts Vite dev server on localhost:5173

# Production build
npm run build        # Creates optimized build in dist/

# Preview production build locally
npm run preview      # Runs preview server on localhost:4173
```

---

## Environment Variables

Create `.env.local` or `.env.production.local`:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api        # For development
VITE_API_URL=https://your-backend.com/api     # For production

# App Configuration
VITE_APP_NAME=MSIRMS
```

---

## Building for Deployment

### Local Build Test
```bash
cd frontend
npm run build
npm run preview
```

This creates an optimized `dist/` folder that's ready for deployment.

---

## Connecting to Backend

### Development
1. Ensure backend is running on `http://localhost:8000`
2. Update `.env.local`:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```
3. Run: `npm run dev`

### Production
1. Update environment variable in your host platform
2. Backend must be accessible at the configured API URL
3. CORS should be configured in Laravel backend

---

## Troubleshooting

### CORS Errors
Backend must have proper CORS configuration. In `config/cors.php`:
```php
'allowed_origins' => ['https://your-frontend-domain.com'],
'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
```

### Build Fails
```bash
# Clear dependencies and rebuild
rm -rf node_modules
npm install
npm run build
```

### Environment Variables Not Loading
- Ensure `.env` file exists with `VITE_` prefix
- Restart dev server after changing `.env`
- For Vercel/Render: Set variables in dashboard, then redeploy

### API Connection Issues
- Check `VITE_API_URL` is correct
- Verify backend is running and accessible
- Check browser console for CORS errors
- Verify API authentication tokens if needed

---

## Performance Tips

1. **Code Splitting**: Vite automatically splits code for optimal loading
2. **Image Optimization**: Place images in `public/` directory
3. **CSS Purging**: Tailwind automatically removes unused styles in production
4. **Monitoring**: Use Vercel/Render analytics for performance metrics

---

## Local Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in browser
```

Development server includes hot module replacement (HMR) for instant updates.
