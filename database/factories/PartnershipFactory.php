<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Partnership>
 */
class PartnershipFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $kategori_kemitraan = Config::get('constantsdata.kategori_kemitraan');
        $status_kemitraan = Config::get('constantsdata.status_kemitraan');

        return [
            'nomor' => fake()->unique()->numerify('#####'),
            'kategori' => fake()->randomElement($kategori_kemitraan),
            'judul' => fake()->sentence,
            'status' => fake()->randomElement($status_kemitraan),
            'tgl_awal' => fake()->date,
            'tgl_akhir' => fake()->date,
            'notifikasi' => fake()->numberBetween(1, 90),
            'nama_penandatangan' => fake()->name,
            'jabatan_penandatangan' => fake()->jobTitle,
            'ruang_lingkup' => fake()->paragraph,
        ];
    }
}
