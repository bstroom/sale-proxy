<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\BudgetRepository;
use App\Repositories\UserRepository;
use Tymon\JWTAuth\Facades\JWTAuth;

class BudgetController extends Controller
{
    private BudgetRepository $budgetRepository;
    private UserRepository $userRepository;

    public function __construct(
        BudgetRepository $budgetRepository,
        UserRepository $userRepository
    )
    {
        $this->budgetRepository = $budgetRepository;
        $this->userRepository = $userRepository;
    }

    public function show()
    {

        $result = $this->userRepository->find(auth('api')->user()->id)->budget;

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => $result
        ]);
    }
}
