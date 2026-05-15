# MSIRMS - Modern ERP System (Restructured)

Welcome to MSIRMS! This project has been restructured into separate **Frontend** and **Backend** for independent, scalable deployment.

## 🎯 Project Overview

**MSIRMS** (Modern Supply & Inventory Resource Management System) is a complete ERP solution for managing:
- Customers & Suppliers
- Inventory & Stock Management
- Sales Orders & Purchase Orders
- Invoicing & Finance
- Employee & Department Management

---

## 📁 New Project Structure

```
msirms/
├── backend/                    # Laravel 12 API Server
│   ├── app/                   # Application logic
│   ├── config/                # Configuration
│   ├── database/              # Migrations, seeders, factories
│   ├── routes/                # API routes
│   ├── storage/               # File storage
│   ├── .env.example
│   ├── Dockerfile             # Docker container config
│   ├── vercel.json            # Vercel deployment
│   ├── render.yaml            # Render deployment
│   ├── DEPLOYMENT.md          # Backend deployment guide
│   └── composer.json
│
├── frontend/                   # React + Vite Web App
│   ├── resources/
│   │   ├── js/               # React components
│   │   └── css/              # Tailwind styles
│   ├── public/               # Static assets
│   ├── dist/                 # Production build (generated)
│   ├── .env.example
│   ├── Dockerfile            # Docker container config
│   ├── vercel.json           # Vercel deployment
│   ├── render.yaml           # Render deployment
│   ├── DEPLOYMENT.md         # Frontend deployment guide
│   └── package.json
│
├── DEPLOYMENT_SETUP.md       # Master deployment guide
├── docker-compose.yml        # Local development setup
├── README.md                 # Original README
├── QUICK_REFERENCE.md        # Quick commands
├── PROJECT_COMPLETION_SUMMARY.md
└── BUILDING_MODULES_GUIDE.md
```

---

## 🚀 Quick Start

### Option 1: Local Development (No Docker)

**Terminal 1 - Start Backend:**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
✅ Backend: `http://localhost:8000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend: `http://localhost:5173`

---

### Option 2: Docker Compose (Recommended)

```bash
# Start all services (MySQL, Backend, Frontend)
docker-compose up -d

# Run migrations
docker exec msirms-backend php artisan migrate
```

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`
- MySQL: `localhost:3306`

---

## 🌐 Deployment Options

### **Backend Deployment**
Choose one platform:

| Platform | Setup | Cost | Best For |
|----------|-------|------|----------|
| **Vercel** | `vercel --prod` | Free tier | Serverless, scales automatically |
| **Render** | Git-connected | Paid from $7/mo | Managed hosting, database included |
| **Docker** | `docker build` | Custom | Full control, any cloud provider |

📖 [Backend Deployment Guide →](./backend/DEPLOYMENT.md)

---

### **Frontend Deployment**
Choose one platform:

| Platform | Setup | Cost | Best For |
|----------|-------|------|----------|
| **Vercel** | `vercel --prod` | Free tier | Optimal for React, CDN-backed |
| **Render** | Git-connected | Free tier | Simple static hosting |
| **Netlify** | Git-connected | Free tier | Alternative static hosting |

📖 [Frontend Deployment Guide →](./frontend/DEPLOYMENT.md)

---

## 📋 Master Deployment Guide

For complete step-by-step instructions for all deployment combinations:

👉 **[DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)**

This includes:
- ✅ Environment variable setup
- ✅ Vercel + Vercel deployment
- ✅ Render + Render deployment
- ✅ Mixed deployments (Vercel + Render)
- ✅ Docker deployment
- ✅ CORS configuration
- ✅ Troubleshooting guide

---

## 🔧 Technology Stack

### Backend
- **PHP 8.2**
- **Laravel 12** - Modern web framework
- **MySQL 8.0** - Relational database
- **Laravel Sanctum** - API authentication
- **Inertia.js** - Component bridge

### Frontend
- **Node.js 18**
- **React 18** - UI library
- **Vite 7** - Next-gen build tool
- **Tailwind CSS 3** - Utility-first styling
- **Inertia.js** - Server-side routing
- **Headless UI** - Accessible components
- **Framer Motion** - Animations
- **Recharts** - Data visualization

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) | Master deployment guide for all platforms |
| [backend/DEPLOYMENT.md](./backend/DEPLOYMENT.md) | Backend-specific deployment (Vercel/Render) |
| [frontend/DEPLOYMENT.md](./frontend/DEPLOYMENT.md) | Frontend-specific deployment (Vercel/Render) |
| [README.md](./README.md) | Original project README |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Quick commands and URLs |
| [PROJECT_COMPLETION_SUMMARY.md](./PROJECT_COMPLETION_SUMMARY.md) | Features and completion status |
| [BUILDING_MODULES_GUIDE.md](./BUILDING_MODULES_GUIDE.md) | Guide to building React components |

---

## ⚙️ Development Commands

### Backend
```bash
cd backend

# Setup
composer install
php artisan migrate
php artisan db:seed

# Development
php artisan serve              # Start server
php artisan tinker            # Interactive shell
php artisan queue:listen      # Process jobs
php artisan pail --timeout=0  # Stream logs

# Testing
php artisan test              # Run tests
php artisan test --filter=UserTest

# Database
php artisan migrate           # Run migrations
php artisan migrate:rollback  # Undo migrations
php artisan db:seed           # Populate sample data
```

### Frontend
```bash
cd frontend

# Setup
npm install

# Development
npm run dev                    # Start dev server
npm run build                  # Create production build
npm run preview               # Preview production build

# Maintenance
npm run lint                  # Check code quality
npm audit                     # Check vulnerabilities
npm update                    # Update packages
```

---

## 🔑 Environment Setup

### Backend `.env`
```env
APP_NAME="MSIRMS"
APP_ENV=local
APP_DEBUG=true
APP_KEY=base64:YOUR_KEY_HERE
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=msirms
DB_USERNAME=root
DB_PASSWORD=
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env.local`
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=MSIRMS
```

---

## 🌍 Features

✅ **Complete Backend (100%)**
- 12 database tables with relationships
- 12 Eloquent models
- 9 web controllers
- 3 API controllers
- Full authentication (Sanctum)
- API documentation
- Database seeding

✅ **Frontend Components (40%)**
- Authentication system
- Inventory management module
- Dashboard with charts
- Responsive design
- Tailwind styling
- 7 modules in development

---

## 🚢 Deployment Checklist

### Backend
- [ ] `.env` configured with database credentials
- [ ] `APP_KEY` generated
- [ ] Database migrations tested locally
- [ ] All tests passing: `php artisan test`
- [ ] CORS configured for frontend domain
- [ ] Build successful: `composer install`

### Frontend
- [ ] `.env` configured with API URL
- [ ] `VITE_API_URL` points to deployed backend
- [ ] Build successful: `npm run build`
- [ ] No console errors: `npm run preview`
- [ ] API connection verified
- [ ] All pages load correctly

---

## 🆘 Troubleshooting

### Can't connect Backend to Frontend
1. Check `FRONTEND_URL` in backend `.env`
2. Verify CORS in `backend/config/cors.php`
3. Ensure backend API is running
4. Check browser console for errors

### Frontend can't reach API
1. Verify `VITE_API_URL` is correct
2. Check backend is deployed and running
3. Test API endpoint in Postman
4. Check network tab in DevTools

### Database errors
1. Verify MySQL is running
2. Check database credentials in `.env`
3. Run migrations: `php artisan migrate`
4. Seed data: `php artisan db:seed`

### Build fails
```bash
# Clean and rebuild
rm -rf node_modules vendor
npm install && composer install
npm run build
php artisan serve
```

---

## 💡 Best Practices

### Security
- ✅ Never commit `.env` files
- ✅ Use environment variables for secrets
- ✅ Keep dependencies updated
- ✅ Run `npm audit` and `composer audit`
- ✅ Use HTTPS in production

### Performance
- ✅ Build frontend in production mode
- ✅ Use CDN for static assets
- ✅ Optimize database queries
- ✅ Enable caching in Laravel
- ✅ Minify and compress assets

### Deployment
- ✅ Test locally before deploying
- ✅ Use environment-specific `.env` files
- ✅ Run database migrations on deployment
- ✅ Monitor logs and errors
- ✅ Set up automated backups

---

## 🤝 Contributing

1. Create feature branches from `main`
2. Follow PSR-12 (PHP) and ESLint (JS) standards
3. Write tests for new features
4. Update documentation
5. Submit pull request for review

---

## 📞 Support

For deployment and setup help:
1. Check [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)
2. Review [backend/DEPLOYMENT.md](./backend/DEPLOYMENT.md) or [frontend/DEPLOYMENT.md](./frontend/DEPLOYMENT.md)
3. Check original docs: [README.md](./README.md)
4. Review error logs in deployment platform

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) file

---

## ✨ Next Steps

1. **Review Structure** - Familiarize yourself with the new layout
2. **Setup Locally** - Follow "Quick Start" section
3. **Deploy Backend** - Choose Vercel or Render, follow [backend guide](./backend/DEPLOYMENT.md)
4. **Deploy Frontend** - Choose platform, follow [frontend guide](./frontend/DEPLOYMENT.md)
5. **Monitor & Maintain** - Check logs and performance

---

**Happy Deploying! 🚀**
