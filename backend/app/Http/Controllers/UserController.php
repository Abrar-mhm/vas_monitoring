<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\HistoriqueUser;

class UserController extends Controller
{
    // Liste des utilisateurs
    public function index()
    {
        return response()->json(User::all());
    }

    // Ajouter un utilisateur
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:8',
            'role'     => 'required|in:Administrateur,Analyste Business,Analyste Opérationnel',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => $request->role,
            'statut'   => 'actif',
        ]);

        HistoriqueUser::create([
            'user_id'         => $user->id,
            'action'          => 'Création',
            'ancienne_valeur' => '-',
            'nouvelle_valeur' => 'Compte créé',
            'modifie_par'     => auth()->user()->name,
        ]);

        return response()->json($user, 201);
    }

    // Modifier un utilisateur
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $ancienne_valeur = $user->toArray();

        if ($request->password) {
            $request->merge(['password' => Hash::make($request->password)]);
        } else {
            $request->request->remove('password');
        }

        $user->update($request->all());

        HistoriqueUser::create([
            'user_id'         => $user->id,
            'action'          => 'Modification',
            'ancienne_valeur' => json_encode($ancienne_valeur),
            'nouvelle_valeur' => json_encode($user->toArray()),
            'modifie_par'     => auth()->user()->name,
        ]);

        return response()->json($user);
    }

    // Supprimer un utilisateur
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        HistoriqueUser::create([
            'user_id'         => $user->id,
            'action'          => 'Suppression',
            'ancienne_valeur' => json_encode($user->toArray()),
            'nouvelle_valeur' => '-',
            'modifie_par'     => auth()->user()->name,
        ]);

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé']);
    }

    // Historique d'un utilisateur
    public function historique($id)
    {
        $historique = HistoriqueUser::where('user_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($historique);
    }
}