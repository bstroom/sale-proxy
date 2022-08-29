<?php
namespace App\Repositories;

use App\Models\Plan;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class PlanRepository extends Repository {
    public function model(): string
    {
        return Plan::class;
    }

}
