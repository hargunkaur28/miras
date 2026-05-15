<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Business;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BusinessController extends Controller
{
    public function index()
    {
        $businesses = Business::paginate(10);
        return Inertia::render('SuperAdmin/Businesses/Index', [
            'businesses' => $businesses
        ]);
    }

    public function create()
    {
        return Inertia::render('SuperAdmin/Businesses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:businesses',
            'email' => 'required|email|unique:businesses',
            'is_active' => 'boolean'
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        
        Business::create($validated);

        return redirect()->route('super-admin.businesses.index')
            ->with('message', 'New business entity registered successfully.');
    }

    public function edit(Business $business)
    {
        return Inertia::render('SuperAdmin/Businesses/Edit', [
            'business' => $business
        ]);
    }

    public function update(Request $request, Business $business)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:businesses,name,' . $business->id,
            'email' => 'required|email|unique:businesses,email,' . $business->id,
            'is_active' => 'boolean'
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $business->update($validated);

        return redirect()->route('super-admin.businesses.index')
            ->with('message', 'Business entity updated successfully.');
    }

    public function toggleStatus(Business $business)
    {
        $business->update(['is_active' => !$business->is_active]);
        return back()->with('message', 'Business status toggled.');
    }

    public function destroy(Business $business)
    {
        // Safety check: Don't delete if there are users or sensitive data
        if ($business->users()->count() > 0) {
            return back()->with('error', 'Cannot delete business with active users.');
        }
        
        $business->delete();
        return redirect()->route('super-admin.businesses.index')
            ->with('message', 'Business entity removed.');
    }
}
