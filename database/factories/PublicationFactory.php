<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Publication>
 */
class PublicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tipe = Config::get('constantsdata.tipe');
        $status = Config::get('constantsdata.status_publikasi');

        return [
            'judul' => fake()->sentence,
            'tipe' => fake()->randomElement($tipe),
            'haki' => fake()->numerify('#########'),
            'status' => fake()->randomElement($status),
        ];
    }
}
