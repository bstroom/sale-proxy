<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'last_name' => 'string',
            'phone_number' => 'string',
            'first_name' => 'string',
            'old_password' => 'string',
            'new_password' => 'string',
            'confirm_new_password' => 'string'
        ];
    }
}
