<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('historique_users', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('user_id');
        $table->string('action');
        $table->string('ancienne_valeur')->nullable();
        $table->string('nouvelle_valeur')->nullable();
        $table->string('modifie_par');
        $table->timestamps();

        $table->foreign('user_id')
              ->references('id')
              ->on('users')
              ->onDelete('cascade');
    });
}

public function down(): void
{
    Schema::dropIfExists('historique_users');
}
};
