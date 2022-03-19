<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SurveyQuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
//            'type' => array_rand(['text'=>'text', 'select'=>'select', 'radio'=>'radio', 'checkbox'=>'checkbox']),
            'survey_id' =>$this->faker->numberBetween(1, 12),
            'type' => 'text',
            'question' => $this->faker->sentence(2),
            'description' => $this->faker->sentence(8)
        ];
    }
}
