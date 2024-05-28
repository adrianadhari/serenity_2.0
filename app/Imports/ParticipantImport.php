<?php

namespace App\Imports;

use App\Models\Institution;
use App\Models\Participant;
use Maatwebsite\Excel\Concerns\ToModel;

class ParticipantImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        $institution_id = Institution::where('nama', $row['nama'])->pluck('id')->first();

        return new Participant([
            'nama_peserta' => $row['nama_siswa'],
            'jenis_kelamin' => $row['jenis_kelamin'],
            'jabatan' => $row['jabatan'],
            'pendidikan' => $row['pendidikan'],
            'tipe_peserta' => $row['tipe_peserta'],
            'telp' => $row['telp'],
            'email' => $row['email'],
            'institution_id' => $institution_id
        ]);
    }
}
