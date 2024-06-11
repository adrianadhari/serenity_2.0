<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class LabPelangganRequest extends FormRequest
{
    protected $gender;
    protected $lab_instansi;

    public function __construct()
    {
        $this->gender = Config::get('constantsdata.gender');
        $this->lab_instansi = Config::get('constantsdata.lab_instansi');
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
            'instansi' => ['required', Rule::in($this->lab_instansi)],
            'nama_instansi' => ['required', 'max:255', 'string'],
            'nama_pelanggan' => ['required', 'max:255', 'string'],
            'alamat' => ['required', 'string'],
            'telp' => ['required', 'max:13', 'string'],
            'tgl_lahir' => ['required', 'date'],
            'jenis_kelamin' => ['required', Rule::in($this->gender)],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
        ];
    }
}
