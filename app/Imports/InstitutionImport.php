<?php

namespace App\Imports;

use App\Models\Institution;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class InstitutionImport implements ToCollection, WithHeadingRow
{
    protected $negara;
    protected $grup;
    protected $jenis;

    public function __construct()
    {
        $this->negara = Config::get('constantsdata.negara');
        $this->grup = Config::get('constantsdata.grup');
        $this->jenis = Config::get('constantsdata.jenis');
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function collection(Collection $rows)
    {
        Validator::make($rows->toArray(), [
            '*.nama_institusi' => ['required', 'string', 'max:255', 'unique:institutions,nama', 'distinct'],
            '*.negara' => ['required', Rule::in($this->negara)],
            '*.grup' => ['required', Rule::in($this->grup)],
            '*.jenis' => ['required', Rule::in($this->jenis)],
            '*.alamat' => ['required', 'string'],
            '*.telp' => ['required', 'max:13'],
            '*.email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
        ])->validate();

        foreach ($rows as $row) {
            Institution::create([
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
}
