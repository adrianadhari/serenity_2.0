<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class LabPraAnalisaRequest extends FormRequest
{
    protected $jenis_pelayanan;
    protected $status_tarif;

    public function __construct()
    {
        $this->jenis_pelayanan = Config::get('constantsdata.jenis_pelayanan');
        $this->status_tarif = Config::get('constantsdata.status_tarif');
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tujuan_kegiatan' => ['required', 'max:255', 'string'],
            'pelayanan' => ['required', Rule::in($this->jenis_pelayanan)],
            'jenis_analisis' => ['required', 'max:255', 'string'],
            'status_tarif' => ['required', Rule::in($this->status_tarif)],
            'surat_masuk' => ['nullable', 'file', 'mimes:pdf', 'max:2048'],
            'surat_balasan' => ['nullable', 'file', 'mimes:pdf', 'max:2048'],
            'invoice_dp' => ['nullable', 'file', 'mimes:pdf', 'max:2048'],
            'bukti_bayar_dp' => ['nullable', 'file', 'mimes:pdf', 'max:2048'],
            'jumlah_invoice' => ['nullable', 'integer'],
            'permintaan_tender' => ['nullable', 'file', 'mimes:pdf', 'max:2048'],
            'sppc' => ['nullable', 'file', 'mimes:pdf', 'max:2048'],
            'buku_agenda' => ['nullable', 'file', 'mimes:pdf', 'max:2048'],
            'contoh_uji' => ['nullable', 'max:255', 'string'],
            'pelanggan_name' => ['required', 'exists:lab_pelanggans,nama_pelanggan']
        ];
    }
}
