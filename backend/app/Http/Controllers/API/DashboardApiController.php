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

class DashboardApiController extends Controller
{
    public function stats()
    {
        $inventoryItems = InventoryItem::all();

        return response()->json([
            'total_employees' => Employee::count(),
            'total_customers' => Customer::count(),
            'total_suppliers' => Supplier::count(),
            'total_inventory_items' => $inventoryItems->count(),
            'inventory_value' => $inventoryItems->sum(fn ($item) => (float) $item->quantity * (float) $item->cost_price),
            'low_stock_items' => $inventoryItems
                ->filter(fn ($item) => (int) $item->quantity < (int) $item->reorder_level)
                ->count(),
            'pending_sales_orders' => SalesOrder::where('status', 'pending')->count(),
            'pending_purchase_orders' => PurchaseOrder::where('status', 'pending')->count(),
            'total_revenue' => SalesOrder::sum('total_amount'),
            'total_expenses' => FinanceEntry::where('type', 'expense')->sum('amount'),
        ]);
    }
}
