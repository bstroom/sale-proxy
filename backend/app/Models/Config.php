<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    use HasFactory;

    protected $fillable = [
      'payment_name',
      'payment_card_number',
      'payment_bank_name',
      'payment_description',
    ];
}
