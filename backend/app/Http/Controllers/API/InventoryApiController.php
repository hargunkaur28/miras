<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\InventoryItem;
use Illuminate\Http\Request;

class InventoryApiController extends Controller
{
    public function index()
    {
        return InventoryItem::paginate(20);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'sku' => 'required|string|unique:inventory_items',
            'category' => 'required|string',
            'unit' => 'required|string',
            'quantity' => 'required|integer',
            'reorder_level' => 'required|integer',
            'cost_price' => 'required|numeric',
            'sell_price' => 'required|numeric',
        ]);

        $item = InventoryItem::create($validated);
        return response()->json($item, 201);
    }

    public function show(InventoryItem $inventory)
    {
        return $inventory;
    }

    public function update(Request $request, InventoryItem $inventory)
    {
        $validated = $request->validate([
            'name' => 'string',
            'quantity' => 'integer',
            'reorder_level' => 'integer',
            'cost_price' => 'numeric',
            'sell_price' => 'numeric',
        ]);

        $inventory->update($validated);
        return $inventory;
    }

    public function destroy(InventoryItem $inventory)
    {
        $inventory->delete();
        return response()->json(null, 204);
    }
}
