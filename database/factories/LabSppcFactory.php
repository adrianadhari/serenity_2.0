<?php

namespace Database\Factories;

use App\Models\LabPraAnalisa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LabSppc>
 */
class LabSppcFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode' => fake()->numerify('###'),
            'jenis_sampel' => fake()->word,
            'unit_kemasan' => fake()->word,
            'jumlah_sampel' => fake()->numberBetween(1, 100),
            'parameter_uji' => fake()->word,
            'metode_pengujian' => fake()->word,
            'no_analisis' => fake()->unique()->numberBetween(1, 1000),
            'tgl_penerimaan' => fake()->date,
            'tgl_selesai_pengujian' => fake()->date,
            'lab_pra_analisa_id' => LabPraAnalisa::inRandomOrder()->first()->id,
        ];
    }
}
