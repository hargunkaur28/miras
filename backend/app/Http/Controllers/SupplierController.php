<?php
namespace App\Http\Controllers;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\CsvImportable;

class SupplierController extends Controller {
    use CsvImportable;
    public function index() {
        $suppliers = Supplier::paginate(15);
        return Inertia::render('Suppliers/Index', ['suppliers' => $suppliers]);
    }
    public function create() {
        return Inertia::render('Suppliers/Create');
    }
    public function store(Request $request) {
        $v = $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
        ]);
        Supplier::create($v);
        return redirect()->route('suppliers.index')->with('message', 'Supplier created successfully.');
    }
    public function edit(Supplier $supplier) {
        return Inertia::render('Suppliers/Edit', ['supplier' => $supplier]);
    }
    public function update(Request $request, Supplier $supplier) {
        $v = $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
        ]);
        $supplier->update($v);
        return redirect()->route('suppliers.index')->with('message', 'Supplier updated successfully.');
    }
    public function destroy(Supplier $supplier) {
        $supplier->delete();
        return redirect()->route('suppliers.index')->with('message', 'Supplier deleted successfully.');
    }
    public function import(Request $request) {
        return $this->importCsv($request, Supplier::class, [
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
        ]);
    }
}
