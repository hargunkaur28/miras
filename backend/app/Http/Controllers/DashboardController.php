<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\InventoryItem;
use App\Models\SalesOrder;
use App\Models\PurchaseOrder;
use App\Models\Customer;
use App\Models\Supplier;
use App\Models\FinanceEntry;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        if ($user->isSuperAdmin()) {
            $stats = [
                'total_businesses' => \App\Models\Business::count(),
                'active_businesses' => \App\Models\Business::where('is_active', true)->count(),
                'total_employees' => Employee::count(), // Global
                'total_customers' => Customer::count(), // Global
                'total_suppliers' => Supplier::count(), // Global
                'total_revenue' => SalesOrder::sum('total_amount'), // Global platform revenue
                'total_expenses' => FinanceEntry::where('type', 'expense')->sum('amount'),
                'total_inventory_items' => InventoryItem::count(),
            ];

            try {
                $monthlyData = FinanceEntry::whereYear('entry_date', date('Y'))
                    ->get()
                    ->groupBy(function($entry) {
                        return date('Y-m', strtotime($entry->entry_date));
                    })
                    ->map(function($items, $month) {
                        return [
                            'month' => $month,
                            'type' => $items->first()->type,
                            'total' => $items->sum('amount')
                        ];
                    })
                    ->values();
            } catch (\Throwable $e) {
                $monthlyData = collect([]);
            }

            return Inertia::render('Dashboard', [
                'stats' => $stats,
                'monthlyData' => $monthlyData,
                'isSuperAdmin' => true
            ]);
        }

        // Business Admin Stats (Scoped by business_id automatically via Trait if applied, 
        // but here we might need manual scoping if Trait isn't on all models yet)
        // Find most recent available month for demo purposes
        $latestEntry = SalesOrder::orderBy('ordered_at', 'desc')->first();
        $targetYear = $latestEntry ? date('Y', strtotime($latestEntry->ordered_at)) : date('Y');
        $targetMonth = $latestEntry ? date('m', strtotime($latestEntry->ordered_at)) : date('m');

        // Financial Trends based on target month
        $thisMonthRevenue = SalesOrder::whereYear('ordered_at', $targetYear)->whereMonth('ordered_at', $targetMonth)->sum('total_amount');
        $lastMonthDate = $latestEntry ? date('Y-m-d', strtotime($latestEntry->ordered_at . ' -1 month')) : date('Y-m-d', strtotime('last month'));
        $lastMonthRevenue = SalesOrder::whereYear('ordered_at', date('Y', strtotime($lastMonthDate)))->whereMonth('ordered_at', date('m', strtotime($lastMonthDate)))->sum('total_amount');
        $revenueTrend = $lastMonthRevenue > 0 ? round((($thisMonthRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100, 1) : 0;

        $thisMonthExpenses = FinanceEntry::where('type', 'expense')->whereYear('entry_date', $targetYear)->whereMonth('entry_date', $targetMonth)->sum('amount');
        $lastMonthExpenses = FinanceEntry::where('type', 'expense')->whereYear('entry_date', date('Y', strtotime($lastMonthDate)))->whereMonth('entry_date', date('m', strtotime($lastMonthDate)))->sum('amount');
        $expenseTrend = $lastMonthExpenses > 0 ? round((($thisMonthExpenses - $lastMonthExpenses) / $lastMonthExpenses) * 100, 1) : 0;

        $stats = [
            'total_employees' => Employee::count(),
            'total_customers' => Customer::count(),
            'total_suppliers' => Supplier::count(),
            'total_inventory_items' => InventoryItem::count(),
            'low_stock_items' => InventoryItem::whereRaw('quantity < reorder_level')->count(),
            'pending_sales_orders' => SalesOrder::where('status', 'pending')->count(),
            'pending_purchase_orders' => PurchaseOrder::where('status', 'pending')->count(),
            'total_revenue' => SalesOrder::sum('total_amount'),
            'total_expenses' => FinanceEntry::where('type', 'expense')->sum('amount'),
            'monthly_income' => $thisMonthRevenue,
            'revenue_trend' => $revenueTrend,
            'expense_trend' => $expenseTrend,
        ];

        try {
            $monthlyData = FinanceEntry::orderBy('entry_date', 'desc')
                ->limit(100)
                ->get()
                ->groupBy(function($entry) {
                    return date('Y-m', strtotime($entry->entry_date));
                })
                ->map(function($items, $month) {
                    return [
                        'month' => $month,
                        'type' => $items->first()->type,
                        'total' => $items->sum('amount')
                    ];
                })
                ->values();
        } catch (\Throwable $e) {
            $monthlyData = collect([]);
        }

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'monthlyData' => $monthlyData,
            'isSuperAdmin' => false
        ]);
    }

    private function getDateFormat()
    {
        $driver = DB::connection()->getDriverName();
        if ($driver === 'sqlite') {
            return DB::raw("strftime('%Y-%m', entry_date) as month");
        } elseif ($driver === 'mysql') {
            return DB::raw("DATE_FORMAT(entry_date, '%Y-%m-01') as month");
        } elseif ($driver === 'mongodb') {
            // For MongoDB, we'll handle grouping in a more compatible way or return a placeholder
            return 'entry_date'; 
        }
        return DB::raw("DATE_TRUNC('month', entry_date)::date as month");
    }
}
