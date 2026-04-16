<?php

namespace App\Http\Controllers;

use App\Models\Fournisseur;
use Illuminate\Http\Request;

class FournisseurController extends Controller
{
    // Liste des fournisseurs
    public function index()
    {
        return response()->json(Fournisseur::all());
    }

    // Ajouter un fournisseur
    public function store(Request $request)
    {
        $request->validate([
            'PROVIDER_NAME' => 'required|string|unique:FOURNISSEURS,PROVIDER_NAME',
            'NATIONALITE'   => 'required|string',
            'ID_FISCALE'    => 'required|string|unique:FOURNISSEURS,ID_FISCALE',
            'ADRESSE'       => 'required|string',
        ]);

        $fournisseur = Fournisseur::create($request->all());
        return response()->json($fournisseur, 201);
    }

    // Modifier un fournisseur
    public function update(Request $request, $id)
    {
        $fournisseur = Fournisseur::findOrFail($id);
        $fournisseur->update($request->all());
        return response()->json($fournisseur);
    }

    // Supprimer un fournisseur
    public function destroy($id)
    {
        $fournisseur = Fournisseur::findOrFail($id);
        $fournisseur->delete();
        return response()->json(['message' => 'Fournisseur supprimé']);
    }
}