# MSIRMS - Developer Quick Reference

## 🚀 Quick Start Commands

```bash
# First time setup
cd d:\miras\msirms
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed

# Development
php artisan serve           # Terminal 1: Backend at localhost:8000
npm run dev                 # Terminal 2: Frontend with hot reload

# Production
npm run build
php artisan config:cache
```

## 📝 Login Credentials

- **Email:** admin@example.com
- **Password:** password

## 🌐 Key URLs

```
Web Interface:     http://localhost:8000
Inventory:         http://localhost:8000/inventory
Employees:         http://localhost:8000/employees
Departments:       http://localhost:8000/departments
Dashboard:         http://localhost:8000/dashboard
API Base:          http://localhost:8000/api/v1
```

## 📚 Project Structure

```
Controllers:       app/Http/Controllers/
Models:           app/Models/
Migrations:       database/migrations/
Factories:        database/factories/
Seeders:          database/seeders/
React Pages:      resources/js/Pages/
Routes:           routes/web.php, routes/api.php
Config:           config/
```

## 🔌 API Endpoints

```bash
# Get inventory list
GET /api/v1/inventory
Headers: Authorization: Bearer {token}

# Get employees list
GET /api/v1/employees
Headers: Authorization: Bearer {token}

# Get dashboard stats
GET /api/v1/dashboard/stats
Headers: Authorization: Bearer {token}
```

## ✏️ Common Development Tasks

### Create New Resource
```bash
# Create controller
php artisan make:controller ModuleController --resource

# Create model with migration
php artisan make:model Module -m

# Create factory
php artisan make:factory ModuleFactory --model=Module
```

### Create New React Page
```
1. Create folder: resources/js/Pages/ModuleName/
2. Create Index.jsx, Create.jsx, Edit.jsx
3. Import in web.php using Inertia::render()
```

### Add Database Table
```bash
# Create migration
php artisan make:migration create_modules_table

# Edit migration in database/migrations/
php artisan migrate
```

## 🗄️ Database Tables

- departments
- employees
- inventory_items
- stock_movements
- suppliers
- purchase_orders
- purchase_order_items
- customers
- sales_orders
- sales_order_items
- finance_entries
- invoices

## 🎨 React Component Pattern

```jsx
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function IndexPage({ items }) {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
    });

    return (
        <AuthenticatedLayout>
            <Head title="Page Title" />
            {/* Your component JSX */}
        </AuthenticatedLayout>
    );
}
```

## 🔐 Authentication

```php
// In controller
if (Auth::check()) {
    $user = Auth::user();
}

// In React
const { auth } = usePage().props;
```

## 📤 Form Handling

```jsx
// React component
const { data, setData, post, errors, processing } = useForm({
    name: '',
    email: '',
});

const submit = (e) => {
    e.preventDefault();
    post(route('module.store'));
};
```

## 🔄 Common Routes

```
Resource routes automatically create:
- GET    /module          → index
- GET    /module/create   → create
- POST   /module          → store
- GET    /module/{id}     → show
- GET    /module/{id}/edit → edit
- PUT    /module/{id}     → update
- DELETE /module/{id}     → destroy
```

## 📊 Database Seeders

```bash
# Seed only UserSeeder
php artisan db:seed --class=UserSeeder

# Refresh and seed
php artisan migrate:refresh --seed

# Seed production (with confirmation)
php artisan db:seed --force
```

## 🧹 Cache Commands

```bash
php artisan cache:clear          # Clear all cache
php artisan route:clear          # Clear route cache
php artisan view:clear           # Clear view cache
php artisan config:clear         # Clear config cache
php artisan cache:forget {key}   # Clear specific cache
```

## 🐛 Debugging

```php
// Dump and die
dd($variable);

// Dump multiple
dump($var1, $var2);

// Log to storage/logs/laravel.log
Log::info('Message', ['key' => 'value']);
```

## 📦 Dependency Updates

```bash
# Check outdated packages
composer outdated
npm outdated

# Update packages
composer update
npm update

# Update specific package
composer update vendor/package
npm install package@latest
```

## 🚀 Deployment Commands

```bash
# Pre-deployment
php artisan config:cache
php artisan route:cache
php artisan view:cache
composer install --no-dev --optimize-autoloader

# Post-deployment
php artisan migrate --force
php artisan cache:clear
php artisan queue:restart (if using queues)
```

## 📝 File Locations

```
Environment config:     .env
Database:              storage/database.sqlite
Logs:                  storage/logs/
Cache:                 storage/framework/cache/
Compiled views:        bootstrap/cache/
Public assets:         public/build/
```

## 🔍 Useful Artisan Commands

```bash
php artisan --version              # Show version
php artisan list                   # Show all commands
php artisan tinker                 # Interactive shell
php artisan make:request Name      # Create form request
php artisan make:model Name -m     # Create model with migration
php artisan queue:work             # Start queue worker
php artisan storage:link           # Link storage
```

## 🎯 Testing Commands

```bash
# Run tests
php artisan test

# Run specific test
php artisan test --filter=TestName

# Run with coverage
php artisan test --coverage
```

## 💡 Performance Tips

```bash
# Cache configuration
php artisan config:cache

# Optimize composer autoloader
composer dump-autoload --optimize

# Clear and rebuild cache
php artisan cache:clear
php artisan config:cache
php artisan route:cache
```

## 🔗 Links Reference

- **Laravel Docs:** https://laravel.com/docs
- **Laravel API:** https://laravel.com/api/12.x
- **Inertia Docs:** https://inertiajs.com
- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com/docs

## 📋 Model Relationships

```
Department      → has many Employees
Employee        → belongs to Department
InventoryItem   → has many StockMovements
Supplier        → has many PurchaseOrders
PurchaseOrder   → has many PurchaseOrderItems
Customer        → has many SalesOrders
SalesOrder      → has many SalesOrderItems, has one Invoice
```

## ✅ Development Checklist

- [ ] Migrations created and run
- [ ] Models created with relationships
- [ ] Controllers created with CRUD
- [ ] Routes defined in routes files
- [ ] React components created
- [ ] Forms validated
- [ ] API endpoints tested
- [ ] Database seeded with test data
- [ ] Frontend builds successfully
- [ ] All tests pass

---

**For more detailed information, see README.md and PROJECT_COMPLETION_SUMMARY.md**
