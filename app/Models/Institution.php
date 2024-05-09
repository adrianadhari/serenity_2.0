<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public static function getInstitutionData(): array
    {
        return [
            'negara' => ["Indonesia", "Malaysia", "Singapura", "Thailand", "Filipina", "Brunei Darussalam", "Vietnam", "Laos", "Myanmar", "Kamboja", "Timor Leste", "Lainnya"],

            'grup' => ["Akademisi", "Government", "NGO", "Private", "Proffesional", "Research", "Research Institution", "UN Agency", "Lainnya"],

            'jenis' => ["Dinas", "Universitas", "Lainnya"]
        ];
    }
}
