<?php

namespace App\Imports;

use App\Models\School;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SchoolImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new School([
            'nama_sekolah' => $row['nama_sekolah'],
            'kategori_sekolah' => $row['kategori_sekolah'],
            'jenis_sekolah' => $row['jenis_sekolah'],
            'tipe_sekolah' => $row['tipe_sekolah'],
            'provinsi' => $row['provinsi'],
            'kota' => $row['kota'],
            'alamat_sekolah' => $row['alamat_sekolah'],
            'nama_kontak' => $row['nama_kontak'],
            'telp' => $row['telp'],
            'email' => $row['email'],
        ]);
    }
}
