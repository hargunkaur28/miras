<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SalesOrderController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'online',
        'message' => 'Backend is working',
        'database' => DB::connection()->getDatabaseName() ?? 'Disconnected'
    ]);
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Admin & Settings
    Route::resource('departments', DepartmentController::class);
    Route::post('departments/import', [DepartmentController::class, 'import'])->name('departments.import');
    
    // Human Resources
    Route::resource('employees', EmployeeController::class);
    Route::post('employees/import', [EmployeeController::class, 'import'])->name('employees.import');
    
    // Inventory Management
    Route::resource('inventory', InventoryController::class);
    Route::post('inventory/import', [InventoryController::class, 'import'])->name('inventory.import');
    
    // Supplier Management
    Route::resource('suppliers', SupplierController::class);
    Route::post('suppliers/import', [SupplierController::class, 'import'])->name('suppliers.import');
    Route::resource('purchase-orders', PurchaseOrderController::class);
    Route::post('purchase-orders/import', [PurchaseOrderController::class, 'import'])->name('purchase-orders.import');
    
    // Sales Management
    Route::resource('customers', CustomerController::class);
    Route::post('customers/import', [CustomerController::class, 'import'])->name('customers.import');
    Route::resource('sales-orders', SalesOrderController::class);
    Route::post('sales-orders/import', [SalesOrderController::class, 'import'])->name('sales-orders.import');
    
    // Finance & Reporting
    Route::resource('finance', FinanceController::class);
    Route::post('finance/import', [FinanceController::class, 'import'])->name('finance.import');
    
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Super Admin Only
    Route::middleware(['super_admin'])->prefix('super-admin')->name('super-admin.')->group(function () {
        Route::resource('businesses', \App\Http\Controllers\SuperAdmin\BusinessController::class);
        Route::post('businesses/{business}/toggle-status', [\App\Http\Controllers\SuperAdmin\BusinessController::class, 'toggleStatus'])->name('businesses.toggle-status');
    });
});

require __DIR__.'/auth.php';
