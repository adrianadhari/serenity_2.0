<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class StudentRequest extends FormRequest
{
    protected $gender;

    public function __construct()
    {
        $this->gender = Config::get('constantsdata.gender');
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
            'nama_siswa' => ['required', 'max:255', 'string'],
            'nis' => ['required', 'max:20', 'string', 'unique:students,nis'],
            'jenis_kelamin' => ['required', Rule::in($this->gender)],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'telp' => ['required', 'max:13', 'string'],
            'nama_wali' => ['required', 'max:255', 'string'],
            'keterangan' => ['string'],
            'school_name' => ['required', 'exists:schools,nama_sekolah'],
        ];
    }
}
