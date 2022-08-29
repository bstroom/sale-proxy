<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\ProxyRepository;
use App\Repositories\UserRepository;

class DashboardController extends Controller
{
    private UserRepository $userRepository;
    private ProxyRepository $proxyRepository;
    public function __construct(
        UserRepository $userRepository,
        ProxyRepository $proxyRepository,
    )
    {
        $this->userRepository = $userRepository;
        $this->proxyRepository = $proxyRepository;
    }

    public function index()
    {
        $totalUser = $this->userRepository->count();
        $totalSSH = $this->proxyRepository->count([
            'type' => 'SSH'
        ]);
        $totalHTTP = $this->proxyRepository->count([
            'type' => 'HTTP'
        ]);
        $totalSOCKS4 = $this->proxyRepository->count([
            'type' => 'SOCKS4'
        ]);
        $totalSOCKS5 = $this->proxyRepository->count([
            'type' => 'SOCKS5'
        ]);

        return response()->json([
           'status' => 'SUCCESS',
           'statusCode' => 200,
           'data' => [
                'count' => [
                    'total_user' => $totalUser,
                    'total_ssh' => $totalSSH,
                    'total_http' => $totalHTTP,
                    'total_socks4' => $totalSOCKS4,
                    'total_socks5' => $totalSOCKS5,
                ]
           ]
        ]);
    }
}
