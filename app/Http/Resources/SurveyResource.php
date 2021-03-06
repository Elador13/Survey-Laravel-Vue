<?php

namespace App\Http\Resources;

use DateTime;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class SurveyResource extends JsonResource
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
            'id' => $this->id,
            //TODO: Змінено шлях до зображення для тестових даних
                //original
            'image_url' => $this->image ? URL::to($this->image) : null,
                //fake data
//            'image_url' => $this->image ? "http://localhost/images/" . $this->image : null,

            'title' => $this->title,
            'slug' => $this->slug,
            'status' => !!$this->status,
            'description' => $this->description,
            'created_at' => (new DateTime($this->created_at))->format('d-m-Y / H:i:s'),
            'updated_at' => (new DateTime($this->updated_at))->format('d-m-Y / H:i:s'),
            'expire_date' => (new \DateTime($this->expire_date))->format('Y-m-d'),
            'questions' => SurveyQuestionResource::collection($this->questions),
        ];
    }
}
