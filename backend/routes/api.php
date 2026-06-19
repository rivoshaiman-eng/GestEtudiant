<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\BilanController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/etudiants', [EtudiantController::class, 'index']);
    Route::post('/etudiants', [EtudiantController::class, 'store']);
    Route::put('/etudiants/{id}', [EtudiantController::class, 'update']);
    Route::delete('/etudiants/{id}', [EtudiantController::class, 'destroy']);
    Route::get('/bilan', [BilanController::class, 'index']);
});

