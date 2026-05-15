<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Traits\BelongsToBusiness;

class StockMovement extends Model
{
    use HasFactory, BelongsToBusiness;
    protected $fillable = ['inventory_item_id', 'type', 'quantity', 'reference', 'note', 'business_id'];

    public function inventoryItem(): BelongsTo
    {
        return $this->belongsTo(InventoryItem::class);
    }
}
