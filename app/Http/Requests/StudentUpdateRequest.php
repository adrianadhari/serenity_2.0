<?php

namespace App\Http\Requests;

use App\Models\Student;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class StudentUpdateRequest extends FormRequest
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
        $nis = Student::where('kode_siswa', $this->route('siswa'))->firstOrFail();

        return [
            'nama_siswa' => ['required', 'max:255', 'string'],
            'nis' => ['required', 'max:20', 'string', 'unique:students,nis,' . $nis->id],
            'jenis_kelamin' => ['required', Rule::in($this->gender)],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'telp' => ['required', 'max:13', 'string'],
            'nama_wali' => ['required', 'max:255', 'string'],
            'keterangan' => ['string'],
            'school_name' => ['required', 'exists:schools,nama_sekolah'],
        ];
    }
}
