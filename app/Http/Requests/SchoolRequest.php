<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class SchoolRequest extends FormRequest
{
    protected $schools;
    protected $categories;
    protected $types;

    public function __construct()
    {
        $this->schools = Config::get('constantsdata.school');
        $this->categories = Config::get('constantsdata.category');
        $this->types = Config::get('constantsdata.type');
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
            'kategori_sekolah' => ['required', Rule::in($this->categories)],
            'jenis_sekolah' => ['required', Rule::in($this->schools)],
            'tipe_sekolah' => ['required', Rule::in($this->types)],
            'provinsi' => ['required', 'max:255'],
            'kota' => ['required', 'max:255'],
            'alamat_sekolah' => ['required', 'string'],
            'nama_kontak' => ['required', 'max:255', 'string'],
            'telp' => ['required', 'max:13', 'string'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255']
        ];
    }
}
