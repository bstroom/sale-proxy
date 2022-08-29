<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateIncomeRequest;
use App\Repositories\BudgetRepository;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use JWTAuth;

class IncomePaymentController extends Controller
{
    private BudgetRepository $budgetRepository;

    public function __construct(
        BudgetRepository $budgetRepository
    )
    {
        $this->budgetRepository = $budgetRepository;
    }

    public function create(CreateIncomeRequest $request): JsonResponse
    {
        $result = $this->budgetRepository->memberRecharge($request->validated());
        if ($result) {
            return response()->json([
                'status' => 'SUCCESS',
                'statusCode' => 200,
            ]);
        } else {
            return response()->json([
                'status' => 'ERROR',
                'statusCode' => 400,
            ], 400);
        }
    }
}
