<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class PeminjamanRequest extends FormRequest
{
    protected $status_tarif;
    protected $status_peminjaman;

    public function __construct()
    {
        $this->status_tarif = Config::get('constantsdata.status_tarif');
        $this->status_peminjaman = Config::get('constantsdata.status_peminjaman');
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
            'tujuan_peminjaman' => ['required', 'string', 'max:255'],
            'tanggal_peminjaman' => ['required', 'date'],
            'tanggal_pengembalian' => "",
            'estimasi_tanggal_pengembalian' => ['required', 'date'],
            'jumlah' => ['required', 'integer'],
            'keterangan' => ['required', 'string'],
            'status_tarif' => ['required', Rule::in($this->status_tarif)],
            'status_peminjaman' => ['required', Rule::in($this->status_peminjaman)],
            'jumlah_invoice' => ['required', 'integer'],
            'surat_masuk' => ['mimetypes:application/pdf', 'max:2048', 'nullable'],
            'surat_balasan' => ['mimetypes:application/pdf', 'max:2048', 'nullable'],
            'invoice_pelunasan' => ['mimetypes:application/pdf', 'max:2048', 'nullable'],
            'bukti_pembayaran' => ['mimetypes:application/pdf', 'max:2048', 'nullable'],
            'kontrak_peminjaman_alat' => ['mimetypes:application/pdf', 'max:2048', 'nullable'],
            'form_serah_terima_alat' => ['mimetypes:application/pdf', 'max:2048', 'nullable'],
            'nama_alat' => ['required', 'exists:alats,nama_alat'],
            'nama_pelanggan' => ['required', 'exists:lab_pelanggans,nama_pelanggan'],
        ];
    }
}
