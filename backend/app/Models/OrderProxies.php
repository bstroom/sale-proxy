<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProxies extends Model
{
    use HasFactory;

    protected $fillable = [
        'orders_plans_id',
        'proxy_id',
    ];

    public function plan()
    {
        return $this->belongsTo(Plan::class, 'orders_plans_id', 'id');
    }

    public function proxy()
    {
        return $this->belongsTo(Proxy::class, 'proxy_id', 'id');
    }
}
