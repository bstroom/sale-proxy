<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\ProxyRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;


class ExportProxyController extends Controller
{
    private ProxyRepository $proxyRepository;

    public function __construct(ProxyRepository $proxyRepository)
    {
        $this->proxyRepository = $proxyRepository;
    }

    public function create($type)
    {
        $fileName = Carbon::now()->timestamp.'.txt';

        $query = $this->proxyRepository->where(['type' => $type]);
        $total = $query->count();
        $count = $query->count();

        $page = 1;

        while($count > 0) {
            $data = $query->take(100)->skip(($page - 1) * 100)->get();

            foreach ($data as $item) {
                Storage::append($fileName,"{$item['ip']}:{$item['port']}:{$item['username']}:{$item['password']}:{$item['geo_local']}|{$item['ms']}");
            }

            $page += 1;
            $count -= 100;
        };

        if ($total > 0) {
            $path = storage_path('app/'.$fileName);

            $file = File::get($path);
            $type = File::mimeType($path);
            $response = Response::make($file, 200);
            $response->header("Content-Type", $type);

            return $response;
        }

        return 'No content';
    }
}
