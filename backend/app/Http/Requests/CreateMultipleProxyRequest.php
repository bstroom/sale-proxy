<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateMultipleProxyRequest extends FormRequest
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
            'list.*.status' => 'required|in:LIVE,NONE',
            'list.*.username' => 'string|nullable',
            'list.*.password' =>  'string|nullable',
            'list.*.type' => 'required|in:HTTP,SOCKS4,SOCKS5,SSH',
            'list.*.ip' => 'required',
            'list.*.port' => 'required',
            'list.*.geo_local' => 'string|nullable',
            'list.*.ip_public' => 'string|nullable',
            'list.*.is_vip' => 'boolean|nullable',
            "list.*.ms" => 'nullable'
        ];
    }
}
