<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alerte extends Model
{
    protected $table = 'ALERTES';

    protected $fillable = [
        'START_DATE',
        'NOM_SERVICE',
        'SC',
        'KEYWORD',
        'NOM_FOURNISSEUR',
        'AUGMENTATION',
        'COUNT_NB_SMS',
        'MOTIF',
        'STATUS',
    ];
}