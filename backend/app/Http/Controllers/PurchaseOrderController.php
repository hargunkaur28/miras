<?php
namespace App\Http\Controllers;
use App\Models\PurchaseOrder;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class PurchaseOrderController extends Controller {
    public function index() {
        $purchaseOrders = PurchaseOrder::with('supplier')->paginate(15);
        return Inertia::render('PurchaseOrders/Index', ['purchaseOrders' => $purchaseOrders]);
    }
    public function create() {
        $suppliers = Supplier::all();
        return Inertia::render('PurchaseOrders/Create', ['suppliers' => $suppliers]);
    }
    public function store(Request $request) {
        $v = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'status' => 'required|in:pending,confirmed,delivered,cancelled',
            'total_amount' => 'required|numeric|min:0',
            'ordered_at' => 'required|date',
        ]);
        PurchaseOrder::create($v);
        return redirect()->route('purchase-orders.index')->with('message', 'Purchase order created.');
    }
    public function edit(PurchaseOrder $purchaseOrder) {
        $suppliers = Supplier::all();
        return Inertia::render('PurchaseOrders/Edit', ['purchaseOrder' => $purchaseOrder, 'suppliers' => $suppliers]);
    }
    public function update(Request $request, PurchaseOrder $purchaseOrder) {
        $v = $request->validate([
            'status' => 'required|in:pending,confirmed,delivered,cancelled',
            'total_amount' => 'required|numeric|min:0',
        ]);
        $purchaseOrder->update($v);
        return redirect()->route('purchase-orders.index')->with('message', 'Purchase order updated.');
    }
    public function destroy(PurchaseOrder $purchaseOrder) {
        $purchaseOrder->delete();
        return redirect()->route('purchase-orders.index')->with('message', 'Purchase order deleted.');
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
            
            // Resolve Supplier
            $supplier = Supplier::where('name', 'like', '%' . ($data['supplier_name'] ?? '') . '%')->first();
            if (!$supplier) {
                $errors[] = "Row {$rowNum}: Supplier '{$data['supplier_name']}' not found.";
                continue;
            }

            $v = Validator::make([
                'supplier_id' => $supplier->id,
                'po_number' => $data['po_number'] ?? null,
                'status' => strtolower($data['status'] ?? 'pending'),
                'total_amount' => $data['total_amount'] ?? 0,
                'ordered_at' => $data['order_date'] ?? now()->format('Y-m-d'),
            ], [
                'supplier_id' => 'required|exists:suppliers,id',
                'status' => 'required|in:pending,confirmed,delivered,cancelled',
                'total_amount' => 'required|numeric',
                'ordered_at' => 'required|date',
            ]);

            if ($v->fails()) {
                $errors[] = "Row {$rowNum}: " . implode(', ', $v->errors()->all());
                continue;
            }

            PurchaseOrder::create($v->validated());
            $importedCount++;
        }
        fclose($handle);
        return back()->with('message', "Imported {$importedCount} orders.")->withErrors($errors ? ['import_errors' => $errors] : []);
    }
}
