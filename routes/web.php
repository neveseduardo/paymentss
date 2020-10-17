<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'web'], function () {
    Route::get('', 'MainController@index')->where('any', '.*')->name('main');
});
