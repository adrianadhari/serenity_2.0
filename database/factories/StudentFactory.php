<?php

namespace Database\Factories;

use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode_siswa' => 'ST' . fake()->unique()->numerify('###'),
            'nama_siswa' => fake()->name,
            'nis' => fake()->numerify('######'),
            'school_id' => School::inRandomOrder()->first()->id,
            'email' => fake()->safeEmail,
            'telp' => fake()->numerify('#########'),
            'nama_wali' => fake()->name,
            'jenis_kelamin' => fake()->randomElement(['Pria', 'Wanita']),
            'keterangan' => fake()->sentence,
        ];
    }
}
