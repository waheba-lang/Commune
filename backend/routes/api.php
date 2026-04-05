<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\AdminController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/update-profile', [AuthController::class, 'updateProfile']);

    Route::post('/complaints', [ComplaintController::class, 'store']);
    Route::get('/my-complaints', [ComplaintController::class, 'myComplaints']);
    Route::put('/complaints/{id}', [ComplaintController::class, 'update']);
    Route::delete('/complaints/{id}', [ComplaintController::class, 'destroy']);
    
    // Admin routes
    Route::get('/admin/stats', [AdminController::class, 'stats']);
    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::put('/admin/users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);

    // Document Requests
    Route::get('/my-requests', [App\Http\Controllers\DocumentRequestController::class, 'index']);
    Route::post('/document-requests', [App\Http\Controllers\DocumentRequestController::class, 'store']);
    
    // Admin management of Documents
    Route::get('/admin/document-requests', [App\Http\Controllers\DocumentRequestController::class, 'adminIndex']);
    Route::put('/admin/document-requests/{id}', [App\Http\Controllers\DocumentRequestController::class, 'update']);
});

Route::get('/complaints', [ComplaintController::class, 'index']);
Route::get('/complaints/{id}', [ComplaintController::class, 'show']);

// News
Route::get('/news', [App\Http\Controllers\NewsController::class, 'index']);
Route::get('/news/{id}', [App\Http\Controllers\NewsController::class, 'show']);
Route::delete('/news/{id}', [App\Http\Controllers\NewsController::class, 'destroy'])->middleware('auth:sanctum');

