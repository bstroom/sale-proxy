<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\EditUserRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    private UserRepository $userRepository;

    public function __construct(
        UserRepository $userRepository
    )
    {
        $this->userRepository = $userRepository;
    }


    public function show(): JsonResponse
    {
        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => auth('api')->user()
        ]);
    }

    public function edit(EditUserRequest  $request): JsonResponse
    {
        $isSuccess = $this->userRepository->editUser($request->validated(), auth('api')->user()?->id);
        if ($isSuccess) {
            return response()->json([
                'status' => 'SUCCESS',
                'statusCode' => 200
            ], 200);
        }

        return response()->json([
           'status' => 'ERROR',
           'statusCode' => 400
        ], 400);
    }
}
