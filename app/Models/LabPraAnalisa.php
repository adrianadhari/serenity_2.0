<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabPraAnalisa extends Model
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
            $code = 'PRA' . time();
        } while (self::where('kode', $code)->exists());

        return $code;
    }

    public function labPelanggans()
    {
        return $this->belongsTo(LabPelanggan::class,  'pelanggan_id');
    }

    public function labSppcs()
    {
        return $this->hasMany(LabSppc::class);
    }

    public function labTenders()
    {
        return $this->hasMany(LabTender::class);
    }

    public function labAgendas()
    {
        return $this->hasMany(LabAgenda::class);
    }
}
