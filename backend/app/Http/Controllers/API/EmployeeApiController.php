<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeApiController extends Controller
{
    public function index()
    {
        return Employee::with('department')->paginate(20);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:employees',
            'phone' => 'required|string',
            'role' => 'required|string',
            'department_id' => 'required|exists:departments,id',
            'salary' => 'required|numeric',
            'joined_at' => 'required|date',
        ]);

        $employee = Employee::create($validated);
        return response()->json($employee, 201);
    }

    public function show(Employee $employee)
    {
        return $employee->load('department');
    }

    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'name' => 'string',
            'email' => 'email|unique:employees,email,' . $employee->id,
            'phone' => 'string',
            'role' => 'string',
            'salary' => 'numeric',
        ]);

        $employee->update($validated);
        return $employee;
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->json(null, 204);
    }
}
