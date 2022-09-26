<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateSingleProxyRequest;
use App\Repositories\ProxyRepository;

class ApiProxyController extends Controller
{
    private ProxyRepository $proxyRepository;

    public function __construct(ProxyRepository $proxyRepository)
    {
        $this->proxyRepository = $proxyRepository;
    }

    public function create(CreateSingleProxyRequest $request)
    {
        $result = $this->proxyRepository->importSingle($request->validated());
        if ($result) {
            return response()->json([
                'status' => 'SUCCESS',
                'statusCode' => 200
            ]);
        }

        return response()->json([
            'status' => 'ERROR',
            'statusCode' => 400,
        ], 400);
    }
}
