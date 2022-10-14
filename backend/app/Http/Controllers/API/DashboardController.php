<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\GeoRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProxyRepository;
use App\Repositories\UserRepository;

class DashboardController extends Controller
{
    private UserRepository $userRepository;
    private ProxyRepository $proxyRepository;
    private GeoRepository $geoRepository;
    private OrderRepository $orderRepository;

    public function __construct(
        UserRepository $userRepository,
        ProxyRepository $proxyRepository,
        GeoRepository $geoRepository,
        OrderRepository $orderRepository
    )
    {
        $this->userRepository = $userRepository;
        $this->proxyRepository = $proxyRepository;
        $this->geoRepository = $geoRepository;
        $this->orderRepository = $orderRepository;
    }

    public function index()
    {
        $totalSSH = $this->proxyRepository->count([
            'type' => 'SSH',
            'status' => 'LIVE'
        ]);
        $totalHTTP = $this->proxyRepository->count([
            'type' => 'HTTP',
            'status' => 'LIVE'
        ]);
        $totalSOCKS = $this->proxyRepository->whereIn('type', ['SOCKS5', 'SOCKS4'])->where(['status' => 'LIVE'])->count();

        $count = [
            'total_ssh' => $totalSSH,
            'total_http' => $totalHTTP,
            'total_socks' => $totalSOCKS,
            'total_by_geo_local' => []
        ];

        $geos = $this->geoRepository->where(['is_active' => true])->get();

        foreach ($geos as $geo) {
            $totalByGeo = $this->proxyRepository->count(['geo_local' => $geo['code'], 'status' => 'LIVE']);
            if ($totalByGeo > 0) {
                $count['total_by_geo_local'][strtolower($geo['code'])] = [
                    'count' => $totalByGeo,
                    'label' => $geo['name']
                ];
            }
        }

        $count['total_by_geo_local']['unknown'] = [
            'label' => 'Chưa xác định',
            'count' => $this->proxyRepository->whereNull('geo_local')->orWhere(['geo_local' => 'Null'])->where(['status' => 'LIVE'])->count()
        ];

        $userOrders = null;
        if (auth('api')->user()->role === 'ADMIN') {
            $userOrders = $this->orderRepository->with(['orderPlans', 'user'])->orderBy('created_at', 'DESC')->take(5)->get();
        }


        return response()->json([
           'status' => 'SUCCESS',
           'statusCode' => 200,
           'data' => [
               'count' => $count,
               'orders' => $userOrders
           ]
        ]);
    }
}
