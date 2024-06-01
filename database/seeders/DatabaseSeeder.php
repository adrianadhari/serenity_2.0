<?php

namespace Database\Seeders;

use App\Models\Institution;
use App\Models\Internship;
use App\Models\Kegiatan;
use App\Models\Publication;
use App\Models\School;
use App\Models\Student;
use App\Models\Teacher;
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
        Student::factory(20)->create();
        Teacher::factory(20)->create();
        Internship::factory(20)->create();
        Publication::factory(20)->create();
        Kegiatan::factory(20)->create();
    }
}
