<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProxyRequest;
use App\Repositories\ProxyRepository;
use Illuminate\Support\Facades\Log;

class ProxyController extends Controller
{
    private ProxyRepository $proxyRepository;

    public function __construct(ProxyRepository $proxyRepository)
    {
        $this->proxyRepository = $proxyRepository;
    }

    public function index()
    {
        try {
            $list = $this->proxyRepository->all();
            return response()->json([
                'status' => 'SUCCESS',
                'statusCode' => 200,
                'data' => $list
            ]);
        } catch (\Exception $e) {
            Log::write($e);

            return response()->json([
                'status' => 'ERROR',
                'statusCode' => 200,
                'data' => []
            ]);
        }
    }

    public function create(CreateProxyRequest $request, $type)
    {
        try {
            $file = fopen($request->file('files'), "r") or exit("Unable to open file!");
            $data = [];
            while(!feof($file)) {
                $data[] = preg_replace("/\r\n|\r|\n/", '', fgets($file));
            }
            fclose($file);

            $result = $this->proxyRepository->import($data, $type);

            if ($result) {
                return response()->json([
                    'status' => 'SUCCESS',
                    'statusCode' => 201,
                ]);
            } else {
                return response()->json([
                    'status' => 'ERROR',
                    'statusCode' => 400,
                ], 400);
            }
        } catch (\Exception $e) {
            Log::error($e);

            return response()->json([
                'status' => 'SERVER ERROR',
                'statusCode' => 400,
            ], 500);
        }
    }
}
