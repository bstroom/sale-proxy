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
        Schema::create('orders_plans', function (Blueprint $table) {
            $table->bigIncrements('id')->index();
            $table->decimal('price', 11);
            $table->integer('quantity')->default(1);
            $table->integer('amount');
            $table->enum('type', ['WEEK', 'MONTH', 'YEAR']);
            $table->set('proxy_type', ['HTTP', 'SOCKS4', 'SOCKS5', 'SSH']);
            $table->string('geo_key')->default('ALL');
            $table->unsignedBigInteger('order_id');

            $table->foreignId('plan_id')->references('id')->on('plans')->onDelete('cascade');
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders_plans');
    }
};
