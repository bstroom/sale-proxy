<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    private UserRepository $userRepo;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepo = $userRepository;
    }

    public function index()
    {
        $list = $this->userRepo->getAllUsers();
        return response()->json([
            'status'=> 'SUCCESS',
            'statusCode' => 200,
            'data' => $list
        ]);
    }

    public function edit(Request $request)
    {

    }
}
