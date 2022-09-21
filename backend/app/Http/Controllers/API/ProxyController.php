<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProxyRequest;
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
            $filterType = $request->get('filter_type', 'NORMAL');



            $list = $this->proxyRepository->where(['type' => $type, 'is_vip' => $filterType === 'VIP'])->skip(($page - 1) * $limit)->take($limit)->get();
            $total = $this->proxyRepository->where(['type' => $type, 'is_vip' => $filterType === 'VIP' ])->count();

            return response()->json([
                'status' => 'SUCCESS',
                'statusCode' => 200,
                'data' => $list,
                'total' => $total,
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
                'statusCode' => 400,
            ], 500);
        }
    }
}
