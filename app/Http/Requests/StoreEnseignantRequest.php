<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEnseignantRequest extends FormRequest
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
        'nom' => 'required|max:50',
        'prenom' => 'required|max:50',
        'specialite' => 'required',
        'dateDeNaissance' => 'required|date',
        'address' => 'required|max:100',
        'phone' => 'required|max:10|unique:enseignants',
        'email' => 'required|max:60|unique:enseignants',
        'password' => 'required|max:60',
    ];
}

}
