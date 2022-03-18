<?php

namespace App\Http\Resources;

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
        return [
            'survey_response_id' => $this->survey_response_id,
            'survey_id' => $this->survey_id,
            'survey_question_id' => $this->survey_question_id,
            'question' => $this->question,
            'answer' => $this->answer
        ];
    }
}
