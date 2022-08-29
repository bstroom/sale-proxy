<?php
namespace App\Repositories;

use App\Models\Config;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class ConfigRepository extends Repository {
    public function model(): string
    {
        return Config::class;
    }

}
