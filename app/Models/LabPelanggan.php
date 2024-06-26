<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabPelanggan extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->kode = self::generateUniqueCode();
        });
    }

    private static function generateUniqueCode()
    {
        do {
            $code = 'LP' . time();
        } while (self::where('kode', $code)->exists());

        return $code;
    }

    public function peminjamanAlat()
    {
        $this->hasMany(PeminjamanAlat::class);
    }

    public function labPraAnalisa()
    {
        return $this->hasMany(LabPraAnalisa::class);
    }
}
