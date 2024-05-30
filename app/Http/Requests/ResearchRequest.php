<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class ResearchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    protected $kategori_penelitian;
    protected $jenis_flagship;
    protected $area_penelitian;
    protected $status_penelitian;
    protected $institusi;
    protected $publikasi;

    public function __construct()
    {
        $this->kategori_penelitian = Config::get('constantsdata.kategori_penelitian');
        $this->jenis_flagship = Config::get('constantsdata.jenis_flagship');
        $this->area_penelitian = Config::get('constantsdata.area_penelitian');
        $this->status_penelitian = Config::get('constantsdata.status_penelitian');
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
            'judul_penelitian' => ['required', 'max:255', 'string'],
            'kategori_penelitian' => ['required', Rule::in($this->kategori_penelitian)],
            'jenis_flagship' => ['required', Rule::in($this->jenis_flagship)],
            'area_penelitian' => ['required', Rule::in($this->area_penelitian)],
            'subjek_penelitian' => ['required', 'max:255', 'string'],
            'nama_area_flagship' => ['required', 'max:255', 'string'],
            'lokasi_penelitian' => ['required', 'max:255', 'string'],
            'nama_penyelia' => ['required', 'max:255', 'string'],
            'jenis_hibah' => ['required', 'max:255', 'string'],
            'besaran_hibah' => ['required', 'max:255', 'string'],
            'nama_funding' => ['required', 'max:255', 'string'],
            'nama_peneliti' => ['required', 'max:255', 'string'],
            'sub_area_penelitian' => ['required', 'max:255', 'string'],
            'author' => ['required', 'max:255', 'string'],
            'bulan_dipublikasi' => ['required', 'max:255', 'string'],
            'doi' => ['required', 'max:255', 'string'],
            'status_penelitian' => ['required', Rule::in($this->status_penelitian)],
            'institusi' => ['required', 'exists:institutions,nama'],
            'publikasi' => ['required', 'exists:publications,judul'],
        ];
    }
}
