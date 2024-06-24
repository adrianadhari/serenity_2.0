<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LabAgendaRequest extends FormRequest
{
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
            'tgl_terima_sampel' => ['required', 'date'],
            'jumlah_sampel' => ['required', 'integer'],
            'kode_lab' => ['required', 'integer'],
            'nama_koresponden' => ['required', 'string', 'max:255'],
            'jenis_sampel' => ['required', 'string', 'max:255'],
            'jam_pengambilan_sampel' => ['required', 'date_format:H:i'],
            'hemolis' => ['required', 'boolean'],
            'lipemik' => ['required', 'boolean'],
            'ikterus' => ['required', 'boolean'],
            'volume' => ['required', 'integer'],
            'cair' => ['required', 'boolean'],
            'dingin' => ['required', 'boolean'],
            'no_box' => ['required', 'integer'],
            'cup_asam' => ['required', 'boolean'],
            'cup_gelap' => ['required', 'boolean'],
            'f80' => ['required', 'string', 'max:255'],
            'f20' => ['required', 'string', 'max:255'],
            'keterangan' => ['required', 'string', 'max:255'],
        ];
    }
}
