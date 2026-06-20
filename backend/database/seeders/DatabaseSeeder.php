<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
        ]);

        // Créer quelques étudiants de test
        \App\Models\Etudiant::create([
            'nom' => 'Dupont',
            'prenom' => 'Jean',
            'numet' => 'ET001',
            'moyenne' => 15.5
        ]);

        \App\Models\Etudiant::create([
            'nom' => 'Martin',
            'prenom' => 'Marie',
            'numet' => 'ET002',
            'moyenne' => 12.0
        ]);

        \App\Models\Etudiant::create([
            'nom' => 'Bernard',
            'prenom' => 'Pierre',
            'numet' => 'ET003',
            'moyenne' => 8.5
        ]);
    }
}
