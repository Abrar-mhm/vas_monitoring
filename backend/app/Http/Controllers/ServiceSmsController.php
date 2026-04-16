<?php

namespace App\Http\Controllers;

use App\Models\ServiceSms;
use Illuminate\Http\Request;

class ServiceSmsController extends Controller
{
    // Liste des services
    public function index()
    {
        return response()->json(ServiceSms::all());
    }

    // Ajouter un service
    public function store(Request $request)
    {
        $request->validate([
            'NOM_FOURNISSEUR' => 'required|string',
            'NOM_SERVICE'     => 'required|string',
            'NUMERO_COURT'    => 'required|string',
            'KEYWORD'         => 'required|string',
            'TYPE'            => 'required|string',
            'PRIX'            => 'required|numeric',
            'ACTIF'           => 'boolean',
        ]);

        $service = ServiceSms::create($request->all());
        return response()->json($service, 201);
    }

    // Modifier un service
    public function update(Request $request, $id)
    {
        $service = ServiceSms::findOrFail($id);
        $service->update($request->all());
        return response()->json($service);
    }

    // Supprimer un service
    public function destroy($id)
    {
        $service = ServiceSms::findOrFail($id);
        $service->delete();
        return response()->json(['message' => 'Service supprimé']);
    }

    // Activer un service
    public function activer($id)
    {
        $service = ServiceSms::findOrFail($id);
        $service->update(['ACTIF' => 1]);
        return response()->json($service);
    }

    // Désactiver un service
    public function desactiver($id)
    {
        $service = ServiceSms::findOrFail($id);
        $service->update(['ACTIF' => 0]);
        return response()->json($service);
    }
}