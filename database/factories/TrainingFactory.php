<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;


class TrainingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'nama_pelatihan' => fake()->sentence,
            'institusi' => fake()->sentence,
            'trainer' => fake()->name,
            'unit_pengusul' => fake()->sentence,
            'tanggal_mulai' => Carbon::now()->format('Y-m-d'),
            'tanggal_akhir' => Carbon::now()->format('Y-m-d'),
        ];
    }
}
