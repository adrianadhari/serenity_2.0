<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class PartnershipRequest extends FormRequest
{
    protected $kategori_kemitraan;
    protected $status_kemitraan;

    public function __construct()
    {
        $this->kategori_kemitraan = Config::get('constantsdata.kategori_kemitraan');
        $this->status_kemitraan = Config::get('constantsdata.status_kemitraan');
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
            'nomor' => ['required', 'max:255', 'unique:partnerships,nomor'],
            'kategori' => ['required', Rule::in($this->kategori_kemitraan)],
            'judul' => ['required', 'string', 'max:255'],
            'status' => ['required', Rule::in($this->status_kemitraan)],
            'tgl_awal' => ['required', 'date'],
            'tgl_akhir' => ['required', 'date'],
            'notifikasi' => ['required', 'integer'],
            'dok_kerjasama' => ['nullable', 'file', 'mimes:pdf', 'max:2048'],
            'dok_roadmap' => ['nullable', 'file', 'mimes:pdf', 'max:2048'],
            'nama_penandatangan' => ['required', 'string', 'max:255'],
            'jabatan_penandatangan' => ['required', 'string', 'max:255'],
            'ruang_lingkup' => ['required', 'string'],
            'institutions' => ['required', 'array'],
            'institutions.*' => ['exists:institutions,id'],
        ];
    }
}
