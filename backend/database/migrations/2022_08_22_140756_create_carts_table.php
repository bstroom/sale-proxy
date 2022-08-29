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
        Schema::create('carts', function (Blueprint $table) {
            $table->bigInteger('id')->index();
            $table->string('name');
            $table->string('slug');
            $table->integer('amount');
            $table->enum('type', ['WEEK', 'MONTH', 'YEAR']);
            $table->enum('proxy_type', ['HTTP', 'SOCKS4', 'SOCKS5']);
            $table->float('price');
            $table->text('description');
            $table->dateTime('deleted_at');
            $table->timestamps();

            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('plan_id')->references('id')->on('plans');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carts');
    }
};
