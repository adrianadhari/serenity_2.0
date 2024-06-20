<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeminjamanAlat extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->kode_peminjaman = self::generateUniqueCode();
        });
    }

    private static function generateUniqueCode()
    {
        do {
            $code = 'REN' . time();
        } while (self::where('kode_peminjaman', $code)->exists());

        return $code;
    }

    public function labPelanggan()
    {
        return $this->belongsTo(LabPelanggan::class);
    }

    public function alat()
    {
        return $this->belongsTo(Alat::class);
    }
}
