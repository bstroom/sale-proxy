<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePlanRequest extends FormRequest
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
            'name' => 'required',
            'amount' => 'required|numeric',
            'price' => 'required|numeric',
            'type' => 'required|in:WEEK,MONTH,YEAR',
            'proxy_type' => 'required|array',
            'is_active' => 'boolean',
            'description' => 'string'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Trường này bắt buộc',
            'amount.required' => 'Trường này bắt buộc',
            'amount.numberic' => 'Trường này không hợp lệ',
            'price.required' => 'Trường này bắt buộc',
            'price.numberic' => 'Trường này không hợp lệ',
            'type.required' => 'Trường này bắt buộc',
        ];
    }
}
