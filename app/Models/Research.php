<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Research extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->kode_penelitian = self::generateUniqueCode();
        });
    }

    private static function generateUniqueCode()
    {
        do {
            $code = 'RSC' . time();
        } while (self::where('kode_penelitian', $code)->exists());

        return $code;
    }

    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }

    public function publication()
    {
        return $this->belongsTo(Publication::class);
    }
}
