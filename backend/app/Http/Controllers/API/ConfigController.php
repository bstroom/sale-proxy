<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateConfigRequest;
use App\Repositories\ConfigRepository;

class ConfigController extends Controller
{
    private ConfigRepository $configRepository;

    public function __construct(ConfigRepository $configRepository)
    {
        $this->configRepository = $configRepository;
    }

    public function show()
    {
        return response()->json([
          'status' => 'SUCCESS',
          'statusCode' => 200,
          'data' => $this->configRepository->orderBy('created_at', 'DESC')->first()
        ]);
    }

    public function create(CreateConfigRequest $request)
    {
        if ($config = $this->configRepository->orderBy('created_at', 'DESC')->first()) {
            $result = $config->update($request->validated());
        } else {
            $result = $this->configRepository->create($request->validated());
        }

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => $result
        ], 200);
    }
}
