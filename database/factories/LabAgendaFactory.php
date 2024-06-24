<?php

namespace Database\Factories;

use App\Models\LabPraAnalisa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LabAgenda>
 */
class LabAgendaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tgl_terima_sampel' => fake()->date,
            'jumlah_sampel' => fake()->numberBetween(1, 100),
            'kode_lab' => fake()->numberBetween(1, 1000),
            'nama_koresponden' => fake()->name,
            'jenis_sampel' => fake()->word,
            'jam_pengambilan_sampel' => fake()->time,
            'hemolis' => fake()->boolean,
            'lipemik' => fake()->boolean,
            'ikterus' => fake()->boolean,
            'volume' => fake()->numberBetween(1, 1000),
            'cair' => fake()->boolean,
            'dingin' => fake()->boolean,
            'no_box' => fake()->numberBetween(1, 100),
            'cup_asam' => fake()->boolean,
            'cup_gelap' => fake()->boolean,
            'f80' => fake()->word,
            'f20' => fake()->word,
            'keterangan' => fake()->word,
            'lab_pra_analisa_id' => LabPraAnalisa::inRandomOrder()->first()->id,
        ];
    }
}
