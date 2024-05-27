<?php

namespace App\Imports;

use App\Models\School;
use App\Models\Teacher;
use Maatwebsite\Excel\Concerns\ToModel;

class TeacherImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        $school_id = School::where('nama_sekolah', $row['nama_sekolah'])->pluck('id')->first();

        return new Teacher([
            'nama' => $row['nama_guru'],
            'nip' => $row['nip'],
            'jenis_kelamin' => $row['jenis_kelamin'],
            'jabatan' => $row['jabatan'],
            'pendidikan' => $row['pendidikan'],
            'telp' => $row['telp'],
            'email' => $row['email'],
            'school_id' => $school_id
        ]);
    }
}
