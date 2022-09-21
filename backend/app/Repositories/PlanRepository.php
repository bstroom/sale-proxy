<?php
namespace App\Repositories;

use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class PlanRepository extends Repository {
    public function model(): string
    {
        return Plan::class;
    }

    public function deleteOne($id)
    {
      return  $this->update([
          'deleted_at' => Carbon::now()->toDateTime()
      ],$id);
    }

    public function updateOne(array $data, $id): bool
    {
        $plan = $this->find($id);

        if (!$plan) {
            return false;
        }

        $plan->name = $data['name'];
        $plan->amount = $data['amount'];
        $plan->price = $data['price'];
        $plan->type = $data['type'];
        $plan->proxy_type = implode(',', $data['proxy_type']);
        $plan->description = $data['description'];
        $plan->is_active = $data['is_active'];
        $plan->is_vip = $data['is_vip'];
        $plan->save();

        return true;
    }

    public function getUserPlan()
    {
        return $this->where([
            'is_active' => true
        ])->whereNull('deleted_at')->get();
    }
}
