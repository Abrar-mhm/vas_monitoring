<?php

namespace Database\Seeders; 

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; //permet d'interagir avec la base de données
use Illuminate\Support\Facades\Hash; //permet de crypter le mot de passe 

class AdminSeeder extends Seeder //AdminSeeder hérite de la classe Seeder — il récupère toutes ses fonctionnalités automatiquement.
{
    public function run(): void //C'est la fonction principale du Seeder. Elle s'exécute quand on tape :
//bashphp artisan db:seed --class=AdminSeeder
    {
        DB::table('users')->insert([
            'name'       => 'Administrateur',
            'email'      => 'admin@tunisietelecom.tn',
            'password'   => Hash::make('Admin@123'),
            'role'       => 'Administrateur',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}