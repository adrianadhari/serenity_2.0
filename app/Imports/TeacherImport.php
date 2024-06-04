<?php

namespace App\Imports;

use App\Models\School;
use App\Models\Teacher;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class TeacherImport implements ToCollection, WithHeadingRow
{
    protected $gender;
    protected $pendidikan;

    public function __construct()
    {
        $this->gender = Config::get('constantsdata.gender');
        $this->pendidikan = Config::get('constantsdata.pendidikan');
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function collection(Collection $rows)
    {
        Validator::make($rows->toArray(), [
            '*.nama_guru' => ['required', 'max:255', 'string'],
            '*.nip' => ['required', 'max:20', 'unique:teachers,nip', 'distinct'],
            '*.jenis_kelamin' => ['required', Rule::in($this->gender)],
            '*.email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            '*.telp' => ['required', 'max:13'],
            '*.jabatan' => ['required', 'max:255', 'string'],
            '*.pendidikan' => ['required', Rule::in($this->pendidikan)],
            '*.asal_sekolah' => ['required', 'exists:schools,nama_sekolah'],
        ])->validate();

        foreach ($rows as $row) {
            $school_id = School::where('nama_sekolah', $row['asal_sekolah'])->pluck('id')->first();

            Teacher::create([
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
}
