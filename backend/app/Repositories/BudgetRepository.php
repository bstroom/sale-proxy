<?php
namespace App\Repositories;

use App\Models\Budget;
use App\Models\PaymentHistory;
use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class BudgetRepository extends Repository {
    public function model(): string
    {
        return Budget::class;
    }


    public function memberRecharge($data)
    {
        try {
            $userBudget = $this->findWhere(['payment_code' => $data['code']])->first();

            if (!$userBudget) {
                Log::error('Cant not find budget for code '.$data['code']);
                return false;
            }

            DB::beginTransaction();

            $paymentHistory = new PaymentHistory([
                'content' => 'NAP',
                'amount' => $data['amount'],
                'type' => 'IN',
                'user_id' => $userBudget->user_id,
                'budget_id' => $userBudget->id
            ]);
            $paymentHistory->save();

            $userBudget->amount_snap = $this->replayAmountSnap($userBudget, $userBudget->user_id);
            $userBudget->save();

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e);
            return false;
        }
    }

    public function getUserPaymentByCode($code)
    {
        return $this->findWhere(['payment_code' => $code])->first()?->user;
    }

    public function getOwnerPaymentHistory($userId)
    {
        $data = PaymentHistory::where(['user_id' => $userId])->orderBy('created_at', 'DESC');

        $data = array_map(function ($history) {
            $date = (new Carbon($history['created_at']))->format('m/y/d h:s:i');
            if ($history['content'] ==='INIT') {
                return 'Ngày '.$date.', Tạo tài khoản';
            }
            if ($history['type'] === 'OUT') {
                list($name, $planId) = explode('_', $history['content']);
                $plan = Plan::find($planId);
                return 'Ngày '.$date.', Chi tiêu '.number_format($history['amount']).'đ mua gói '.$plan->name;
            }
            if ($history['type'] === 'IN') {
                return 'Ngày '.$date.', Nạp với số tiền '. number_format($history['amount']).'đ';
            }
        }, $data->get()->toArray());

        return $data;
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
