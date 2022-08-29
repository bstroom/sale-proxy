<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\StoreUserRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {
    private UserRepository $userRepo;
    public function __construct(
        UserRepository $userRepository,
    )
    {
        $this->userRepo = $userRepository;
    }

    public function login(LoginRequest $request): JsonResponse
    {
        if (!$token = auth('api')->setTTL(72000)->attempt($request->validated())) {
            return response()->json([
                'status' => 'ERROR',
                'statusCode' => 400,
                'data' => null
            ], 400);
        }

        $user = auth('api')->user();
        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer'
            ]
        ]);
    }

    public function logout(): JsonResponse
    {
        auth('api')->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function register(StoreUserRequest $request): JsonResponse
    {
        $data = $this->whiteListGetFields([
            'first_name',
            'last_name',
            'phone_number',
            'email',
            'password'
        ], $request);

        $result = $this->userRepo->register($data);

        if (!$result) {
            return response()->json([
                'status' => 'ERROR',
                'statusCode' => 400,
                'data' => null
            ], 400);
        }

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => [
                'user' => $result,
            ]
        ]);
    }
}
