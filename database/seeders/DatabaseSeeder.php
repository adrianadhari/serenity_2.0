<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Institution;
use App\Models\Internship;
use App\Models\Kegiatan;
use App\Models\LabPegawai;
use App\Models\LabPelanggan;
use App\Models\Participant;
use App\Models\Partnership;
use App\Models\Publication;
use App\Models\Research;
use App\Models\School;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Training;
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
        Participant::factory(20)->create();
        Research::factory(20)->create();
        Training::factory(20)->create();
        Employee::factory(200)->create();
        LabPelanggan::factory(20)->create();
        LabPegawai::factory(20)->create();
        Partnership::factory(20)->has(Institution::factory(2))->create();
    }
}
