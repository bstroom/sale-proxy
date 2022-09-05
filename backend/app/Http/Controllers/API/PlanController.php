<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePlanRequest;
use App\Http\Requests\EditPlanRequest;
use App\Repositories\PlanRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use JWTAuth;

class PlanController extends Controller
{
    private PlanRepository $planRepository;
    public function __construct(PlanRepository $planRepository)
    {
        $this->planRepository = $planRepository;
    }

    public function index(): JsonResponse
    {
        $data = $this->planRepository->get();

        return response()->json([
           'status' => 'SUCCESS',
           'statusCode' => 200,
           'data' => $data
        ]);
    }

    public function show($id): JsonResponse
    {
        $data = $this->planRepository->find($id);

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => $data
        ]);
    }

    public function edit(EditPlanRequest $request,$id): JsonResponse
    {
        $this->planRepository->updateOne($request->validated(), $id);
        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
        ]);
    }

    public function store(CreatePlanRequest $request): JsonResponse
    {
        try {
            $formData = $request->validated();
            $formData['proxy_type'] = join(',', $formData['proxy_type']);
            $formData['slug'] = Str::slug($formData['name']);
            $formData['user_id'] = auth('api')->user()->id;
            $formData['description'] = $formData['description'] ?? '';
            $formData['is_active'] = $formData['is_active'] ?? '';

            $data = $this->planRepository->create($formData);

            return response()->json([
                'status' => 'SUCCESS',
                'statusCode' => 201,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            Log::error($e);

            return response()->json([
                'status' => 'ERROR',
                'statusCode' => 500,
                'data' => 'SERVER ERROR'
            ], 500);
        }
    }

    public function delete($id): JsonResponse
    {
        $result = $this->planRepository->deleteOne($id);

        if (!$result) {
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
