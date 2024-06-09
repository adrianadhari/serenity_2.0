<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->kode_pelatihan = self::generateUniqueCode();
        });
    }

    private static function generateUniqueCode()
    {
        do {
            $code = 'TRA' . time();
        } while (self::where('kode_pelatihan', $code)->exists());

        return $code;
    }

    public function employee()
    {
        return $this->hasMany(Employee::class);
    }
}
