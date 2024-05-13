<?php

namespace Database\Seeders;

use App\Models\Institution;
use App\Models\School;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'username' => 'admin',
            'role' => 'admin',
            'password' => Hash::make('admin'),
        ]);

        School::factory(20)->create();
        Institution::factory(20)->create();
    }
}
