<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LabTenderRequest extends FormRequest
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
            'parameter_uji' => ['required', 'max:255', 'string'],
            'jenis_sampel' => ['required', 'max:255', 'string'],
            'metode' => ['required', 'max:255', 'string'],
            'peralatan' => ['required', 'max:255', 'string'],
            'personel' => ['required', 'boolean'],
            'bahan' => ['required', 'boolean'],
            'qc' => ['required', 'boolean'],
            'kondisi_akomodasi' => ['required', 'boolean'],
            'kesimpulan' => ['required', 'max:255', 'string'],
        ];
    }
}
