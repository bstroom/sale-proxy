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
        Schema::create('plans', function (Blueprint $table) {
            $table->id('id');
            $table->string('name');
            $table->string('slug')->unique();
            $table->integer('amount');
            $table->enum('type', ['WEEK', 'MONTH', 'YEAR']);
            $table->set('proxy_type', ['HTTP', 'SOCKS4', 'SOCKS5', 'SSH']);
            $table->decimal('price', 11);
            $table->boolean('is_active')->default(true);
            $table->text('description')->nullable();
            $table->dateTime('deleted_at')->nullable();
            $table->timestamps();

            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plans');
    }
};
