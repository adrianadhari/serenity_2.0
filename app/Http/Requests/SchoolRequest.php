<?php

namespace App\Http\Requests;

use App\Models\School;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SchoolRequest extends FormRequest
{
    private $schoolData;

    public function __construct()
    {
        $this->schoolData = School::getSchoolData();
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
            'nama_sekolah' => ['required', 'string', 'max:255'],
            'kategori_sekolah' => ['required', Rule::in($this->schoolData['category'])],
            'jenis_sekolah' => ['required', Rule::in($this->schoolData['school'])],
            'tipe_sekolah' => ['required', Rule::in($this->schoolData['type'])],
            'provinsi' => ['required', 'max:255'],
            'kota' => ['required', 'max:255'],
            'alamat_sekolah' => ['required', 'string'],
            'nama_kontak' => ['required', 'max:255', 'string'],
            'telp' => ['required', 'max:13', 'string'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'tgl_registrasi' => ['required', 'date'],
        ];
    }
}
