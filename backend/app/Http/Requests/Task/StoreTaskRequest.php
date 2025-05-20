<?php

namespace App\Http\Requests\Task;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreTaskRequest extends FormRequest
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
            'project_id' => 'required|string',
            'user_id' => 'required|string',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'due_date' => 'nullable|date',
            'status' => 'sometimes|in:todo,in_progress,completed',
            'priority' => 'nullable|in:low,medium,high',
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'The user ID field is required.',
            'title.required' => 'The title field is required.',
            'title.string' => 'The title must be a string.',
            'title.max' => 'The title may not be greater than 255 characters.',
            'description.string' => 'The description must be a string.',
            'description.max' => 'The description may not be greater than 255 characters.',
            'due_date.date' => 'The end date must be a valid date.',
            'status.in' => 'The selected status is invalid. Valid options are: todo, in_progress, completed.',
            'priority.in' => 'The selected status is invalid. Valid options are: low, medium, high.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation failed.',
            'errors' => $validator->errors(),
        ], 422));
    }
}
