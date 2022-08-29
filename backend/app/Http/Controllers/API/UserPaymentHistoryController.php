<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\BudgetRepository;

class UserPaymentHistoryController extends Controller
{
    private BudgetRepository $budgetRepository;

    public function __construct(BudgetRepository $budgetRepository)
    {
        $this->budgetRepository = $budgetRepository;
    }

    public function show(): \Illuminate\Http\JsonResponse
    {
        $data = $this->budgetRepository->getOwnerPaymentHistory(auth('api')->user()->id);

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => $data
        ]);
    }
}
