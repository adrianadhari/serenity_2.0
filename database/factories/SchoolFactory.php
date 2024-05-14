<?php

namespace Database\Factories;

use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\School>
 */
class SchoolFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $schoolData = School::getSchoolData();

        $schoolTypes = $schoolData['school'];
        $categories = $schoolData['category'];
        $types = $schoolData['type'];

        return [
            'kode_sekolah' => 'SC' . fake()->unique()->numerify('###'),
            'nama_sekolah' => fake()->unique()->company,
            'kategori_sekolah' => $categories[array_rand($categories)],
            'jenis_sekolah' => $schoolTypes[array_rand($schoolTypes)],
            'tipe_sekolah' => $types[array_rand($types)],
            'provinsi' => fake()->state,
            'kota' => fake()->city,
            'alamat_sekolah' => fake()->address,
            'nama_kontak' => fake()->name,
            'telp' => fake()->numerify('#########'),
            'email' => fake()->safeEmail,
        ];
    }
}
