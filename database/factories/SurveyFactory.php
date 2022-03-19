<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SurveyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->randomNumber(3),
            'title' => $this->faker->sentence(3),
            'status' => 1,
            'image' => $this->faker->image(public_path('images'), 640, 640, 'animals', false),
            'description' => $this->faker->sentence(rand(3, 10)),
            'expire_date' => $this->faker->dateTimeBetween('+20 days', '+60 days')
        ];
    }
}
