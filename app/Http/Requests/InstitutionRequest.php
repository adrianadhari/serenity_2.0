<?php

namespace App\Http\Requests;

use App\Models\Institution;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InstitutionRequest extends FormRequest
{
    private $institutionData;

    public function __construct()
    {
        $this->institutionData = Institution::getInstitutionData();
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
            'nama' => ['required', 'string', 'max:255', 'unique:' . Institution::class],
            'negara' => ['required', Rule::in($this->institutionData['negara'])],
            'grup' => ['required', Rule::in($this->institutionData['grup'])],
            'jenis' => ['required', Rule::in($this->institutionData['jenis'])],
            'alamat' => ['required', 'string'],
            'telp' => ['required', 'max:13', 'string'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'tgl_registrasi' => ['required', 'date'],
        ];
    }
}
