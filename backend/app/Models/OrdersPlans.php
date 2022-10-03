<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdersPlans extends Model
{
    use HasFactory;

    protected $fillable = [
        'plan_id',
        'user_id',
        'order_id',
        'price',
        'type',
        'proxy_type',
        'quantity',
        'key_id',
        'amount',
        'geo_key'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class, 'plan_id', 'id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }

    public function proxiesId()
    {
        return $this->hasMany(OrderProxies::class, 'orders_plans_id', 'id')->select('proxy_id');
    }
}
