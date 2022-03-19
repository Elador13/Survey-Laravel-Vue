<?php

namespace Database\Seeders;

use App\Models\Survey;
use App\Models\SurveyQuestion;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         User::factory()
             ->has(Survey::factory()->count(12)->has(SurveyQuestion::factory()->count(3)))
             //Users
             ->count(1)
             ->create();

    }
}
