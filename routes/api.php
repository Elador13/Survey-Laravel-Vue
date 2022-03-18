<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyController;
use Illuminate\Http\Request;
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

//Route::middleware('auth:sanctum')->group(function () {
//    Route::get('/user', function (Request $request) {
//        return $request->user();
//    });
//    Route::post('/logout', [AuthController::class, 'logout']);
//    Route::resource('/survey', SurveyController::class);
//
//});

//Route::get('/survey-by-slug/{survey:slug}', [SurveyController::class, 'showForGuest']);
//Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);
//

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
    Route::post('/survey/{survey}/response', [SurveyController::class, 'storeResponse']);
    Route::get('/survey/test/{surveyResponse}', [SurveyController::class, 'getResponse']);
    Route::resource('/survey', SurveyController::class);

});
