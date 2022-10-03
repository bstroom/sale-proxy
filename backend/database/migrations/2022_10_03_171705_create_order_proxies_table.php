<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_proxies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('orders_plans_id');
            $table->unsignedBigInteger('proxy_id');
            $table->foreign('orders_plans_id')->references('id')->on('orders_plans')->onDelete('cascade');
            $table->foreign('proxy_id')->references('id')->on('proxies')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_proxies');
    }
};
