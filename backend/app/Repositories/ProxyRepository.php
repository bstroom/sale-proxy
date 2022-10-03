<?php
namespace App\Repositories;

use App\Models\Key;
use App\Models\Order;
use App\Models\Proxy;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProxyRepository extends Repository {
    public function model(): string
    {
        return Proxy::class;
    }


    public function import($data, $type)
    {
        $importList = [];
        if (!in_array($type, ['HTTP', 'SOCKS4', 'SOCKS5', 'SSH'])) {
            return false;
        }
        foreach ($data as $item) {
            $ex = explode('|', $item);
            $ip = $ex[0] ?? '';
            $port = $ex[1] ?? '';
            $geo = $ex[2] ?? '';
            $ms = $ex[3] ?? '';
            $isVip = !empty($ex[4]) && $ex[4] == 'vip';

            if ($ip && $port && $geo && $ms) {
                $importList[] = [
                    'ip' => $ip,
                    'port' => $port,
                    'geo_local' => $geo,
                    'ms' => $ms,
                    'type' => $type,
                    'is_vip' => $isVip,
                    'created_at' => Carbon::now()->toDateTime(),
                    'updated_at' => Carbon::now()->toDateTime()
                ];
            }
        }

        if (count($importList) === 0) {
            return false;
        }

        try {
            do {
                $deleted = Proxy::where('type', $type)->limit(1000)->delete();
                sleep(1);
            } while ($deleted > 0);

            foreach (array_chunk($importList,1000, true) as $t)
            {
                Proxy::insert($t);
                sleep(1);
            }


            return true;
        } catch (\Exception $e) {
            Log::write('error', $e);

            return false;
        }
    }

    public function importSingle(array $data): bool
    {
        $existed = $this->where(['ip' => $data['ip'], 'port' => $data['port']])->first();

        try {
            if ($existed) {
                $existed->update($data);
                $existed->save();
            } else {
                $this->create($data);
            }

            return true;
        } catch (\Exception $e) {
            Log::write('error', $e);
            return false;
        }
    }

    public function importMultiple(array $listdata): bool
    {

        try {
            foreach ($listdata as $data) {
                $this->importSingle($data);
            }
            return true;
        } catch (\Exception $e) {
            Log::write('error', $e);
            return false;
        }
    }

    public function updateOne(array $data, $id): bool
    {
        $existed = $this->find($id);

        if (!$existed) {
            return false;
        }

        $existed->update($data);
        $existed->save();

        return true;

    }

    public function getPremiumProxies(array $data, $user,  $page = 1, $limit = 100): bool | array
    {
        if (!$order = $this->checkGetPremiumProxy($data)) {
            return false;
        }

        $orderPlan = $order->orderPlans->first();
        $amount = $orderPlan->plan->amount;

        $condition = [];
        if ($orderPlan->geo_key !== 'ALL') {
            $condition['geo_local'] = $orderPlan->geo_key;
            $condition['is_vip'] = $orderPlan->plan->is_vip;
        }

        if (!$user) {
            $condition['status'] = 'LIVE';
        }

        $take = min($amount, $limit);

        $query = Proxy::where($condition)
            ->whereIn('type', explode(',', $orderPlan->proxy_type))
            ->select('ip', 'port', 'geo_local', 'ms', 'type', 'is_vip', 'username', 'password', 'status');

        $list = $query->skip(($page - 1) * $take)->take($take);

        return  [
            'list' => $list->get()->toArray() ?? [],
            'total' => min($query->take($amount)->count(), $amount)
        ];
    }

    public function getSinglePremiumProxy(array $data, $user): bool | array
    {
        if (!$order = $this->checkGetPremiumProxy($data)) {
            return false;
        }

        $orderPlan = $order->orderPlans->first();
        $condition = [];
        if ($orderPlan->geo_key !== 'ALL') {
            $condition['geo_local'] = $orderPlan->geo_key;
        }

        if (!$user) {
            $condition['status'] = 'LIVE';
        }

        $list = Proxy::where($condition)
            ->whereIn('type', explode(',', $orderPlan->proxy_type))
            ->select('ip', 'port', 'geo_local', 'ms', 'type')
            ->take($orderPlan->plan->amount)->get()->toArray();

        return $list[array_rand($list)];
    }

    private function checkGetPremiumProxy($data): bool | Order
    {
        $key = $data['key'];
        $order = Order::whereHas('key', function($query) use($key) {
            $query->where(['key' =>  $key]);
        })->first();

        // Key invalid
        if (!$order) {
            return false;
        }

        // Key expired
        if ($order->key->expired_at < Carbon::now()) {
            return false;
        }

        return $order;
    }
}
