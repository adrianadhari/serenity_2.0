<?php

namespace App\Imports;

use App\Models\School;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SchoolImport implements ToCollection, WithHeadingRow
{
    protected $schools;
    protected $categories;
    protected $types;

    public function __construct()
    {
        $this->schools = Config::get('constantsdata.school');
        $this->categories = Config::get('constantsdata.category');
        $this->types = Config::get('constantsdata.type');
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function collection(Collection $rows)
    {
        Validator::make($rows->toArray(), [
            '*.nama_sekolah' => ['required', 'string', 'max:255', 'unique:schools,nama_sekolah', 'distinct'],
            '*.kategori_sekolah' => ['required', Rule::in($this->categories)],
            '*.jenis_sekolah' => ['required', Rule::in($this->schools)],
            '*.tipe_sekolah' => ['required', Rule::in($this->types)],
            '*.provinsi' => ['required', 'max:255'],
            '*.kota' => ['required', 'max:255'],
            '*.alamat_sekolah' => ['required', 'string'],
            '*.nama_kontak' => ['required', 'max:255', 'string'],
            '*.telp' => ['required', 'max:13'],
            '*.email' => ['required', 'string', 'lowercase', 'email', 'max:255']
        ])->validate();

        foreach ($rows as $row) {
            School::create([
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
}
