<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UsersController;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\PlanController;
use App\Http\Controllers\API\GeoController;
use App\Http\Controllers\API\IncomePaymentController;
use App\Http\Controllers\API\UserPaymentController;
use App\Http\Controllers\API\BudgetController;
use App\Http\Controllers\API\OrdersController;
use App\Http\Controllers\API\ProxyController;
use App\Http\Controllers\API\ConfigController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\UserProxyController;
use App\Http\Controllers\API\UserPaymentHistoryController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'jwt'], function() {
    Route::group(['prefix' => 'profile', 'controller' => ProfileController::class], function () {
        Route::get('me', 'show');
        Route::post('me', 'edit');
    });

    Route::group(['prefix' => 'plans', 'controller' => PlanController::class], function () {
        Route::get('', 'index');
        Route::post('', 'store')->middleware(['jwt:admin']);
    });

    Route::group(['prefix' => 'geos', 'controller' => GeoController ::class], function () {
        Route::get('', 'index');
    });

    Route::group(['prefix' => 'members', 'controller' => UsersController ::class], function () {
        Route::get('', 'index')->middleware(['jwt:admin']);
    });

    Route::group(['prefix' => 'proxies', 'controller' => ProxyController ::class], function () {
        Route::post('{type}', 'create')->middleware(['jwt:importer']);
        Route::get('', 'index')->middleware(['jwt:admin']);
    });


    Route::group(['prefix' => 'payments'], function () {
        Route::post('recharge', [IncomePaymentController::class, 'create'])->middleware(['jwt:admin']);
        Route::get('user/{code}', [UserPaymentController::class, 'show'])->middleware(['jwt:admin']);
        Route::get('budget', [BudgetController::class, 'show']);
        Route::get('history', [UserPaymentHistoryController::class, 'show']);
    });
    Route::group(['prefix' => 'orders', 'controller' => OrdersController::class], function () {
        Route::post('', 'create')->middleware(['jwt:admin']);
        Route::get('', 'index');
    });
    Route::group(['prefix' => 'configs', 'controller' => ConfigController::class], function () {
        Route::post('', 'create');
        Route::get('', 'show');
    });
    Route::group(['prefix' => 'dashboard', 'controller' => DashboardController::class], function () {
        Route::get('', 'index')->middleware(['jwt:admin']);
    });
});

Route::group(['prefix' => 'auth'], function() {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
});


Route::group(['prefix' => 'premium', 'middleware' => 'throttle:100,300', 'controller' => UserProxyController::class], function() {
    Route::get('list-proxy', 'index');
    Route::get('single-proxy', 'show');
});