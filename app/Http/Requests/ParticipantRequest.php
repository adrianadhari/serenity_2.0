<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class ParticipantRequest extends FormRequest
{
    protected $tipe_peserta;
    protected $gender;
    protected $pendidikan;

    public function __construct()
    {
        $this->tipe_peserta = Config::get('constantsdata.tipe_peserta');
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
        return [
            'nama_peserta' => ['required', 'string', 'max:255'],
            'tipe_peserta' => ['required', Rule::in($this->tipe_peserta)],
            'jenis_kelamin' => ['required', Rule::in($this->gender)],
            'pendidikan' => ['required', Rule::in($this->pendidikan)],
            'telp' => ['required', 'max:13', 'string'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'institusi' => ['required', 'exists:institutions,nama'],
        ];
    }
}
