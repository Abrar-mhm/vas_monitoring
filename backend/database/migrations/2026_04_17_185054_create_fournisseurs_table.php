<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('FOURNISSEURS', function (Blueprint $table) {
            $table->id();
            $table->string('PROVIDER_NAME', 100)->unique();
            $table->string('NATIONALITE', 100)->nullable();
            $table->string('ID_FISCALE', 50)->unique()->nullable();
            $table->string('ADRESSE', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('FOURNISSEURS');
    }
};