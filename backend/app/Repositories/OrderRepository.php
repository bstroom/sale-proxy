<?php
namespace App\Repositories;

use App\Models\Budget;
use App\Models\Key;
use App\Models\Order;
use App\Models\OrdersPlans;
use App\Models\PaymentHistory;
use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class OrderRepository extends Repository {
    public function model(): string
    {
        return Order::class;
    }


    public function order(array $data, int $userId)
    {
        $budget = Budget::where(['user_id' => $userId])->first();
        $plan = Plan::where(['id' => $data['plan_id']])->first();

        if (!$budget || !$plan || $budget->amount_snap < $plan->price) {
            return false;
        }
        try {
            DB::beginTransaction();

            $orderPayment = new PaymentHistory([
                'user_id' => $userId,
                'budget_id' => $budget->id,
                'content' => 'PLAN_'.$plan->id,
                'amount' => $plan->price,
                'type' => 'OUT'
            ]);
            $orderPayment->save();

            $order = $this->create([
                'total' => $plan->price,
                'user_id' => $userId,
                'payment_id' => $orderPayment->id,
            ]);
            $order->save();

            $daysConvert = [
              'WEEK' => 7,
              'MONTH' => 30,
              'YEAR' => 365
            ];
            $key = Key::create([
                'key' => Str::random(16).'.'.Str::random(16),
                'expired_at' => Carbon::now()->addDays($daysConvert[$plan->type])->toDateTime(),
                'order_id' => $order->id,
                'user_id' => $userId
            ]);
            $key->save();

            $orderPlan = new OrdersPlans([
                'plan_id' => $plan->id,
                'user_id' => $userId,
                'order_id' => $order->id,
                'amount' => $plan->amount,
                'price' => $plan->price,
                'type' => $plan->type,
                'proxy_type' => $plan->proxy_type,
                'quantity' => 1,
                'geo_key' => $data['geo_key'],
            ]);
            $orderPlan->save();

            $budget->amount_snap = $this->replayAmountSnap($budget, $userId);
            $budget->save();

            DB::commit();
            return true;
        } catch(\Exception $e) {
            DB::rollBack();

            Log::error($e);
            return false;
        }
    }

    public function list($userId)
    {
        $data = OrdersPlans::with('user', 'plan', 'order')->where([
            'user_id' => $userId
        ])->orderBy('created_at', 'DESC')->get();

        return $data->map(function ($item){
            $item['key'] = $item->order->key;
            return $item;
        });
    }

    private function replayAmountSnap($userBudget, $userId): int
    {
        $histories = PaymentHistory::where([
            'user_id' => $userId,
            'budget_id' => $userBudget->id
        ])->get();

        return array_reduce($histories->toArray(), function ($acc, $item) {
            if ($item['type'] === 'IN') {
                $acc += $item['amount'];
            } else {
                $acc -= $item['amount'];
            }
            return $acc;
        }, 0);
    }
}
