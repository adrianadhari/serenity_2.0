<?php

namespace App\Exports;

use Illuminate\Support\Facades\Config;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Cell\DataValidation;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class TemplateSchoolExport implements FromArray, WithEvents, WithStyles
{
    public function array(): array
    {
        return [
            ['Nama Sekolah', 'Kategori Sekolah', 'Jenis Sekolah', 'Tipe Sekolah', 'Provinsi', 'Kota', 'Alamat Sekolah', 'Nama Kontak', 'Telp', 'Email'],
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();

                $schools = Config::get('constantsdata.school');
                $categories = Config::get('constantsdata.category');
                $types = Config::get('constantsdata.type');

                $this->addDropdown($sheet, 'B', $categories);
                $this->addDropdown($sheet, 'C', $schools);
                $this->addDropdown($sheet, 'D', $types);
            },
        ];
    }

    private function addDropdown($sheet, $column, $data)
    {
        $validation = $sheet->getCell($column . '1')->getDataValidation();
        $validation->setType(DataValidation::TYPE_LIST);
        $validation->setErrorStyle(DataValidation::STYLE_INFORMATION);
        $validation->setAllowBlank(false);
        $validation->setShowInputMessage(true);
        $validation->setShowErrorMessage(true);
        $validation->setShowDropDown(true);
        $validation->setFormula1('"' . implode(',', $data) . '"');

        for ($i = 1; $i <= 1000; $i++) {
            $sheet->getCell($column . $i)->setDataValidation(clone $validation);
        }
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1    => ['font' => ['bold' => true]],
        ];
    }
}
