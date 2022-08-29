<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'payment_id',
        'user_id',
        'total'
    ];

    public function key(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Key::class, 'order_id',  'id');
    }

    public function orderPlans()
    {
        return $this->hasMany(OrdersPlans::class, 'order_id', 'id');
    }
}
