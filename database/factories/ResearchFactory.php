<?php

namespace Database\Factories;

use App\Models\Institution;
use App\Models\Publication;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Research>
 */
class ResearchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $kategori_penelitian = Config::get('constantsdata.kategori_penelitian');
        $jenis_flagship = Config::get('constantsdata.jenis_flagship');
        $area_penelitian = Config::get('constantsdata.area_penelitian');
        $status_penelitian = Config::get('constantsdata.status_penelitian');

        return [
            'judul_penelitian' => fake()->sentence,
            'kategori_penelitian' => fake()->randomElement($kategori_penelitian),
            'jenis_flagship' => fake()->randomElement($jenis_flagship),
            'area_penelitian' => fake()->randomElement($area_penelitian),
            'subjek_penelitian' => fake()->sentence,
            'nama_area_flagship' => fake()->word,
            'lokasi_penelitian' => fake()->word,
            'nama_penyelia' => fake()->name,
            'jenis_hibah' => fake()->word,
            'besaran_hibah' => fake()->word,
            'nama_funding' => fake()->name,
            'nama_peneliti' => fake()->name,
            'sub_area_penelitian' => fake()->word,
            'author' => fake()->name,
            'bulan_dipublikasi' => fake()->monthName,
            'doi' => fake()->word,
            'status_penelitian' => fake()->randomElement($status_penelitian),
            'institution_id' => Institution::inRandomOrder()->first()->id,
            'publication_id' => Publication::inRandomOrder()->first()->id,
        ];
    }
}
