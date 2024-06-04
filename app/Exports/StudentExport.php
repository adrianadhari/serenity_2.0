<?php

namespace App\Exports;

use App\Models\Student;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class StudentExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Student::latest()->with('school')->get();
    }

    public function headings(): array
    {
        return [
            'Kode Siswa',
            'Nama Siswa',
            'NIS',
            'Jenis Kelamin',
            'Nomor Telepon',
            'Email',
            'Nama Wali',
            'Keterangan',
            'Asal Sekolah',
            'Tanggal Registrasi'
        ];
    }

    public function map($row): array
    {
        return [
            $row->kode_siswa,
            $row->nama_siswa,
            $row->nis,
            $row->jenis_kelamin,
            $row->telp,
            $row->email,
            $row->nama_wali,
            $row->keterangan,
            $row->school->nama_sekolah,
            Carbon::parse($row->created_at)->format('d/m/Y')
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1    => ['font' => ['bold' => true]],
        ];
    }
}
