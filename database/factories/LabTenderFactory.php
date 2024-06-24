<?php

namespace Database\Factories;

use App\Models\LabPraAnalisa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LabTender>
 */
class LabTenderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'parameter_uji' => fake()->word,
            'jenis_sampel' => fake()->word,
            'metode' => fake()->word,
            'peralatan' => fake()->word,
            'personel' => fake()->boolean,
            'bahan' => fake()->boolean,
            'qc' => fake()->boolean,
            'kondisi_akomodasi' => fake()->boolean,
            'kesimpulan' => fake()->word,
            'lab_pra_analisa_id' => LabPraAnalisa::inRandomOrder()->first()->id,
        ];
    }
}
