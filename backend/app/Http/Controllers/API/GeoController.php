<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\GeoRepository;
use Illuminate\Http\Request;

class GeoController extends Controller
{
    private GeoRepository $geoRepository;
    public function __construct(
        GeoRepository $geoRepository
    )
    {
        $this->geoRepository = $geoRepository;
    }

    public function index()
    {
        $list = $this->geoRepository->all();

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' =>  $list,
        ]);
    }
}
