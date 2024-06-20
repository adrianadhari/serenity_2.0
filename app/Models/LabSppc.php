<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabSppc extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function labPraAnalisa()
    {
        return $this->belongsTo(LabPraAnalisa::class);
    }
}
