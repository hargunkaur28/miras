<?php
namespace App\Http\Controllers;
use App\Models\Employee;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\CsvImportable;

class EmployeeController extends Controller {
    use CsvImportable;
    public function index() {
        $employees = Employee::with('department')->paginate(15);
        return Inertia::render('Employees/Index', ['employees' => $employees]);
    }
    public function create() {
        $departments = Department::all();
        return Inertia::render('Employees/Create', ['departments' => $departments]);
    }
    public function store(Request $request) {
        $v = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees',
            'phone' => 'required|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'role' => 'required|string',
            'department_id' => 'required|exists:departments,id',
            'salary' => 'required|numeric|min:0',
            'joined_at' => 'required|date',
        ]);
        Employee::create($v);
        return redirect()->route('employees.index')->with('message', 'Employee created successfully.');
    }
    public function edit(Employee $employee) {
        $departments = Department::all();
        return Inertia::render('Employees/Edit', ['employee' => $employee, 'departments' => $departments]);
    }
    public function update(Request $request, Employee $employee) {
        $v = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email,' . $employee->id,
            'phone' => 'required|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'role' => 'required|string',
            'department_id' => 'required|exists:departments,id',
            'salary' => 'required|numeric|min:0',
            'joined_at' => 'required|date',
        ]);
        $employee->update($v);
        return redirect()->route('employees.index')->with('message', 'Employee updated successfully.');
    }
    public function destroy(Employee $employee) {
        $employee->delete();
        return redirect()->route('employees.index')->with('message', 'Employee deleted successfully.');
    }
    public function import(Request $request) {
        return $this->importCsv($request, Employee::class, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees',
            'phone' => 'required|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'role' => 'required|string',
            'department_id' => 'required|exists:departments,id',
            'salary' => 'required|numeric|min:0',
            'joined_at' => 'required|date',
        ]);
    }
}
