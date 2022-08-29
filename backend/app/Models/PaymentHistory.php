<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentHistory extends Model
{
    use HasFactory;

    protected $fillable = [
      'content',
      'amount',
        'type',
      'user_id',
      'budget_id',
    ];

    protected $casts = [
      'amount' => 'integer'
    ];
}
