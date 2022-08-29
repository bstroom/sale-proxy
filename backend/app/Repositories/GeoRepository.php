<?php
namespace App\Repositories;

use App\Models\Geo;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class GeoRepository extends Repository {
    public function model(): string
    {
        return Geo::class;
    }

}
