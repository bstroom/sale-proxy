<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\GeoRepository;
use App\Repositories\ProxyRepository;
use App\Repositories\UserRepository;

class DashboardController extends Controller
{
    private UserRepository $userRepository;
    private ProxyRepository $proxyRepository;
    private GeoRepository $geoRepository;
    public function __construct(
        UserRepository $userRepository,
        ProxyRepository $proxyRepository,
        GeoRepository $geoRepository
    )
    {
        $this->userRepository = $userRepository;
        $this->proxyRepository = $proxyRepository;
        $this->geoRepository = $geoRepository;
    }

    public function index()
    {
        $totalSSH = $this->proxyRepository->count([
            'type' => 'SSH'
        ]);
        $totalHTTP = $this->proxyRepository->count([
            'type' => 'HTTP'
        ]);
        $totalSOCKS = $this->proxyRepository->whereIn('type', ['SOCKS5', 'SOCKS4'])->count();

        $count = [
            'total_ssh' => $totalSSH,
            'total_http' => $totalHTTP,
            'total_socks' => $totalSOCKS,
            'total_by_geo_local' => []
        ];

        $geos = $this->geoRepository->where(['is_active' => true])->get();

        foreach ($geos as $geo) {
            $totalByGeo = $this->proxyRepository->count(['geo_local' => $geo['code']]);
            if ($totalByGeo > 0) {
                $count['total_by_geo_local'][strtolower($geo['code'])] = $totalByGeo;
            }
        }


        return response()->json([
           'status' => 'SUCCESS',
           'statusCode' => 200,
           'data' => [
                'count' => $count
           ]
        ]);
    }
}
