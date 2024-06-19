<?php

namespace Database\Factories;

use App\Models\LabPelanggan;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LabPraAnalisa>
 */
class LabPraAnalisaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jenis_pelayanan = Config::get('constantsdata.jenis_pelayanan');
        $status_tarif = Config::get('constantsdata.status_tarif');

        return [
            'tujuan_kegiatan' => fake()->sentence,
            'pelayanan' => fake()->randomElement($jenis_pelayanan),
            'jenis_analisis' => fake()->sentence,
            'status_tarif' => fake()->randomElement($status_tarif),
            'pelanggan_id' => LabPelanggan::inRandomOrder()->first()->id,
        ];
    }
}
