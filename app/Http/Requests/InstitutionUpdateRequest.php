<?php

namespace App\Http\Requests;

use App\Models\Institution;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class InstitutionUpdateRequest extends FormRequest
{
    protected $negara;
    protected $grup;
    protected $jenis;

    public function __construct()
    {
        $this->negara = Config::get('constantsdata.negara');
        $this->grup = Config::get('constantsdata.grup');
        $this->jenis = Config::get('constantsdata.jenis');
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
        $kode = Institution::where('kode', $this->route('institusi'))->firstOrFail();

        return [
            'nama' => ['required', 'string', 'max:255', 'unique:institutions,nama,' . $kode->id],
            'negara' => ['required', Rule::in($this->negara)],
            'grup' => ['required', Rule::in($this->grup)],
            'jenis' => ['required', Rule::in($this->jenis)],
            'alamat' => ['required', 'string'],
            'telp' => ['required', 'max:13', 'string'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
        ];
    }
}
