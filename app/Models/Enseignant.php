<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use \Illuminate\Foundation\Auth\User as Authenticable ;

class Enseignant extends Authenticable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;



    protected $fillable = [
        'nom',
        'prenom',
        'specialite',
        'dateDeNaissance',
        'address',
        'phone',
        'email',
        'password'
    ];

    protected $hidden = [
        'deleted_at',
        'email_verified_at',
        'password',
        'remember_token',
        'updated_at'
    ];

    protected $appends=['role'];

    public function getRoleAttribute($key){
        return 'enseignant';
    }
}
