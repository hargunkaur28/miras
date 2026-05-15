# Building Additional Modules - Template Guide

This guide shows you how to continue building the remaining modules following the established patterns.

## 📋 Table of Contents
1. [Completed Example](#completed-example-inventory)
2. [React Component Template](#react-component-template)
3. [Module Checklist](#module-checklist)
4. [Common Patterns](#common-patterns)

---

## ✅ Completed Example: Inventory

Use this as your reference for building other modules.

### 1. Backend Files Already Done ✅
- `app/Http/Controllers/InventoryController.php` - Full CRUD logic
- `app/Models/InventoryItem.php` - Model with relationships
- `database/migrations/...create_inventory_items_table.php` - Schema
- `database/factories/InventoryItemFactory.php` - Test data
- `routes/web.php` - Resource route defined
- `routes/api.php` - API endpoints defined

### 2. Frontend Files to Create
- `resources/js/Pages/Inventory/Index.jsx` ✅ Done
- `resources/js/Pages/Inventory/Create.jsx` ✅ Done
- `resources/js/Pages/Inventory/Edit.jsx` ✅ Done
- `resources/js/Pages/Inventory/Show.jsx` - Optional (detail page)

---

## 🎨 React Component Template

### Index.jsx - List All Records

```jsx
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ items }) {
    return (
        <AuthenticatedLayout>
            <Head title="Inventory Items" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Inventory Items</h2>
                                <Link 
                                    href={route('inventory.create')} 
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Add Item
                                </Link>
                            </div>

                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Name</th>
                                        <th className="px-4 py-2 text-left">SKU</th>
                                        <th className="px-4 py-2 text-left">Quantity</th>
                                        <th className="px-4 py-2 text-left">Price</th>
                                        <th className="px-4 py-2 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.data?.map(item => (
                                        <tr key={item.id} className="border-t hover:bg-gray-50">
                                            <td className="px-4 py-2">{item.name}</td>
                                            <td className="px-4 py-2">{item.sku}</td>
                                            <td className="px-4 py-2">{item.quantity}</td>
                                            <td className="px-4 py-2">${item.sell_price}</td>
                                            <td className="px-4 py-2">
                                                <Link 
                                                    href={route('inventory.edit', item.id)}
                                                    className="text-blue-600 hover:underline mr-4"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => deleteItem(item.id)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="mt-4 flex justify-center">
                                {items.links?.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url}
                                        className={`mx-1 px-3 py-1 rounded ${
                                            link.active ? 'bg-blue-600 text-white' : 'bg-gray-200'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
```

### Create.jsx - New Record Form

```jsx
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('module.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add New Item" />
            
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-bold mb-6">Add New Item</h2>
                            
                            <form onSubmit={submit} className="space-y-4">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Name</label>
                                    <input 
                                        type="text" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                    />
                                    {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Email</label>
                                    <input 
                                        type="email" 
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                    />
                                    {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Phone</label>
                                    <input 
                                        type="tel" 
                                        value={data.phone} 
                                        onChange={e => setData('phone', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                    />
                                    {errors.phone && <div className="text-red-600 text-sm">{errors.phone}</div>}
                                </div>

                                {/* Address Field */}
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Address</label>
                                    <textarea 
                                        value={data.address} 
                                        onChange={e => setData('address', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                        rows="3"
                                    />
                                    {errors.address && <div className="text-red-600 text-sm">{errors.address}</div>}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        Create
                                    </button>
                                    <Link 
                                        href={route('module.index')}
                                        className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
```

### Edit.jsx - Update Record Form

```jsx
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ item }) {
    const { data, setData, patch, errors, processing } = useForm({
        name: item.name || '',
        email: item.email || '',
        phone: item.phone || '',
        address: item.address || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('module.update', item.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit: ${item.name}`} />
            
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-bold mb-6">Edit Item</h2>
                            
                            <form onSubmit={submit} className="space-y-4">
                                {/* Same fields as Create.jsx but with PATCH method */}
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Name</label>
                                    <input 
                                        type="text" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                    />
                                    {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                                </div>

                                {/* Email, Phone, Address fields... */}

                                <div className="flex gap-4 pt-4">
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        Update
                                    </button>
                                    <Link 
                                        href={route('module.index')}
                                        className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
```

---

## ✅ Module Checklist

When building a new module, follow this checklist:

### Backend (Already Done ✅)
- [x] Migration file created and executed
- [x] Model class created with relationships
- [x] Factory class created
- [x] Controller class created with full CRUD
- [x] Routes defined (resource route)
- [x] API routes defined (if needed)

### Frontend (What You'll Create)
- [ ] Create `resources/js/Pages/ModuleName/` folder
- [ ] Create `Index.jsx` - List page
- [ ] Create `Create.jsx` - New item form
- [ ] Create `Edit.jsx` - Edit item form
- [ ] (Optional) Create `Show.jsx` - Detail page

### Testing
- [ ] Test Index page loads
- [ ] Test Create form submits
- [ ] Test Edit form updates
- [ ] Test Delete removes item
- [ ] Test API endpoints (if created)

---

## 🔄 Common Patterns

### Form Fields Pattern

```jsx
<div>
    <label className="block text-gray-700 font-bold mb-2">Field Name</label>
    <input 
        type="text"
        value={data.fieldName}
        onChange={e => setData('fieldName', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded"
    />
    {errors.fieldName && <div className="text-red-600 text-sm">{errors.fieldName}</div>}
</div>
```

### Select Dropdown Pattern

```jsx
<div>
    <label className="block text-gray-700 font-bold mb-2">Select Option</label>
    <select 
        value={data.supplierId}
        onChange={e => setData('supplierId', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded"
    >
        <option value="">Choose an option</option>
        {suppliers.map(supplier => (
            <option key={supplier.id} value={supplier.id}>
                {supplier.name}
            </option>
        ))}
    </select>
    {errors.supplierId && <div className="text-red-600 text-sm">{errors.supplierId}</div>}
</div>
```

### Table Rows Pattern

```jsx
{items.data?.map(item => (
    <tr key={item.id} className="border-t hover:bg-gray-50">
        <td className="px-4 py-2">{item.name}</td>
        <td className="px-4 py-2">{item.email}</td>
        <td className="px-4 py-2">
            <Link href={route('module.edit', item.id)} className="text-blue-600">Edit</Link>
            <button onClick={() => deleteItem(item.id)} className="text-red-600 ml-4">Delete</button>
        </td>
    </tr>
))}
```

### Delete Function Pattern

```jsx
const deleteItem = (id) => {
    if (confirm('Are you sure?')) {
        router.delete(route('module.destroy', id));
    }
};
```

---

## 📚 Remaining Modules to Build

### 1. Employees
- Fields: first_name, last_name, email, phone, role, salary, hire_date
- Related to: Department
- Components: Index, Create, Edit

### 2. Departments
- Fields: name, description
- Related to: Employees
- Components: Index, Create, Edit

### 3. Suppliers
- Fields: name, contact_person, email, phone, address, city, country
- Related to: PurchaseOrders
- Components: Index, Create, Edit

### 4. Customers
- Fields: name, contact_person, email, phone, address, city, country
- Related to: SalesOrders
- Components: Index, Create, Edit

### 5. Purchase Orders
- Fields: supplier_id, po_number, status, total_amount, order_date, expected_delivery_date
- Related to: Supplier, PurchaseOrderItems
- Components: Index, Create, Edit

### 6. Sales Orders
- Fields: customer_id, so_number, status, total_amount, order_date, expected_delivery_date
- Related to: Customer, SalesOrderItems, Invoice
- Components: Index, Create, Edit

### 7. Finance
- Fields: type, category, amount, description, transaction_date
- No relations (summary only)
- Components: Index, Create, Edit (with Income/Expense toggle)

### 8. Dashboard
- Shows KPI cards and charts
- Uses: DashboardApiController data
- Components: Dashboard.jsx with Recharts

---

## 💾 File Locations Reference

```
Module: Employees

Controller:    app/Http/Controllers/EmployeeController.php ✅ Done
Model:         app/Models/Employee.php ✅ Done
Migration:     database/migrations/.../create_employees_table.php ✅ Done
Factory:       database/factories/EmployeeFactory.php ✅ Done
Routes:        routes/web.php (resource route) ✅ Done

Pages to create:
Index:         resources/js/Pages/Employees/Index.jsx
Create:        resources/js/Pages/Employees/Create.jsx
Edit:          resources/js/Pages/Employees/Edit.jsx
```

---

## 🎯 Next Step

1. Choose a module from the list above
2. Create the folder: `resources/js/Pages/ModuleName/`
3. Create `Index.jsx` using the template above
4. Test by navigating to the page
5. Create `Create.jsx` and `Edit.jsx`
6. Move to the next module

**Good luck! Follow the patterns, and you'll have a complete system in no time!** 🚀
