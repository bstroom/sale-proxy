<?php
namespace App\Repositories;

use App\Models\Geo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class GeoRepository extends Repository {
    public function model(): string
    {
        return Geo::class;
    }

    public function getAll($isShowInactive)
    {

        if ($isShowInactive) {
            return $this->all();
        }

        return $this->where(['is_active' => true])->get();
    }

    public function setActive($id, $isActive)
    {
        $geo = $this->find($id);

        $geo->is_active = $isActive;
        $geo->save();

        return $geo;
    }
}
