<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->enum('role', [ //ajoute une colonne role qui n'accepte que ces 3 valeurs
            'Administrateur',
            'Analyste Business',
            'Analyste Opérationnel',
        ])->default('Administrateur')->after('password');
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('role');
    });
}
};
