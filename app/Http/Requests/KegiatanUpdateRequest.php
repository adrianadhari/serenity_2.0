<?php

namespace App\Http\Requests;

use App\Models\Kegiatan;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class KegiatanUpdateRequest extends FormRequest
{
    protected $jenis_kegiatan;
    protected $semester;
    protected $flagship;
    protected $moda;
    protected $status_kegiatan;

    public function __construct()
    {
        $this->jenis_kegiatan = Config::get('constantsdata.jenis_kegiatan');
        $this->semester = Config::get('constantsdata.semester');
        $this->flagship = Config::get('constantsdata.flagship');
        $this->moda = Config::get('constantsdata.moda');
        $this->status_kegiatan = Config::get('constantsdata.status_kegiatan');
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
        $judul_kegiatan = Kegiatan::where('kode', $this->route('kegiatan'))->firstOrFail();

        return [
            'jenis_kegiatan' => ['required', Rule::in($this->jenis_kegiatan)],
            'semester' => ['required', Rule::in($this->semester)],
            'judul_kegiatan' => ['required', 'string', 'max:255', 'unique:kegiatans,judul_kegiatan,' . $judul_kegiatan->id],
            'jenis_flagship' => ['required', Rule::in($this->flagship)],
            'jadwal_mulai' => ['required', 'date'],
            'jadwal_selesai' => ['required', 'date'],
            'lokasi' => ['required', 'string', 'max:255'],
            'link' => ['required', 'string', 'max:255'],
            'moda' => ['required', Rule::in($this->moda)],
            'tentang' => ['required', 'string'],
            'narasumber' => ['required', 'string', 'max:255'],
            'materi' => ['required', 'string'],
            'sertifikat' => ['image', 'mimes:png,jpg,jpeg', 'max:2048', 'nullable'],
            'status' => ['required', Rule::in($this->status_kegiatan)],
            'target_peserta' => ['required', 'integer'],
            'min_score' => ['required', 'integer']
        ];
    }
}
