<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\EditGeoRequest;
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

    public function index(Request $request)
    {
        $isShowInactive = $request->get('is_show_inactive', 0);

        $list = $this->geoRepository->getAll($isShowInactive == 1);

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' =>  $list,
        ]);
    }

    public function edit(EditGeoRequest $request, $id)
    {
        $this->geoRepository->setActive($id, $request->is_active);

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
        ]);
    }
}
