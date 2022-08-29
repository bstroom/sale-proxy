<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'email' => 'required|email|unique:users',
            'first_name' => 'required',
            'last_name' => 'required',
            'phone_number' => 'required',
            'password' => 'required',
            'confirm_password' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Email bắt buộc',
            'email.email' => 'Email không hợp lệ',
            'email.unique' => 'Email này đã được đăng ký',
            'last_name.required' => 'Họ bắt buộc',
            'first_name.required' => 'Tên bắt buộc',
            'password.required' => 'Mật khẩu bắt buộc',
            'confirm_password.required' => 'Xác nhận mật khẩu bắt buộc'
        ];
    }
}
