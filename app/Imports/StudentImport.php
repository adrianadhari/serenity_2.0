<?php

namespace App\Imports;

use App\Models\School;
use App\Models\Student;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class StudentImport implements ToCollection, WithHeadingRow
{
    protected $gender;

    public function __construct()
    {
        $this->gender = Config::get('constantsdata.gender');
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function collection(Collection $rows)
    {
        Validator::make($rows->toArray(), [
            '*.nama_siswa' => ['required', 'max:255', 'string'],
            '*.nis' => ['required', 'max:20', 'unique:students,nis', 'distinct'],
            '*.jenis_kelamin' => ['required', Rule::in($this->gender)],
            '*.email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            '*.telp' => ['required', 'max:13'],
            '*.nama_wali' => ['required', 'max:255', 'string'],
            '*.keterangan' => ['string'],
            '*.asal_sekolah' => ['required', 'exists:schools,nama_sekolah'],
        ])->validate();

        foreach ($rows as $row) {
            $school_id = School::where('nama_sekolah', $row['asal_sekolah'])->pluck('id')->first();

            Student::create([
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
}
