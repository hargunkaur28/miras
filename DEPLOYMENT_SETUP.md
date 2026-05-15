# MSIRMS - Separated Frontend & Backend

## 📋 Project Structure

This project has been restructured into separate frontend and backend directories for independent deployment:

```
msirms/
├── backend/              # Laravel API (Deploy to Vercel or Render)
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── .env.example
│   ├── Dockerfile
│   ├── vercel.json
│   ├── render.yaml
│   ├── DEPLOYMENT.md
│   └── composer.json
├── frontend/             # React + Vite (Deploy to Vercel or Render)
│   ├── resources/
│   ├── public/
│   ├── .env.example
│   ├── Dockerfile
│   ├── vercel.json
│   ├── render.yaml
│   ├── DEPLOYMENT.md
│   └── package.json
├── DEPLOYMENT_SETUP.md   # This file
└── [Documentation files]
```

---

## 🚀 Quick Start

### Development (Local)

**Terminal 1 - Backend:**
```bash
cd backend
composer install
php artisan migrate
php artisan serve
```
Backend runs on: `http://localhost:8000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

### Deployment Options

## **Option 1: Deploy Backend to Vercel + Frontend to Vercel**

### Backend (Vercel)
```bash
cd backend
vercel --prod
```

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

**Pros:** Same platform, easy integration, free tier available
**Cost:** Vercel free tier includes both

---

## **Option 2: Deploy Backend to Render + Frontend to Render**

### Backend (Render)
1. Push to GitHub
2. Create Web Service on Render
3. Select `backend` directory
4. Add MySQL database
5. Configure environment variables

### Frontend (Render)
1. Push to GitHub
2. Create Static Site on Render
3. Select `frontend` directory
4. Build command: `npm install && npm run build`
5. Publish directory: `dist`

**Pros:** All-in-one platform, database included
**Cost:** Requires paid plan for always-on backend

---

## **Option 3: Mixed (Backend on Render + Frontend on Vercel)**

Combine the best of both platforms:
- **Backend**: Render (dedicated hosting)
- **Frontend**: Vercel (fast static delivery)

---

## 📚 Detailed Guides

- **[Backend Deployment](./backend/DEPLOYMENT.md)** - Vercel & Render setup
- **[Frontend Deployment](./frontend/DEPLOYMENT.md)** - Vercel & Render setup

---

## 🔧 Environment Configuration

### Backend Environment Variables

Create `.env` in `/backend`:
```env
APP_NAME="MSIRMS"
APP_ENV=production
APP_KEY=your-key-here
APP_DEBUG=false
APP_URL=https://your-backend-url.com

DB_CONNECTION=mysql
DB_HOST=your-database-host
DB_PORT=3306
DB_DATABASE=msirms
DB_USERNAME=db_user
DB_PASSWORD=db_password

FRONTEND_URL=https://your-frontend-url.com
```

### Frontend Environment Variables

Create `.env.production.local` in `/frontend`:
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_APP_NAME=MSIRMS
```

---

## 🔗 API Communication

The frontend communicates with the backend via REST API.

### Configure API URL

**Frontend** (`/frontend/.env`):
```env
VITE_API_URL=https://your-backend-domain.com/api
```

**Backend CORS** (`/backend/config/cors.php`):
```php
'allowed_origins' => ['https://your-frontend-domain.com'],
```

---

## 📦 Technologies

### Backend
- **PHP 8.2**
- **Laravel 12**
- **MySQL**
- **Sanctum** (API authentication)

### Frontend
- **Node.js 18**
- **React 18**
- **Vite**
- **Tailwind CSS**
- **Inertia.js**

---

## 🚢 Deployment Checklist

### Before Deploying Backend
- [ ] Generate `APP_KEY`: `php artisan key:generate`
- [ ] Test locally: `php artisan serve`
- [ ] Database migrations ready
- [ ] Environment variables configured
- [ ] CORS settings configured
- [ ] All tests passing: `php artisan test`

### Before Deploying Frontend
- [ ] `VITE_API_URL` configured correctly
- [ ] Build successful: `npm run build`
- [ ] Test build: `npm run preview`
- [ ] No console errors
- [ ] API connection verified

---

## 🐛 Troubleshooting

### Backend Won't Connect to Frontend
- Verify `FRONTEND_URL` in backend `.env`
- Check CORS configuration in `config/cors.php`
- Ensure backend is running and accessible
- Check browser console for CORS errors

### Frontend Can't Reach API
- Verify `VITE_API_URL` is correct
- Check backend is deployed and running
- Verify environment variables are set
- Check network tab for API requests

### Database Connection Failed
- Verify database credentials in `.env`
- Ensure database is running and accessible
- Run migrations: `php artisan migrate`

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules vendor
npm install && composer install
npm run build
```

---

## 📖 Original Documentation

- **[README.md](./README.md)** - Project overview
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Common commands
- **[PROJECT_COMPLETION_SUMMARY.md](./PROJECT_COMPLETION_SUMMARY.md)** - Feature list
- **[BUILDING_MODULES_GUIDE.md](./BUILDING_MODULES_GUIDE.md)** - Frontend development

---

## 📝 Next Steps

1. **Configure environments** - Set up `.env` files
2. **Deploy backend** - Follow [backend guide](./backend/DEPLOYMENT.md)
3. **Deploy frontend** - Follow [frontend guide](./frontend/DEPLOYMENT.md)
4. **Test connection** - Verify API communication
5. **Monitor** - Set up logging and monitoring

---

## 💡 Tips

- Use `render.yaml` for Render deployments
- Use `vercel.json` for Vercel deployments
- Use `Dockerfile` for Docker deployments
- Keep environment secrets in platform dashboards, not in code
- Test locally before deploying to production

---

## 🆘 Need Help?

Refer to deployment-specific guides:
- [Backend Deployment Guide](./backend/DEPLOYMENT.md)
- [Frontend Deployment Guide](./frontend/DEPLOYMENT.md)
