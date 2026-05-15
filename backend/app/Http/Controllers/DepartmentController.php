<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\CsvImportable;

class DepartmentController extends Controller
{
    use CsvImportable;
    public function index()
    {
        $departments = Department::withCount('employees')->paginate(15);
        return Inertia::render('Departments/Index', ['departments' => $departments]);
    }

    public function create()
    {
        return Inertia::render('Departments/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:departments',
            'description' => 'nullable|string',
        ]);
        Department::create($validated);
        return redirect()->route('departments.index')->with('message', 'Department created successfully.');
    }

    public function show(Department $department)
    {
        return Inertia::render('Departments/Show', ['department' => $department->load('employees')]);
    }

    public function edit(Department $department)
    {
        return Inertia::render('Departments/Edit', ['department' => $department]);
    }

    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:departments,name,' . $department->id,
            'description' => 'nullable|string',
        ]);
        $department->update($validated);
        return redirect()->route('departments.index')->with('message', 'Department updated successfully.');
    }

    public function destroy(Department $department)
    {
        $department->delete();
        return redirect()->route('departments.index')->with('message', 'Department deleted successfully.');
    }

    public function import(Request $request) {
        return $this->importCsv($request, Department::class, [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
    }
}
