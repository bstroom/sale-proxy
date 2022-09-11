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

    public function index()
    {
        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => $this->configRepository->orderBy('created_at', 'DESC')->all()
        ]);
    }

    public function show($id)
    {
        return response()->json([
          'status' => 'SUCCESS',
          'statusCode' => 200,
          'data' => $this->configRepository->find($id)
        ]);
    }

    public function create(CreateConfigRequest $request)
    {
        $result = $this->configRepository->create($request->validated());

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => $result
        ], 200);
    }

    public function edit(CreateConfigRequest $request, $id)
    {
        $config = $this->configRepository->find($id);
        $result = $config->update($request->validated());

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => $result
        ], 200);
    }

    public function delete($id)
    {
        if (!$this->configRepository->delete($id)) {
            return response()->json([
                'status' => 'ERROR',
                'statusCode' => 400,
            ], 400);
        }

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
        ], 200);
    }
}
