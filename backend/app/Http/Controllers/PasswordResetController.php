<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PasswordResetController extends Controller
{
    // Envoyer le lien de réinitialisation
    public function sendResetLink(Request $request)
    {
        $user = User::whereRaw('LOWER(EMAIL) = ?', [strtolower($request->email)])->first();

        if (!$user) {
            return response()->json(['errors' => ['email' => ['Aucun compte trouvé avec cet email']]], 422);
        }

        // Supprimer les anciens tokens
        DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->delete();

        // Créer un nouveau token
        $token = Str::random(64);

        DB::table('password_reset_tokens')->insert([
            'email'      => $request->email,
            'token'      => $request->email,
            'created_at' => Carbon::now(),
        ]);

        // Envoyer l'email
        $resetLink = "http://localhost:5173/reset-password?token={$token}&email={$request->email}";

        Mail::send('emails.reset_password', ['resetLink' => $resetLink], function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Réinitialisation de votre mot de passe - VAS Monitoring');
        });

        return response()->json(['message' => 'Email envoyé avec succès']);
    }

    // Réinitialiser le mot de passe
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'token'    => 'required',
            'password' => 'required|min:8',
        ]);

        $record = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (!$record || $record->token !== $request->token) {
            return response()->json(['message' => 'Token invalide'], 400);
        }

        // Vérifier si le token a expiré (1 heure)
        if (Carbon::parse($record->created_at)->addHour()->isPast()) {
            return response()->json(['message' => 'Token expiré'], 400);
        }

        // Mettre à jour le mot de passe
        User::where('email', $request->email)
            ->update(['password' => bcrypt($request->password)]);

        // Supprimer le token
        DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->delete();

        return response()->json(['message' => 'Mot de passe réinitialisé avec succès']);
    }
}