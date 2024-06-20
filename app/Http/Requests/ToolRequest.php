<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class ToolRequest extends FormRequest
{
    protected $kategori_alat;
    protected $status_bmn;
    protected $sumber_dana;

    public function __construct()
    {
        $this->kategori_alat = Config::get('constantsdata.kategori_alat');
        $this->status_bmn = Config::get('constantsdata.status_bmn');
        $this->sumber_dana = Config::get('constantsdata.sumber_dana');
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
            'kategori_alat' => ['required', Rule::in($this->kategori_alat)],
            'nama_alat' => ['required', 'max:255', 'string'],
            'merk' => ['required', 'max:255', 'string'],
            'nomor_serial' => ['required', 'integer'],
            'deskripsi_alat' => ['required', 'string'],
            'status_bmn' => ['required', Rule::in($this->status_bmn)],
            'kode_bmn' => ['unique:alats', 'nullable'],
            'sumber_dana' => ['required', Rule::in($this->sumber_dana)],
            'tahun_perolehan' => ['required', 'max:4', 'string'],
            'harga_perolehan' => ['required', 'integer'],
            'kalibrasi_terakhir' => ['required'],
            'service_terakhir' => ['required'],
            'keterangan_service_terakhir' => ['required', 'string'],
        ];
    }
}
