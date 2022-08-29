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
        Schema::create('proxies', function (Blueprint $table) {
            $table->bigIncrements('id')->index();
            $table->string('ip')->nullable();
            $table->integer('port')->nullable();
            $table->string('geo_local')->nullable();
            $table->string('ms')->nullable();
            $table->set('type', ['HTTP', 'SOCKS4', 'SOCKS5', 'SSH'])->nullable();
            $table->text('description')->nullable();
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
        Schema::dropIfExists('proxies');
    }
};
