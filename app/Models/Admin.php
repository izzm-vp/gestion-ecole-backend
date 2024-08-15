<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use \Illuminate\Foundation\Auth\User as Authenticable ;

class Admin extends Authenticable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $appends=['role'];

    public function getRoleAttribute($key){
        return 'admin';
    }
}
