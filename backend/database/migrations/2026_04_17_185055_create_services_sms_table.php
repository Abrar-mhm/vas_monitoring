<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('SERVICES_SMS', function (Blueprint $table) {
            $table->id();
            $table->string('NOM_FOURNISSEUR', 100);
            $table->string('NOM_SERVICE', 100);
            $table->string('NUMERO_COURT', 20)->nullable();
            $table->string('KEYWORD', 50)->nullable();
            $table->string('TYPE', 50)->nullable();
            $table->decimal('PRIX', 10, 2)->nullable();
            $table->tinyInteger('ACTIF')->default(1);
            $table->timestamps();
            $table->foreign('NOM_FOURNISSEUR')
                  ->references('PROVIDER_NAME')
                  ->on('FOURNISSEURS')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('SERVICES_SMS');
    }
};