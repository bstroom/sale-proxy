<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetListProxyRequest;
use App\Http\Requests\GetSingleProxyRequest;
use App\Repositories\ProxyRepository;
use Illuminate\Http\Request;

class UserProxyController extends Controller
{
    private ProxyRepository $proxyRepository;

    public function __construct(ProxyRepository $proxyRepository)
    {
        $this->proxyRepository = $proxyRepository;
    }

    public function index(GetListProxyRequest $request): \Illuminate\Http\JsonResponse
    {
        $result = $this->proxyRepository->getPremiumProxies($request->validated());

        if ($result !== false) {
            return response()->json([
                'status' => 'SUCCESS',
                'statusCode' => 200,
                'data' => $result
            ]);
        }

        return response()->json([
            'status' => 'ERROR',
            'statusCode' => 400,
        ], 400);
    }

    public function show(GetSingleProxyRequest $request, $type): \Illuminate\Http\JsonResponse
    {
        if (!in_array($type, ['single-proxy', 'file'])) {

        }

        if ($type === 'single-proxy') {
            $result = $this->proxyRepository->getSinglePremiumProxy($request->validated());

            if ($result) {
                return response()->json([
                    'status' => 'SUCCESS',
                    'statusCode' => 200,
                    'data' => $result
                ]);
            }

            return response()->json([
                'status' => 'ERROR',
                'statusCode' => 400,
            ], 400);
        }

        return response()->json([
            'status' => 'ERROR',
            'statusCode' => 400,
        ], 400);
    }
}
