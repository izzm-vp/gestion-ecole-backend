<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ExamsController;
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

Route::middleware(['auth:sanctum,admin,enseignant'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResources([
    'enseignants' => EnseignantController::class,
    'users'=>UserController::class,
    'notes'=>NoteController::class,
    'exams'=>ExamsController::class,
]);

require __DIR__.'/auth.php';