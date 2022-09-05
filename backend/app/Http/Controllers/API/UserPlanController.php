<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePlanRequest;
use App\Repositories\PlanRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class UserPlanController extends Controller
{
    private PlanRepository $planRepository;
    public function __construct(PlanRepository $planRepository)
    {
        $this->planRepository = $planRepository;
    }

    public function index(): JsonResponse
    {
        $data = $this->planRepository->getUserPlan();

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => $data
        ]);
    }
}
