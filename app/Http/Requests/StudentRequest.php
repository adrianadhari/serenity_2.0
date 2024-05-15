<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentRequest extends FormRequest
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
            'nama_siswa' => ['required', 'max:255', 'string'],
            'nis' => ['required', 'max:20', 'string'],
            'jenis_kelamin' => ['required', 'in:Pria,Wanita'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'telp' => ['required', 'max:13', 'string'],
            'nama_wali' => ['required', 'max:255', 'string'],
            'keterangan' => ['string'],
            'school_name' => ['required', 'exists:schools,nama_sekolah'],
        ];
    }
}
