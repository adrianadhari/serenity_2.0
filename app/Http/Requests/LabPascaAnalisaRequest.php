<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LabPascaAnalisaRequest extends FormRequest
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
            'tanggal_pasca_analisa' => ['required', 'date'],
            'invoice_pelunasan' => ['mimetypes:application/pdf', 'max:2048', 'nullable'],
            'bukti_pembayaran' => ['mimetypes:application/pdf', 'max:2048', 'nullable'],
            'lembar_hasil_uji' => ['mimetypes:application/pdf', 'max:2048', 'nullable'],
            'kode_pra_analisa' => ['required', 'exists:lab_pra_analisas,kode'],
        ];
    }
}
