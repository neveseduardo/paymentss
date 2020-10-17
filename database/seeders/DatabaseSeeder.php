<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
			'name' => 'Eduardo Neves',
			'email' => 'eduardomag765@gmail.com',
			'password' => \Hash::make('password'),
		]);
		$user->createToken('MyApp')->accessToken;
    }
}
