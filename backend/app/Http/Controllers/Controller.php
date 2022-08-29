<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use DispatchesJobs, ValidatesRequests;

    public function whiteListGetFields(array $list, Request $request)
    {
        return array_reduce($list, function ($acc, $key) use ($request) {
            $acc[$key] = $request->get($key);
            return $acc;
        }, []);
    }
}
