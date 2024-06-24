<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LabAnalisaUpdateRequest extends FormRequest
{
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
            'tanggal_analisa' => ['required', 'date'],
            'surat_perintah_kerja' => ['mimetypes:application/pdf', 'max:2048', 'nullable'],
            'logbook_hasil' => ['mimetypes:application/pdf', 'max:2048', 'nullable'],
            'jaminan_mutu' => ['mimetypes:application/pdf', 'max:2048', 'nullable'],
            'estimasi_ketidakpastian_pengukuran' => ['mimetypes:application/pdf', 'max:2048', 'nullable'],
            'kode_pra_analisa' => ['required', 'exists:lab_pra_analisas,kode'],
        ];
    }
}
 