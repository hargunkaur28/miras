<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\InventoryApiController;
use App\Http\Controllers\API\EmployeeApiController;
use App\Http\Controllers\API\DashboardApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    // Inventory API
    Route::apiResource('inventory', InventoryApiController::class);
    
    // Employee API
    Route::apiResource('employees', EmployeeApiController::class);
    
    // Dashboard Stats API
    Route::get('dashboard/stats', [DashboardApiController::class, 'stats']);
});
