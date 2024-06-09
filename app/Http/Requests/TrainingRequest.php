<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrainingRequest extends FormRequest
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
            'nama_pelatihan' => ['required', 'max:255', 'string'],
            'institusi' => ['required', 'max:255', 'string'],
            'trainer' => ['required', 'max:255', 'string'],
            'unit_pengusul' => ['required', 'max:255', 'string'],
            'tanggal_mulai' => ['required', 'date'],
            'tanggal_akhir' => ['required', 'date'],
        ];
    }
}
