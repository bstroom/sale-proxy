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
            if ($ip && $port && $geo && $ms) {
                $importList[] = [
                    'ip' => $ip,
                    'port' => $port,
                    'geo_local' => $geo,
                    'ms' => $ms,
                    'type' => $type,
                    'created_at' => Carbon::now()->toDateTime(),
                    'updated_at' => Carbon::now()->toDateTime()
                ];
            }
        }

        if (count($importList) === 0) {
            return false;
        }

        try {
            Proxy::where(['type' => $type])->delete();

            foreach (array_chunk($importList,1000) as $t)
            {
                Proxy::insert($t);
            }


            return true;
        } catch (\Exception $e) {
            Log::error($e);

            return false;
        }
    }


    public function getPremiumProxies(array $data): bool | array
    {
        if (!$order = $this->checkGetPremiumProxy($data)) {
            return false;
        }

        $orderPlan = $order->orderPlans->first();
        $condition = [];
        if ($orderPlan->geo_key !== 'ALL') {
            $condition['geo_local'] = $orderPlan->geo_key;
        }

        $list = Proxy::where($condition)
            ->whereIn('type', explode(',', $orderPlan->proxy_type))
            ->select('ip', 'port', 'geo_local', 'ms', 'type')
            ->take($orderPlan->plan->amount);

        return $list->get()->toArray() ?? [];
    }

    public function getSinglePremiumProxy(array $data): bool | array
    {
        if (!$order = $this->checkGetPremiumProxy($data)) {
            return false;
        }

        $orderPlan = $order->orderPlans->first();
        $condition = [];
        if ($orderPlan->geo_key !== 'ALL') {
            $condition['geo_local'] = $orderPlan->geo_key;
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
