<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\BudgetRepository;
use Illuminate\Http\Request;

class UserPaymentController extends Controller
{
    private BudgetRepository $budgetRepository;

    public function __construct(BudgetRepository $budgetRepository)
    {
        $this->budgetRepository = $budgetRepository;
    }

    public function show($code): \Illuminate\Http\JsonResponse
    {
        $user = $this->budgetRepository->getUserPaymentByCode($code);

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => $user
        ]);
    }
}
