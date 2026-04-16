<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\ServiceSmsController;

// Routes publiques
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);

    // Gestion des utilisateurs
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    // Gestion des fournisseurs
    Route::get('/fournisseurs', [FournisseurController::class, 'index']);
    Route::post('/fournisseurs', [FournisseurController::class, 'store']);
    Route::put('/fournisseurs/{id}', [FournisseurController::class, 'update']);
    Route::delete('/fournisseurs/{id}', [FournisseurController::class, 'destroy']);

    // Gestion des services SMS+
    Route::get('/services', [ServiceSmsController::class, 'index']);
    Route::post('/services', [ServiceSmsController::class, 'store']);
    Route::put('/services/{id}', [ServiceSmsController::class, 'update']);
    Route::delete('/services/{id}', [ServiceSmsController::class, 'destroy']);
    Route::put('/services/{id}/activer', [ServiceSmsController::class, 'activer']);
    Route::put('/services/{id}/desactiver', [ServiceSmsController::class, 'desactiver']);

});