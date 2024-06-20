<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alat extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->kode_alat = self::generateUniqueCode();
        });
    }

    private static function generateUniqueCode()
    {
        do {
            $code = 'LAB' . time();
        } while (self::where('kode_alat', $code)->exists());

        return $code;
    }

    public function peminjamanAlat()
    {
        $this->hasMany(PeminjamanAlat::class);
    }
}
