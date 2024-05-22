<?php

namespace App\Exports;

use App\Models\Teacher;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class TeacherExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Teacher::latest()->with('school')->get();
    }

    public function headings(): array
    {
        return [
            'Kode Guru',
            'Nama Guru',
            'NIP',
            'Jenis Kelamin',
            'Nomor Telepon',
            'Email',
            'Jabatan',
            'Pendidikan',
            'Asal Sekolah',
            'Tanggal Registrasi'
        ];
    }

    public function map($row): array
    {
        return [
            $row->kode,
            $row->nama,
            $row->nip,
            $row->jenis_kelamin,
            $row->telp,
            $row->email,
            $row->jabatan,
            $row->pendidikan,
            $row->schools->nama_sekolah,
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
