<?php

namespace App\Imports;

use App\Models\Institution;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class InstitutionImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Institution([
            'nama' => $row['nama_institusi'],
            'negara' => $row['negara'],
            'grup' => $row['grup'],
            'jenis' => $row['jenis'],
            'alamat' => $row['alamat'],
            'telp' => $row['telp'],
            'email' => $row['email'],
        ]);
    }
}
