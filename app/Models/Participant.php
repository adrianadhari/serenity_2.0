<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->kode_peserta = self::generateUniqueCode();
        });
    }

    private static function generateUniqueCode()
    {
        do {
            $code = 'PT' . time();
        } while (self::where('kode_peserta', $code)->exists());

        return $code;
    }

    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }
}
