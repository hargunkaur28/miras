<?php
namespace App\Http\Controllers;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\CsvImportable;

class CustomerController extends Controller {
    use CsvImportable;
    public function index() {
        $customers = Customer::paginate(15);
        return Inertia::render('Customers/Index', ['customers' => $customers]);
    }
    public function create() {
        return Inertia::render('Customers/Create');
    }
    public function store(Request $request) {
        $v = $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone' => 'required|string',
            'email' => 'nullable|email',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
        ]);
        Customer::create($v);
        return redirect()->route('customers.index')->with('message', 'Customer created successfully.');
    }
    public function edit(Customer $customer) {
        return Inertia::render('Customers/Edit', ['customer' => $customer]);
    }
    public function update(Request $request, Customer $customer) {
        $v = $request->validate([
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone' => 'required|string',
            'email' => 'nullable|email',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
        ]);
        $customer->update($v);
        return redirect()->route('customers.index')->with('message', 'Customer updated successfully.');
    }
    public function destroy(Customer $customer) {
        $customer->delete();
        return redirect()->route('customers.index')->with('message', 'Customer deleted successfully.');
    }
    public function import(Request $request) {
        return $this->importCsv($request, Customer::class, [
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone' => 'required|string',
            'email' => 'nullable|email',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
        ]);
    }
}
