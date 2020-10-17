<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use Auth;
use App\Models\User;

class AuthController extends Controller
{
	public function login()
	{
		if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
			$user = Auth::user();
			$response['nome'] =  $user->name;
			$response['email'] =  $user->email;
			$response['token'] =  $user->createToken('MyApp')->accessToken;
			return response()->json(['message' => 'Autenticado com sucesso', 'user' => $response], 200);
		}
		return response()->json(['message' => 'Falha na autenticação'], 401);
	}

	public function register()
	{
		$validator = Validator::make(request()->all(), [
			'name' => 'required',
			'email' => 'required|email',
			'password' => 'required',
			'c_password' => 'required|same:password',
		]);

		if ($validator->fails()) {
			return response()->json(['error' => $validator->errors()], 401);
		}

		$input = request()->all();
		$input['password'] = \Hash::make(request('password'));
		$user = User::create($input);
		$success['token'] =  $user->createToken('MyApp')->accessToken;
		$success['name'] =  $user->name;

		return response()->json(['success' => $success], $this->successStatus);
	}
}
