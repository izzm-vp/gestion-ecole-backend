<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Note;
use App\Models\User;

class Exam extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable=[
        "module","nom","enseignant_id"
    ];

    public function users()
    {
        return $this->hasMany(Note::class)->with('user');
    }

}
