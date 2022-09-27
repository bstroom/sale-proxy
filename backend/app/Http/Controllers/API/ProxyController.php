<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProxyRequest;
use App\Http\Requests\UpdateProxyRequest;
use App\Repositories\ProxyRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class ProxyController extends Controller
{
    private ProxyRepository $proxyRepository;

    public function __construct(ProxyRepository $proxyRepository)
    {
        $this->proxyRepository = $proxyRepository;
    }

    public function index(Request $request)
    {
        try {
            $page = $request->get('page', 1);
            $limit = $request->get('limit', 100);
            $type = $request->get('type', 'HTTP');
            $keyword = $request->get('keyword', null);
            $filterType = $request->get('filter_type', 'NORMAL');

            $condition = ['type' => $type, 'is_vip' => $filterType === 'VIP'];

            $list = $this->proxyRepository->where($condition)->skip(($page - 1) * $limit)->take($limit);
            $total = $this->proxyRepository->where($condition);

            if ($keyword) {
                $list->where('ip', 'like', '%'.$keyword.'%');
                $total->where('ip', 'like', '%'.$keyword.'%');
            }

            return response()->json([
                'status' => 'SUCCESS',
                'statusCode' => 200,
                'data' => $list->get(),
                'total' => $total->count(),
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
            $data = [];
            $path = $request->file('files')->getRealPath();
            $file = fopen($path, 'r');

            while(!feof($file)) {
                $data[] = preg_replace("/\r\n|\r|\n/", '', fgets($file));
            }
            fclose($file);
            Log::write('error', date('Y-m-d').' Import total '.count($data));

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
            Log::write('error', $e);

            return response()->json([
                'status' => 'SERVER ERROR',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function edit(UpdateProxyRequest $request, $id)
    {
        $result = $this->proxyRepository->updateOne($request->validated(), $id);

        if ($result) {
            return response()->json([
                'status' => 'SUCCESS',
                'statusCode' => 200,
            ]);
        }

        return response()->json([
            'status' => 'ERROR',
            'statusCode' => 400,
        ], 400);
    }
}
