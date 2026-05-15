<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Traits\BelongsToBusiness;

class Invoice extends Model
{
    use HasFactory, BelongsToBusiness;
    protected $fillable = ['sales_order_id', 'invoice_number', 'issued_at', 'due_at', 'paid', 'business_id'];
    protected $casts = ['issued_at' => 'datetime', 'due_at' => 'date', 'paid' => 'boolean'];

    public function salesOrder(): BelongsTo
    {
        return $this->belongsTo(SalesOrder::class);
    }
}
