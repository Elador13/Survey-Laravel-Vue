<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;
use PhpParser\Lexer\TokenEmulator\FlexibleDocStringEmulator;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Total number of surveys
        $total = Survey::query()->where('user_id', $user->id)->count();

        // Latest Survey
        $latest = Survey::query()
            ->where('user_id', $user->id)
            ->latest('created_at')
            ->first();

        // Total number of answers for specific User
        //TODO: Погратись з різними варіантами запитів в БД
        $totalAnswers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->count();

        // Latest 5 answers
        $latestAnswers = SurveyAnswer::query()
            ->join('surveys.user_id', $user->id)
            ->where('user_id', $user->id)
            ->orderBy('end_date', 'DESC')
            ->limit(5)
            ->getModels('survey_answers.*');

        return [
            'totalSurveys' => $total,
            'latestSurvey' => $latest ? new SurveyResource($latest) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => SurveyAnswerResource::collection($latestAnswers)
        ];
    }
}
