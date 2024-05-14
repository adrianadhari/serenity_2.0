<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public static function getSchoolData(): array
    {
        return [
            'school' => [
                "KB (Kelompok Bermain)",
                "PAUD",
                "TK (Taman Kanak-Kanak)",
                "SD",
                "SMP",
                "SMA",
                "SMK",
                "SPS",
                "MI",
                "MTS",
                "MA",
                "RA (Raudhatul Athfal)",
                "DINAS",
                "Universitas",
                "Lainnya",
            ],

            'category' => ["Madya", "Utama", "Pari Purna"],

            'type' => ["NEGERI", "SWASTA"],
        ];
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
