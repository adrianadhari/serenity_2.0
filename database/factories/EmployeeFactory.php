<?php

namespace Database\Factories;

use App\Models\Training;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Research>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'nama_peserta' => fake()->name,
            'nik_peserta' => fake()->randomNumber(5, true),
            'jabatan_saat_pelatihan' => fake()->sentence,
            'unit_saat_pelatihan' => fake()->sentence,
            'jabatan_saat_ini' => fake()->sentence,
            'unit_saat_ini' => fake()->sentence,
            'masa_berlaku_sertifikat' => Carbon::now()->format('Y-m-d'),
            'masa_berakhir_sertifikat' => Carbon::now()->format('Y-m-d'),
            'link_sertifikat' => "https://drive.google.com/",
            'training_id' => Training::inRandomOrder()->first()->id,
        ];
    }
}
