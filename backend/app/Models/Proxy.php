<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proxy extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip',
        'port',
        'geo_local',
        'ms',
        'description',
        'is_vip'
    ];
}
