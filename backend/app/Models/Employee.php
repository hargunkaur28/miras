<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Traits\BelongsToBusiness;

class Employee extends Model
{
    use HasFactory, BelongsToBusiness;
    protected $fillable = ['name', 'email', 'phone', 'address', 'city', 'state', 'country', 'role', 'department_id', 'salary', 'joined_at', 'business_id'];
    protected $casts = ['joined_at' => 'datetime'];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}
