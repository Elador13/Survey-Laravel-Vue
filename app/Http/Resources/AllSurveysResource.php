<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class AllSurveysResource extends JsonResource
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
            'description' => $this->description,
            'slug' => $this->slug,
        ];
    }
}
