<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Traits\BelongsToBusiness;

class FinanceEntry extends Model
{
    use HasFactory, BelongsToBusiness;
    protected $fillable = ['type', 'category', 'amount', 'description', 'entry_date', 'business_id'];
    protected $casts = ['entry_date' => 'date'];
}
