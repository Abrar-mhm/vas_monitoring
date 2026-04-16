<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    protected $table = 'FOURNISSEURS';

    protected $fillable = [
        'PROVIDER_NAME',
        'NATIONALITE',
        'ID_FISCALE',
        'ADRESSE',
    ];

    // Relation avec Services
    public function services()
    {
        return $this->hasMany(ServiceSms::class, 'NOM_FOURNISSEUR', 'PROVIDER_NAME');
    }
}