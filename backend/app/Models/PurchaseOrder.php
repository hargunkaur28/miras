<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Traits\BelongsToBusiness;

class PurchaseOrder extends Model
{
    use HasFactory, BelongsToBusiness;
    protected $fillable = ['supplier_id', 'status', 'total_amount', 'ordered_at', 'business_id'];
    protected $casts = ['ordered_at' => 'datetime'];

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }
}
