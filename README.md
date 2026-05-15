# MSIRMS - Micro/Small Industry Resource Management System

A comprehensive, production-ready resource management system built with **Laravel 12**, **React 18**, **Inertia.js**, and **MySQL**. This full-stack application is designed to manage micro and small industries with modules for inventory, employees, suppliers, customers, finance, and more.

**Built for Learning:** This project implements the complete Laravel curriculum covering MVC architecture, routing, controllers, views, validation, database design, Eloquent ORM, REST APIs, and best practices.

---

## 🚀 Features

### Core Modules
- ✅ **Inventory Management** - Track products, SKUs, stock levels, cost/selling prices
- ✅ **Employee Management** - Manage departments, employees, roles, and salary information
- ✅ **Supplier Management** - Maintain supplier contacts and details
- ✅ **Purchase Orders** - Create and track POs with status management (pending, confirmed, delivered, cancelled)
- ✅ **Customer Management** - Maintain customer database and contacts
- ✅ **Sales Orders** - Create and track sales orders with invoicing
- ✅ **Finance Tracking** - Income/expense tracking and financial summaries
- ✅ **Dashboard** - KPI dashboard with key metrics and monthly financial data

### Technical Features
- 🔐 **Authentication** - Laravel Breeze with React scaffolding
- 🔑 **API Authentication** - Sanctum token-based API protection
- ✏️ **Full CRUD Operations** - Create, read, update, delete for all resources
- 📊 **REST API** - Documented API endpoints with JSON responses
- 🗄️ **Database Relationships** - Proper Eloquent relationships with foreign keys
- ✅ **Form Validation** - Server-side and client-side validation
- 🎯 **Resource Controllers** - RESTful routing conventions
- 🎨 **Responsive UI** - Built with Tailwind CSS and React

---

## 📋 Requirements

- **PHP** 8.2 or higher
- **Node.js** 18.x or higher
- **Composer** (for PHP dependencies)
- **npm** (for Node dependencies)
- **MySQL** 5.7+ or SQLite (included with Laravel)

---

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/msirms.git
cd msirms
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Install Node Dependencies
```bash
npm install
```

### 4. Environment Configuration
```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` file to configure database:
```env
# For MySQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=msirms
DB_USERNAME=root
DB_PASSWORD=

# Or use SQLite (default)
DB_CONNECTION=sqlite
```

### 5. Database Setup
```bash
# Run migrations
php artisan migrate

# Seed database with sample data
php artisan db:seed
```

### 6. Build Frontend Assets
```bash
npm run build
```

### 7. Start Development Server
```bash
# Terminal 1 - Laravel server
php artisan serve

# Terminal 2 - Vite dev server (for hot reload)
npm run dev
```

Access the application at `http://localhost:8000`

**Default Login Credentials:**
- Email: `admin@example.com`
- Password: `password`

---

## 📁 Project Structure

```
msirms/
├── app/
│   ├── Http/
│   │   ├── Controllers/           # Web controllers (CRUD operations)
│   │   │   ├── DepartmentController.php
│   │   │   ├── EmployeeController.php
│   │   │   ├── InventoryController.php
│   │   │   ├── SupplierController.php
│   │   │   ├── PurchaseOrderController.php
│   │   │   ├── CustomerController.php
│   │   │   ├── SalesOrderController.php
│   │   │   ├── FinanceController.php
│   │   │   ├── DashboardController.php
│   │   │   └── API/                # REST API controllers
│   │   │       ├── InventoryApiController.php
│   │   │       ├── EmployeeApiController.php
│   │   │       └── DashboardApiController.php
│   │   └── Middleware/
│   ├── Models/                    # Eloquent models (12 models)
│   │   ├── Department.php
│   │   ├── Employee.php
│   │   ├── InventoryItem.php
│   │   ├── StockMovement.php
│   │   ├── Supplier.php
│   │   ├── PurchaseOrder.php
│   │   ├── PurchaseOrderItem.php
│   │   ├── Customer.php
│   │   ├── SalesOrder.php
│   │   ├── SalesOrderItem.php
│   │   ├── FinanceEntry.php
│   │   └── Invoice.php
│   └── Mail/                      # Mailable classes (notifications)
│
├── database/
│   ├── migrations/                # Database schema (12 migrations)
│   ├── factories/                 # Model factories for seeding
│   └── seeders/                   # Database seeders
│
├── resources/
│   ├── js/
│   │   ├── Pages/                 # React page components
│   │   │   ├── Inventory/
│   │   │   │   ├── Index.jsx
│   │   │   │   ├── Create.jsx
│   │   │   │   └── Edit.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── Layouts/               # Layout components
│   │   └── Components/            # Reusable components
│   └── views/
│       └── app.blade.php          # Root Blade template
│
├── routes/
│   ├── web.php                    # Web routes (resource routes)
│   ├── api.php                    # API routes (Sanctum protected)
│   └── channels.php               # Broadcasting routes
│
├── public/build/                  # Compiled assets
├── config/                        # Configuration files
├── storage/                       # Logs and cache
├── .env.example                   # Environment template
├── composer.json                  # PHP dependencies
├── package.json                   # Node dependencies
├── vite.config.js                 # Vite configuration
└── README.md                      # This file
```

---

## 🗄️ Database Schema

The system includes 12 core tables with proper relationships:

**Master Tables:**
- Departments
- Suppliers
- Customers

**Transaction Tables:**
- InventoryItems
- StockMovements
- PurchaseOrders & PurchaseOrderItems
- SalesOrders & SalesOrderItems

**Operational Tables:**
- Employees
- FinanceEntries
- Invoices

---

## 🔌 REST API Endpoints

### Authentication
All API endpoints require Sanctum token authentication:
```bash
curl -H "Authorization: Bearer {token}" http://localhost:8000/api/v1/inventory
```

### Available Endpoints
```
GET    /api/v1/inventory              # List all inventory (paginated)
POST   /api/v1/inventory              # Create new item
GET    /api/v1/inventory/{id}         # Get single item
PUT    /api/v1/inventory/{id}         # Update item
DELETE /api/v1/inventory/{id}         # Delete item

GET    /api/v1/employees              # List all employees (paginated)
POST   /api/v1/employees              # Create new employee
GET    /api/v1/employees/{id}         # Get single employee
PUT    /api/v1/employees/{id}         # Update employee
DELETE /api/v1/employees/{id}         # Delete employee

GET    /api/v1/dashboard/stats        # Get KPI statistics
```

---

## 🔌 Web Routes

All web routes are protected by `auth` and `verified` middleware:

```
/departments       # CRUD for departments
/employees         # CRUD for employees
/inventory         # CRUD for inventory items
/suppliers         # CRUD for suppliers
/purchase-orders   # CRUD for purchase orders
/customers         # CRUD for customers
/sales-orders      # CRUD for sales orders
/finance           # CRUD for finance entries
/dashboard         # Analytics & KPIs
```

---

## 🧪 Development Workflow

### Running in Development Mode
```bash
# Terminal 1 - Start Laravel development server
php artisan serve

# Terminal 2 - Start Vite development server (hot reload)
npm run dev
```

### Building for Production
```bash
npm run build
```

### Database Management
```bash
php artisan migrate              # Run migrations
php artisan migrate:rollback     # Rollback migrations
php artisan db:seed              # Seed database
php artisan migrate:refresh --seed  # Reset database
```

### Cache Clearing
```bash
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan config:clear
```

---

## 🛡️ Authentication & Authorization

### User Authentication
- Built with Laravel Breeze
- Session-based authentication for web
- Email verification enabled
- Password reset functionality

### API Authentication
- Uses Laravel Sanctum for token-based auth
- Add `Authorization: Bearer {token}` header to API requests

---

## 🎯 Curriculum Implementation

| Unit | Topics | Implementation |
|------|--------|-----------------|
| I | MVC Architecture | Resource controllers + Blade + React views |
| II | Routing & Responses | RESTful routes, named routes, resource routing |
| III | Controllers & Views | Resource controllers for all modules |
| IV | URL Generation & Request Data | Helper functions, validation, request handling |
| V | Form Validation | Server & client-side validation rules |
| VI | Database & Eloquent | Migrations, models, relationships, seeders |

---

## 📝 Usage Examples

### Web - Create Inventory Item
1. Navigate to `/inventory`
2. Click "Add Item"
3. Fill form and submit

### API - Create Inventory Item
```bash
curl -X POST http://localhost:8000/api/v1/inventory \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Widget A",
    "sku": "WID-001",
    "category": "Hardware",
    "unit": "pieces",
    "quantity": 100,
    "reorder_level": 20,
    "cost_price": 10.00,
    "sell_price": 25.00
  }'
```

---

## 🚀 Deployment

### Production Checklist
- [ ] Set `APP_DEBUG=false` in .env
- [ ] Run `composer install --optimize-autoloader --no-dev`
- [ ] Run `npm run build`
- [ ] Set up MySQL database
- [ ] Configure email service
- [ ] Set up SSL/HTTPS
- [ ] Run migrations: `php artisan migrate --force`
- [ ] Cache config: `php artisan config:cache`

### Deployment Platforms
- Laravel Forge
- DigitalOcean
- AWS
- Heroku
- Traditional VPS (Apache/Nginx)

---

## 🐛 Troubleshooting

### Common Issues

**Vite manifest not found**
```bash
npm run build
npm run dev
```

**Database connection error**
```bash
# Check .env DATABASE settings
# Ensure MySQL is running (for SQLite, check storage/database.sqlite exists)
```

**Class not found**
```bash
composer dumpautoload
php artisan cache:clear
```

---

## 🔐 Security

- Environment variables never committed
- API tokens stored securely
- HTTPS enforced in production
- Server-side input validation
- CSRF protection enabled
- SQL injection prevention (Eloquent)
- Password hashing with bcrypt

---

## 📚 Learning Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Inertia.js Docs](https://inertiajs.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and open a Pull Request

---

**Happy coding! 🚀**

Last Updated: 2024
Built with ❤️ for learning Laravel
