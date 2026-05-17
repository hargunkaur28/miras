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

**Happy coding! 🚀**

Last Updated: 2024
Built with ❤️ for learning Laravel
