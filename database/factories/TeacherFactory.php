<?php

namespace Database\Factories;

use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = Config::get('constantsdata.gender');
        $pendidikan = Config::get('constantsdata.pendidikan');

        return [
            'nama' => fake()->name,
            'nip' => fake()->unique()->numerify('######'),
            'jenis_kelamin' => fake()->randomElement($gender),
            'email' => fake()->safeEmail,
            'telp' => fake()->numerify('#########'),
            'jabatan' => fake()->jobTitle,
            'pendidikan' => fake()->randomElement($pendidikan),
            'school_id' => School::inRandomOrder()->first()->id,
        ];
    }
}
