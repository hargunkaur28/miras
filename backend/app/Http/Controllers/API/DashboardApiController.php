<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\InventoryItem;
use App\Models\SalesOrder;
use App\Models\PurchaseOrder;
use App\Models\Customer;
use App\Models\Supplier;
use App\Models\FinanceEntry;
use Illuminate\Support\Facades\DB;

class DashboardApiController extends Controller
{
    public function stats()
    {
        return response()->json([
            'total_employees' => Employee::count(),
            'total_customers' => Customer::count(),
            'total_suppliers' => Supplier::count(),
            'total_inventory_items' => InventoryItem::count(),
            'inventory_value' => InventoryItem::sum(DB::raw('quantity * cost_price')),
            'low_stock_items' => InventoryItem::whereRaw('quantity < reorder_level')->count(),
            'pending_sales_orders' => SalesOrder::where('status', 'pending')->count(),
            'pending_purchase_orders' => PurchaseOrder::where('status', 'pending')->count(),
            'total_revenue' => SalesOrder::sum('total_amount'),
            'total_expenses' => FinanceEntry::where('type', 'expense')->sum('amount'),
        ]);
    }
}
