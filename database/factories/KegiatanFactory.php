<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kegiatan>
 */
class KegiatanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jenis_kegiatan = Config::get('constantsdata.jenis_kegiatan');
        $semester = Config::get('constantsdata.semester');
        $flagship = Config::get('constantsdata.flagship');
        $moda = Config::get('constantsdata.moda');
        $status_kegiatan = Config::get('constantsdata.status_kegiatan');

        return [
            'jenis_kegiatan' => fake()->randomElement($jenis_kegiatan),
            'semester' => fake()->randomElement($semester),
            'judul_kegiatan' => fake()->sentence,
            'jenis_flagship' => fake()->randomElement($flagship),
            'jadwal_mulai' => Carbon::now()->format('Y-m-d\TH:i'),
            'jadwal_selesai' => Carbon::now()->format('Y-m-d\TH:i'),
            'lokasi' => fake()->address,
            'link' => 'https://drive.google.com/drive/',
            'moda' => fake()->randomElement($moda),
            'tentang' => fake()->paragraph,
            'narasumber' => fake()->name,
            'materi' => fake()->paragraph,
            'status' => fake()->randomElement($status_kegiatan),
            'target_peserta' => fake()->numberBetween(0, 100),
            'min_score' => 75
        ];
    }
}
