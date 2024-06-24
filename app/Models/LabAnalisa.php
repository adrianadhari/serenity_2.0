<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabAnalisa extends Model
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
            $code = 'SPC' . time();
        } while (self::where('kode', $code)->exists());

        return $code;
    }

    public function labPraAnalisa()
    {
        return $this->belongsTo(LabPraAnalisa::class, 'lab_pra_analisa_id');
    }
}
