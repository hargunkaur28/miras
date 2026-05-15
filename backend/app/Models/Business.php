<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Business extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'email',
        'is_active',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
