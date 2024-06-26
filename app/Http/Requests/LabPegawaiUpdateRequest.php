<?php

namespace App\Http\Requests;

use App\Models\LabPegawai;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class LabPegawaiUpdateRequest extends FormRequest
{
    protected $gender;
    protected $pendidikan;

    public function __construct()
    {
        $this->gender = Config::get('constantsdata.gender');
        $this->pendidikan = Config::get('constantsdata.pendidikan');
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
        $nip = LabPegawai::where('kode', $this->route('pegawai'))->firstOrFail();

        return [
            'nama' => ['required', 'max:255', 'string'],
            'nip' => ['required', 'max:20', 'string', 'unique:lab_pegawais,nip,' . $nip->id],
            'jenis_kelamin' => ['required', Rule::in($this->gender)],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'telp' => ['required', 'max:13', 'string'],
            'jabatan' => ['required', 'max:255', 'string'],
            'pendidikan' => ['required', Rule::in($this->pendidikan)],
            'tgl_lahir' => ['required', 'date'],
            'alamat' => ['required', 'string'],
        ];
    }
}
