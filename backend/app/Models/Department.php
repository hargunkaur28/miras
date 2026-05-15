<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Traits\BelongsToBusiness;

class Department extends Model
{
    use HasFactory, BelongsToBusiness;
    protected $fillable = ['name', 'description', 'business_id'];

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }
}
