<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::get('/survey-by-slug/{survey:slug}', [SurveyController::class, 'showForGuest']);

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::resource('/survey', SurveyController::class);
    Route::post('/survey/{survey}/response', [SurveyController::class, 'storeResponse']);
    Route::get('/survey/{survey}/responses', [SurveyController::class, 'getResponsesForSurvey']);
    Route::get('/survey/{survey}/responses/{surveyResponse}', [SurveyController::class, 'getResultsForResponse']);
    Route::get('/responses', [SurveyController::class, 'getAllResponses']);
});


