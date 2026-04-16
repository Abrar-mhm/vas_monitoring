<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Liste des utilisateurs
    public function index()
{
    return response()->json(
        User::where('role', '!=', 'Administrateur')->get()
    );
}

    // Ajouter un utilisateur
    public function store(Request $request)
{
    $request->validate([
        'name'      => 'required|string',
        'email'     => 'required|email|unique:users',
        'password'  => 'required|min:8',
        'role'      => 'required|in:Administrateur,Analyste Business,Analyste Opérationnel',
        'tel'       => 'nullable|string',
        'direction' => 'nullable|string',
        'image'     => 'nullable|string',
    ]);

    $user = User::create([
        'name'      => $request->name,
        'email'     => $request->email,
        'password'  => Hash::make($request->password),
        'role'      => $request->role,
        'statut'    => 'actif',
        'tel'       => $request->tel,
        'direction' => $request->direction,
        'image'     => $request->image,
    ]);

    return response()->json($user, 201);
}

    // Modifier un utilisateur
    public function update(Request $request, $id)
{
    $user = User::findOrFail($id);

    if ($request->password) {
        $request->merge(['password' => Hash::make($request->password)]);
    } else {
        $request->request->remove('password');
    }

    $user->update($request->only([
        'name', 'email', 'password', 'role', 
        'statut', 'tel', 'direction', 'image'
    ]));

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

}