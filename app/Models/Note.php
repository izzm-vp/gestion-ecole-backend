<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Exam;
use App\Models\Etudiant;

class Note extends Model
{
    use HasFactory;

    protected $fillable=[
        'user_id',
        'exam_id',
        "note",
        "remarque"
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class,'exam_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
