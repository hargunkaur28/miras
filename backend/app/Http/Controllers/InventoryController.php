<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\CsvImportable;

class InventoryController extends Controller
{
    use CsvImportable;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inventory = InventoryItem::paginate(15);
        
        $lowStockItems = InventoryItem::all()
            ->filter(fn ($item) => (int) $item->quantity < (int) $item->reorder_level)
            ->count();

        return Inertia::render('Inventory/Index', [
            'items' => $inventory,
            'lowStockItems' => $lowStockItems,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Inventory/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:inventory_items',
            'category' => 'required|string|max:100',
            'unit' => 'required|string|max:50',
            'quantity' => 'required|integer|min:0',
            'reorder_level' => 'required|integer|min:1',
            'cost_price' => 'required|numeric|min:0',
            'sell_price' => 'required|numeric|min:0',
        ]);

        InventoryItem::create($validated);

        return redirect()->route('inventory.index')->with('message', 'Inventory item created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(InventoryItem $inventory)
    {
        return Inertia::render('Inventory/Show', [
            'item' => $inventory,
            'movements' => $inventory->stockMovements()->latest()->paginate(10),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InventoryItem $inventory)
    {
        return Inertia::render('Inventory/Edit', [
            'item' => $inventory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InventoryItem $inventory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:inventory_items,sku,' . $inventory->id,
            'category' => 'required|string|max:100',
            'unit' => 'required|string|max:50',
            'quantity' => 'required|integer|min:0',
            'reorder_level' => 'required|integer|min:1',
            'cost_price' => 'required|numeric|min:0',
            'sell_price' => 'required|numeric|min:0',
        ]);

        $inventory->update($validated);

        return redirect()->route('inventory.index')->with('message', 'Inventory item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InventoryItem $inventory)
    {
        $inventory->delete();

        return redirect()->route('inventory.index')->with('message', 'Inventory item deleted successfully.');
    }
    public function import(Request $request) {
        return $this->importCsv($request, InventoryItem::class, [
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:inventory_items',
            'category' => 'required|string|max:100',
            'unit' => 'required|string|max:50',
            'quantity' => 'required|integer|min:0',
            'reorder_level' => 'required|integer|min:1',
            'cost_price' => 'required|numeric|min:0',
            'sell_price' => 'required|numeric|min:0',
        ]);
    }
}
