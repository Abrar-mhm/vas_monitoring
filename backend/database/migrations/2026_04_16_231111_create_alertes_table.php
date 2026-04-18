<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ALERTES', function (Blueprint $table) {
            $table->id();
            $table->date('START_DATE')->nullable();
            $table->string('NOM_SERVICE', 100)->nullable();
            $table->string('SC', 20)->nullable();
            $table->string('KEYWORD', 50)->nullable();
            $table->string('NOM_FOURNISSEUR', 100)->nullable();
            $table->decimal('AUGMENTATION', 10, 2)->nullable();
            $table->integer('COUNT_NB_SMS')->nullable();
            $table->string('MOTIF', 255)->nullable();
            $table->tinyInteger('STATUS')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ALERTES');
    }
};