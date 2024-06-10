<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LabPelanggan>
 */
class LabPelangganFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $lab_instansi = Config::get('constantsdata.lab_instansi');
        $gender = Config::get('constantsdata.gender');

        return [
            'instansi' => fake()->randomElement($lab_instansi),
            'nama_instansi' => fake()->company,
            'nama_pelanggan' => fake()->name,
            'alamat' => fake()->address,
            'telp' => fake()->numerify('#########'),
            'tgl_lahir' => now(),
            'jenis_kelamin' => fake()->randomElement($gender),
            'email' => fake()->safeEmail,
        ];
    }
}
