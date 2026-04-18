<?php

namespace App\Http\Controllers;

use App\Models\Alerte;
use Illuminate\Http\Request;

class AlerteController extends Controller
{
    // Liste des alertes
    public function index()
    {
        return response()->json(
            Alerte::orderBy('CREATED_AT', 'desc')->get()
        );
    }

    // Ajouter une alerte
    public function store(Request $request)
    {
        $request->validate([
            'START_DATE'      => 'required',
            'NOM_SERVICE'     => 'required|string',
            'SC'              => 'required|string',
            'KEYWORD'         => 'required|string',
            'NOM_FOURNISSEUR' => 'required|string',
            'AUGMENTATION'    => 'required|numeric',
            'COUNT_NB_SMS'    => 'required|integer',
            'MOTIF'           => 'required|string',
        ]);

        $alerte = Alerte::create($request->all());
        return response()->json($alerte, 201);
    }

    // Modifier le statut d'une alerte
    public function updateStatus(Request $request, $id)
    {
        $alerte = Alerte::findOrFail($id);
        $alerte->update(['STATUS' => $request->STATUS]);
        return response()->json($alerte);
    }

    // Supprimer une alerte
    public function destroy($id)
    {
        $alerte = Alerte::findOrFail($id);
        $alerte->delete();
        return response()->json(['message' => 'Alerte supprimée']);
    }
}