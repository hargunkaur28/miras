<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Traits\BelongsToBusiness;

class InventoryItem extends Model
{
    use HasFactory, BelongsToBusiness;
    protected $fillable = ['name', 'sku', 'category', 'unit', 'quantity', 'reorder_level', 'cost_price', 'sell_price', 'business_id'];

    public function stockMovements(): HasMany
    {
        return $this->hasMany(StockMovement::class);
    }
}
