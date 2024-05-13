<?php

namespace Database\Factories;

use App\Models\Institution;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Institution>
 */
class InstitutionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $institutionData = Institution::getInstitutionData();

        $negara = $institutionData['negara'];
        $grup = $institutionData['grup'];
        $jenis = $institutionData['jenis'];

        return [
            'kode' => fake()->unique()->numerify('###'),
            'nama' => fake()->unique()->company,
            'negara' => $negara[array_rand($negara)],
            'grup' => $grup[array_rand($grup)],
            'jenis' => $jenis[array_rand($jenis)],
            'alamat' => fake()->address,
            'telp' => fake()->phoneNumber,
            'email' => fake()->safeEmail,
        ];
    }
}
