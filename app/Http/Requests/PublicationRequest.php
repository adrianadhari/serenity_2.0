<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;

class PublicationRequest extends FormRequest
{
    protected $tipe;
    protected $status;

    public function __construct()
    {
        $this->tipe = Config::get('constantsdata.tipe');
        $this->status = Config::get('constantsdata.status_publikasi');
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
            'judul' => ['required', 'max:255', 'string'],
            'tipe' => ['required', Rule::in($this->tipe)],
            'haki' => ['required', 'max:255', 'string'],
            'status' => ['required', Rule::in($this->status)]
        ];
    }
}
