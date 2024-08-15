<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Note;

class NoteController extends Controller
{
   
    public function index()
    {
       
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)

    {
       $formFeilds=$request->validate([
          "user_id"=>'required|exists:users,id',
          "exam_id"=>'required|exists:exams,id',
          "note"=>'required|max:20|min:0',
          "remarque"=>"required"

       ]);
       Note::create($formFeilds);

       return response()->json("added succesfully");
    }
    public function show(string $id)
    {
        $exams = User::with('exams')->find($id);
        
        return response()->json($exams);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        //
    }
}
