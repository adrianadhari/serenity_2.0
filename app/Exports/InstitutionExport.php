<?php

namespace App\Exports;

use App\Models\Institution;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class InstitutionExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Institution::latest()->get();
    }

    public function headings(): array
    {
        return [
            'Kode',
            'Nama',
            'Negara',
            'Grup',
            'Jenis',
            'Alamat',
            'Nomor Telepon',
            'Email',
            'Tanggal Registrasi'
        ];
    }

    public function map($row): array
    {
        return [
            $row->kode,
            $row->nama,
            $row->negara,
            $row->grup,
            $row->jenis,
            $row->alamat,
            $row->telp,
            $row->email,
            Carbon::parse($row->created_at)->format('Y-m-d')
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1    => ['font' => ['bold' => true]],
        ];
    }
}
