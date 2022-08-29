<?php
namespace App\Repositories;

use App\Models\Cart;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class CartRepository extends Repository {
    public function model(): string
    {
        return Cart::class;
    }

}
