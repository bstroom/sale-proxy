<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOrderRequest;
use App\Repositories\OrderRepository;

class OrdersController extends Controller
{
    private OrderRepository $orderRepository;
    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function index()
    {
        $result = $this->orderRepository->list(auth('api')->user()->id);
        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => $result
        ]);
    }

    public function create(CreateOrderRequest $request)
    {
        $result = $this->orderRepository->order($request->validated(), auth('api')->user()->id);

        return response()->json([
            'status' => 'SUCCESS',
            'statusCode' => 200,
            'data' => $result
        ]);
    }
}
