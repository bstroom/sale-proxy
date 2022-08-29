<?php

namespace Database\Seeders;

use App\Models\Geo;
use File;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GeoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Geo::truncate();

        $json = File::get('database/data/geo.json');
        $countries = json_decode($json);

        foreach ($countries as $key => $value) {
            Geo::create([
                "name" => $value->name,
                "code" => $value->code
            ]);
        }
    }
}
