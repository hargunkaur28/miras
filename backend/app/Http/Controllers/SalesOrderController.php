<?php
namespace App\Http\Controllers;
use App\Models\SalesOrder;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class SalesOrderController extends Controller {
    public function index() {
        $salesOrders = SalesOrder::with('customer')->paginate(15);
        return Inertia::render('SalesOrders/Index', ['salesOrders' => $salesOrders]);
    }
    public function create() {
        $customers = Customer::all();
        return Inertia::render('SalesOrders/Create', ['customers' => $customers]);
    }
    public function store(Request $request) {
        $v = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'so_number' => 'nullable|string|max:255',
            'status' => 'required|in:pending,confirmed,shipped,delivered,cancelled',
            'total_amount' => 'required|numeric|min:0',
            'ordered_at' => 'required|date',
        ]);
        SalesOrder::create($v);
        return redirect()->route('sales-orders.index')->with('message', 'Sales order created.');
    }
    public function edit(SalesOrder $salesOrder) {
        $customers = Customer::all();
        return Inertia::render('SalesOrders/Edit', ['salesOrder' => $salesOrder, 'customers' => $customers]);
    }
    public function update(Request $request, SalesOrder $salesOrder) {
        $v = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'so_number' => 'nullable|string|max:255',
            'status' => 'required|in:pending,confirmed,shipped,delivered,cancelled',
            'total_amount' => 'required|numeric|min:0',
            'ordered_at' => 'nullable|date',
        ]);
        $salesOrder->update($v);
        return redirect()->route('sales-orders.index')->with('message', 'Sales order updated.');
    }
    public function destroy(SalesOrder $salesOrder) {
        $salesOrder->delete();
        return redirect()->route('sales-orders.index')->with('message', 'Sales order deleted.');
    }
    public function import(Request $request) {
        $request->validate(['file' => 'required|file|mimes:csv,txt|max:2048']);
        $handle = fopen($request->file('file')->getRealPath(), 'r');
        $header = array_map('trim', fgetcsv($handle));
        
        $importedCount = 0; $errors = []; $rowNum = 1;
        while (($row = fgetcsv($handle)) !== false) {
            $rowNum++;
            if (count($header) !== count($row)) continue;
            $data = array_combine($header, $row);
            
            // Resolve Customer
            $customer = Customer::where('name', 'like', '%' . ($data['customer_name'] ?? '') . '%')->first();
            if (!$customer) {
                $errors[] = "Row {$rowNum}: Customer '{$data['customer_name']}' not found.";
                continue;
            }

            $v = Validator::make([
                'customer_id' => $customer->id,
                'so_number' => $data['so_number'] ?? null,
                'status' => strtolower($data['status'] ?? 'pending'),
                'total_amount' => $data['total_amount'] ?? 0,
                'ordered_at' => $data['order_date'] ?? now()->format('Y-m-d'),
            ], [
                'customer_id' => 'required|exists:customers,id',
                'so_number' => 'nullable|string|max:255',
                'status' => 'required|in:pending,confirmed,shipped,delivered,cancelled',
                'total_amount' => 'required|numeric',
                'ordered_at' => 'required|date',
            ]);

            if ($v->fails()) {
                $errors[] = "Row {$rowNum}: " . implode(', ', $v->errors()->all());
                continue;
            }

            SalesOrder::create($v->validated());
            $importedCount++;
        }
        fclose($handle);
        return back()->with('message', "Imported {$importedCount} orders.")->withErrors($errors ? ['import_errors' => $errors] : []);
    }
}
