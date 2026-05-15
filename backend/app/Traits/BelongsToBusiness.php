<?php

namespace App\Traits;

use App\Models\Business;
use Illuminate\Database\Eloquent\Builder;

trait BelongsToBusiness
{
    protected static function bootBelongsToBusiness()
    {
        static::creating(function ($model) {
            if (auth()->check() && ! $model->business_id) {
                $model->business_id = auth()->user()->business_id;
            }
        });

        static::addGlobalScope('business', function (Builder $builder) {
            if (auth()->check() && auth()->user()->role !== 'super_admin') {
                $builder->where('business_id', auth()->user()->business_id);
            }
        });
    }

    public function business()
    {
        return $this->belongsTo(Business::class);
    }
}
