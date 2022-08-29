<?php
namespace App\Repositories;

use App\Models\Budget;
use App\Models\PaymentHistory;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Testing\Fluent\Concerns\Has;

class UserRepository extends Repository {
    public function model(): string
    {
        return User::class;
    }

    public function register($user)
    {
        try {
            DB::beginTransaction();
            $user['password'] = Hash::make($user['password']);

            $result = $this->create(
                $user + [
                    'email_verify_token' => Carbon::now()
                    ]);

            if (!$result) {
                return false;
            }

            $code = 'NAP'.$result->id.rand(30,1000);

            $userBudget = new Budget([
               'payment_code' => $code,
                'user_id' => $result->id
            ]);
            $userBudget->save();

            $paymentHistory = new PaymentHistory([
                'content' => 'INIT',
                'amount' => 0,
                'type' => 'IN',
                'user_id' => $result->id,
                'budget_id' => $userBudget->id
            ]);
            $paymentHistory->save();

            DB::commit();
            return $result;
        } catch (\Exception $e) {
            Log::error($e);
            DB::rollBack();

            return false;
        }
    }

    public function getAllUsers()
    {
        return User::with('budget')->get();
    }

    public function editUser($data, $userId): bool
    {
        $user = $this->find($userId);
        if (!$user) {
            return false;
        }

        if (!empty($data['new_password'])) {
            if (empty($data['old_password']) || empty($data['confirm_new_password']) || $data['new_password'] != $data['confirm_new_password']) {
                return false;
            }

            if (!Hash::check($data['old_password'], $user->password)) {
                return false;
            }

            $user->password = Hash::make($data['new_password']);
            $user->save();
            return true;
        }

        $user->last_name = $data['last_name'];
        $user->first_name = $data['first_name'];
        $user->phone_number = $data['phone_number'];
        $user->save();

        return true;
    }
}
