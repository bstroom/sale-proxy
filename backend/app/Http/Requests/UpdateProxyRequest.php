<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProxyRequest extends FormRequest
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
            'status' => 'required|in:LIVE,NONE',
            'username' => 'string|nullable',
            'password' =>  'string|nullable',
            'type' => 'required|in:HTTP,SOCKS4,SOCKS5,SSH',
            'ip' => 'required',
            'port' => 'required',
            'geo_local' => 'string|nullable',
            'ip_public' => 'string|nullable',
            'is_vip' => 'boolean|nullable',
            "ms" => 'nullable'
        ];
    }
}
