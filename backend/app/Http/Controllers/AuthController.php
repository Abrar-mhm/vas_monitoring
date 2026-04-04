<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; //classe qui contient les données envoyées par React (email, password)
use Illuminate\Support\Facades\Auth; //classe de Laravel qui gère l'authentification

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. Valider les données reçues
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|min:8',
        ]);

        // 2. Vérifier email + password
        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) { //vérifie l'email et mdp dans la base de données 
            return response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 401);
        }

        // 3. Récupérer l'utilisateur connecté
        $user = Auth::user();

        // Crée un token Sanctum et le retourne en texte clair pour que React puisse l'utiliser.
        $token = $user->createToken('auth_token')->plainTextToken;

        // 5. Retourner le token et le rôle
        return response()->json([
            'token' => $token,
            'role'  => $user->role,
            'name'  => $user->name,
        ]);
    }

    public function logout(Request $request)
    {
        // Supprimer le token actuel
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnecté avec succès'
        ]);
    }
}