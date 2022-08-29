<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
      'payment_code',
      'amount_snap',
        'user_id'
    ];

    protected $casts = [
        'amount_snap' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
