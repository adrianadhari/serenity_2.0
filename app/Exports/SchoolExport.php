<?php

namespace App\Exports;

use App\Models\School;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class SchoolExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return School::latest()->get();
    }

    public function headings(): array
    {
        return [
            'Kode Sekolah',
            'Nama Sekolah',
            'Kategori Sekolah',
            'Jenis Sekolah',
            'Tipe Sekolah',
            'Alamat Sekolah',
            'Provinsi',
            'Kota',
            'Nama Kontak',
            'Nomor Telepon',
            'Email',
            'Tanggal Registrasi'
        ];
    }

    public function map($row): array
    {
        return [
            $row->kode_sekolah,
            $row->nama_sekolah,
            $row->kategori_sekolah,
            $row->jenis_sekolah,
            $row->tipe_sekolah,
            $row->alamat_sekolah,
            $row->provinsi,
            $row->kota,
            $row->nama_kontak,
            $row->telp,
            $row->email,
            Carbon::parse($row->created_at)->format('Y-m-d')
        ];
    }
}
