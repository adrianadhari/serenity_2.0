<?php

namespace Database\Factories;

use App\Models\Institution;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Participant>
 */
class ParticipantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = Config::get('constantsdata.gender');
        $tipe_peserta = Config::get('constantsdata.tipe_peserta');
        $pendidikan = Config::get('constantsdata.pendidikan');

        return [
            'email' => fake()->safeEmail,
            'institution_id' => Institution::inRandomOrder()->first()->id,
            'jabatan' => fake()->sentence,
            'jenis_kelamin' => fake()->randomElement($gender),
            'nama_peserta' => fake()->name,
            'pendidikan' => fake()->randomElement($pendidikan),
            'telp' => fake()->numerify('#########'),
            'tipe_peserta' => fake()->randomElement($tipe_peserta),
        ];
    }
}
