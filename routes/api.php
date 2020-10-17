<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['cors'], 'prefix' => 'auth'], function () {
	Route::post('login', 'API\Auth\AuthController@login');
});

Route::fallback(function(){
	return response()->json(['message' => 'A rota não foi encontrada'], 404);
});
