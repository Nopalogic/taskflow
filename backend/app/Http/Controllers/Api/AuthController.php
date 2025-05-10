<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    private const TOKEN_NAME = 'auth-token';

    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            if (User::where('email', $request->email)->exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email already exists.',
                ], 400);
            }

            User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $user = User::where('email', $request->email)->first();
            $token = $user->createToken(self::TOKEN_NAME, ['*'], now()->addMinutes(config('sanctum.expiration')))->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'data' => $user,
                'token' => $token
            ], 201);
        } catch (\Exception $e) {
            Log::error('Registration error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email or password wrong.',
                ], 401);
            }

            $token = $user->createToken(self::TOKEN_NAME, ['*'], now()->addMinutes(config('sanctum.expiration')))->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'User logged in.',
                'data' => $user,
                'token' => $token
            ], 200);
        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function verifyToken(Request $request)
    {
        try {
            $token = $request->bearerToken();
            if (!$token) {
                return response()->json([
                    'success' => false,
                    'message' => 'Token not provided'
                ], 401);
            }

            $accessToken = PersonalAccessToken::findToken($token);
            if (!$accessToken) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid token'
                ], 401);
            }

            if (config('sanctum.expiration') && $accessToken->created_at->lte(now()->subMinutes(config('sanctum.expiration')))) {
                return response()->json([
                    'success' => false,
                    'message' => 'Token expired'
                ], 401);
            }

            $user = $accessToken->tokenable;
            Auth::id($user);

            return response()->json([
                'success' => true,
                'message' => 'Token is valid',
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            Log::error('Verify token error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Token verification failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            return response()->json([
                'success' => true,
                'message' => 'Logout successfully',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Logout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Logout failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
