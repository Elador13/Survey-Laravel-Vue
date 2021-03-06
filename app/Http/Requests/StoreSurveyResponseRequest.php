<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSurveyResponseRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'answers' => 'required|array',
            'respondent' => 'array:name,email|nullable',
            'respondent.name' => 'required|string|max:40',
            'respondent.email' => 'email|nullable|max:50'
        ];
    }
}
