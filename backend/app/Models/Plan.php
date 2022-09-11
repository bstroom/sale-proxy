<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plan extends Model
{
    use HasFactory;
    protected  $table = 'plans';
    protected $fillable = [
        'name',
        'slug',
        'amount',
        'type',
        'proxy_type',
        'price',
        'description',
        'is_active',
        'deleted_at',
        'user_id'
    ];

    public function createdBy() {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }

    protected $casts = [
        'price' => 'integer'
    ];
}
