<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
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
            $code = 'INS' . time();
        } while (self::where('kode', $code)->exists());

        return $code;
    }

    public function pesertaKegiatans()
    {
        return $this->hasMany(PesertaKegiatan::class);
    }

    public function partnerships()
    {
        return $this->belongsToMany(Partnership::class);
    }
}
