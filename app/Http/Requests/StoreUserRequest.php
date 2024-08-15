<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'name' => 'required|max:50',
           'prenom' => 'required|max:50',
            'dateDeNaissance' => 'required|date',
            'address' => 'required|max:100',
            'email' => 'required|email|unique:users',
            'password' => 'required|max:60',
            'enseignant_id' => 'required|exists:enseignants,id',
        ];
    }
}
