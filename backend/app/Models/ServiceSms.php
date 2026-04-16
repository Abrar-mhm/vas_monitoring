<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceSms extends Model
{
    protected $table = 'SERVICES_SMS';

    protected $fillable = [
        'NOM_FOURNISSEUR',
        'NOM_SERVICE',
        'NUMERO_COURT',
        'KEYWORD',
        'TYPE',
        'PRIX',
        'ACTIF',
    ];

    // Relation avec Fournisseur
    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class, 'NOM_FOURNISSEUR', 'PROVIDER_NAME');
    }
}