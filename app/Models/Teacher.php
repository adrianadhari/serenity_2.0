<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
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
            $code = 'TCH' . time();
        } while (self::where('kode', $code)->exists());

        return $code;
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function pesertaKegiatans()
    {
        return $this->hasMany(PesertaKegiatan::class);
    }
}
