<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration //Crée une classe de migration anonyme qui hérite de Migration 
{
    public function up(): void // La fonction up = ce qu'on fait quand on applique la migration
    {
        Schema::table('users', function (Blueprint $table) { //Schema = l'outil Laravel pour modifier les tables //Blueprint $table = objet qui représente la structure de la table

            $table->enum('role', [ 
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