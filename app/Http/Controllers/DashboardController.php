<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyResponseResource;
use App\Http\Resources\SurveyResourceDashboard;
use App\Http\Resources\SurveyResponseResourceDashboard;
use App\Models\Survey;
use App\Models\SurveyResponse;
use Illuminate\Http\Request;

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
        $totalResponses = SurveyResponse::query()
            ->join('surveys', 'survey_responses.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->count();

        // Latest 5 answers
        $latestResponses = SurveyResponse::query()
            ->join('surveys', 'survey_responses.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->orderBy('end_date', 'DESC')
            ->limit(5)
            ->getModels('survey_responses.*');

        return [
            'totalSurveys' => $total,
            'latestSurvey' => $latest ? new SurveyResourceDashboard($latest) : null,
            'totalAnswers' => $totalResponses,
            'latestAnswers' => SurveyResponseResourceDashboard::collection($latestResponses)
        ];
    }
}
