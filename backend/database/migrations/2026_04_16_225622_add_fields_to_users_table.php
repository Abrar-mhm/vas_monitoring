<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('tel')->nullable()->after('statut');
            $table->string('direction')->nullable()->after('tel');
            $table->string('image')->nullable()->after('direction');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['tel', 'direction', 'image']);
        });
    }
};