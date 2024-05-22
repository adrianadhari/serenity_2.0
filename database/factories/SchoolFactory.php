<?php

namespace Database\Factories;

use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;

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
        $schools = Config::get('constantsdata.school');
        $categories = Config::get('constantsdata.category');
        $types = Config::get('constantsdata.type');

        $client = new Client();

        $responseProvinces = $client->get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
        $provinces = json_decode($responseProvinces->getBody()->getContents(), true);
        $province = fake()->randomElement($provinces);
        $responseCities = $client->get("https://www.emsifa.com/api-wilayah-indonesia/api/regencies/{$province['id']}.json");
        $cities = json_decode($responseCities->getBody()->getContents(), true);
        $city = fake()->randomElement($cities);

        return [
            'nama_sekolah' => fake()->company,
            'kategori_sekolah' => fake()->randomElement($categories),
            'jenis_sekolah' => fake()->randomElement($schools),
            'tipe_sekolah' => fake()->randomElement($types),
            'provinsi' => $province['name'],
            'kota' => $city['name'],
            'alamat_sekolah' => fake()->address,
            'nama_kontak' => fake()->name,
            'telp' => fake()->numerify('#########'),
            'email' => fake()->safeEmail,
        ];
    }
}
