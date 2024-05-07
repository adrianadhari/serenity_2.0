<?php

namespace App\Imports;

use App\Models\School;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;

class SchoolImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new School([
            'kode_sekolah' => 'S' . time(),
            'nama_sekolah' => $row[0],
            'kategori_sekolah' => $row[1],
            'jenis_sekolah' => $row[2],
            'tipe_sekolah' => $row[3],
            'provinsi' => $row[4],
            'kota' => $row[5],
            'alamat_sekolah' => $row[6],
            'nama_kontak' => $row[7],
            'telp' => $row[8],
            'email' => $row[9],
            'tgl_registrasi' => Carbon::now()->format('Y-m-d')
        ]);
    }
}
