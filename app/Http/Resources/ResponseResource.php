<?php

namespace App\Http\Resources;

use App\Models\SurveyQuestion;
use Illuminate\Http\Resources\Json\JsonResource;

class ResponseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $question = SurveyQuestion::query()->find($this->id);

        return [
            'question_id' => $question->id,
            'question' => $question->question,
            'question_description' => $question->description,
            'answer_id' => $this->id,
            'answer' => $this->answer
        ];
    }
}
