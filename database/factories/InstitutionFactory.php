<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;

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
        $negara = Config::get('constantsdata.negara');
        $grup = Config::get('constantsdata.grup');
        $jenis = Config::get('constantsdata.jenis');

        return [
            'kode' => 'IN' . fake()->unique()->numerify('###'),
            'nama' => fake()->company,
            'negara' => fake()->randomElement($negara),
            'grup' => fake()->randomElement($grup),
            'jenis' => fake()->randomElement($jenis),
            'alamat' => fake()->address,
            'telp' => fake()->numerify('#########'),
            'email' => fake()->safeEmail,
        ];
    }
}
