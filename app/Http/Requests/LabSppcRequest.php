<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LabSppcRequest extends FormRequest
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
            'kode' => ['required', 'max:255', 'string'],
            'jenis_sampel' => ['required', 'max:255', 'string'],
            'unit_kemasan' => ['required', 'max:255', 'string'],
            'jumlah_sampel' => ['required', 'integer'],
            'parameter_uji' => ['required', 'max:255', 'string'],
            'metode_pengujian' => ['required', 'max:255', 'string'],
            'no_analisis' => ['required', 'integer'],
            'tgl_penerimaan' => ['required', 'date'],
            'tgl_selesai_pengujian' => ['required', 'date'],
        ];
    }
}
