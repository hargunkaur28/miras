<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Traits\BelongsToBusiness;

class Customer extends Model
{
    use HasFactory, BelongsToBusiness;
    protected $fillable = ['name', 'contact_person', 'phone', 'email', 'address', 'city', 'state', 'country', 'business_id'];

    public function salesOrders(): HasMany
    {
        return $this->hasMany(SalesOrder::class);
    }
}
