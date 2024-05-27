<?php

namespace App\Imports;

use App\Models\School;
use App\Models\Student;
use Maatwebsite\Excel\Concerns\ToModel;

class StudentImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        $school_id = School::where('nama_sekolah', $row['nama_sekolah'])->pluck('id')->first();

        return new Student([
            'nama_siswa' => $row['nama_siswa'],
            'nis' => $row['nis'],
            'jenis_kelamin' => $row['jenis_kelamin'],
            'nama_wali' => $row['nama_wali'],
            'keterangan' => $row['keterangan'],
            'telp' => $row['telp'],
            'email' => $row['email'],
            'school_id' => $school_id
        ]);
    }
}
