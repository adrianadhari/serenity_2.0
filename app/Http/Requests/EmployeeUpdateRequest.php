<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeUpdateRequest extends FormRequest
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
            'nama_peserta' => ['required', 'max:255', 'string'],
            'nik_peserta' => ['required'],
            'jabatan_saat_pelatihan' => ['required', 'max:255', 'string'],
            'unit_saat_pelatihan' => ['required', 'max:255', 'string'],
            'jabatan_saat_ini' => ['required', 'max:255', 'string'],
            'unit_saat_ini' => ['required', 'max:255', 'string'],
            'masa_berlaku_sertifikat' => ['required', 'max:255'],
            'masa_berakhir_sertifikat' => ['required', 'max:255'],
            'link_sertifikat' => ['required', 'string'],
        ];
    }
}
