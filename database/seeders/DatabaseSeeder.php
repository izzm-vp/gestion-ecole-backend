<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


       // \App\Models\User::factory(10)->create();


       \App\Models\Admin::factory()->create([
        'nom' => 'Admin',
        'prenom' => 'Admin',
        'phone' =>substr(fake()->phoneNumber(),10),
        'email' => 'admin@admin.admin',
        'password' => bcrypt('123456789'),
    ]);
       \App\Models\Enseignant::factory()->create([
        'nom' => 'Enseignant',
        'prenom' => 'Enseignant',
        'specialite'=>'dev FS',
        'dateDeNaissance' =>  fake()->date(),
        'address' => fake()->address(),
        'phone' =>substr(fake()->phoneNumber(),10),
        'email' => 'enseignant@enseignant.enseignant',
        'password' => bcrypt('123456789'),
    ]);
        \App\Models\User::factory()->create([
            'name' => 'Baacine',
            'email' => 'mohamedbaacine@example.com',
            'password' => bcrypt('123456789'),
            'prenom' => 'Mohamed',
            'dateDeNaissance' => '1990-01-01',
            'address' => 'Marjan Tanger',
            'enseignant_id' => 1,
        ]);
    }
}
