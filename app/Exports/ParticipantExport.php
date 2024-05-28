<?php

namespace App\Exports;

use App\Models\Participant;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ParticipantExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Participant::latest()->with('institution')->get();
    }

    public function headings(): array
    {
        return [
            'Kode Peserta',
            'Nama Peserta',
            'Tipe Peserta',
            'Pendidikan',
            'Jenis Kelamin',
            'Nomor Telepon',
            'Email',
            'Tanggal Registrasi'
        ];
    }

    public function map($row): array
    {
        return [
            $row->kode_peserta,
            $row->nama_peserta,
            $row->tipe_peserta,
            $row->pendidikan,
            $row->jenis_kelamin,
            $row->telp,
            $row->email,
            $row->institution->nama,
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
