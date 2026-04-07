<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoriqueUser extends Model
{
    protected $table = 'historique_users';

    protected $fillable = [
        'user_id',
        'action',
        'ancienne_valeur',
        'nouvelle_valeur',
        'modifie_par',
    ];

    // Relation avec User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}