<?php

namespace App\Http\Controllers;

use App\Models\Enseignant;
use App\Http\Requests\StoreEnseignantRequest;
use App\Http\Requests\UpdateEnseignantRequest;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\EnseignantResource;


class EnseignantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allEnseignants= Enseignant::all();

        return response()->json($allEnseignants); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEnseignantRequest $request)
    {

     $formFields=$request->validated();

     $enseignant = Enseignant::create([
        'nom' => $request->nom,
        'prenom' => $request->prenom,
        'specialite' => $request->specialite,
        'dateDeNaissance' => $request->dateDeNaissance,
        'address' => $request->address,
        'phone' => $request->phone,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

   return new EnseignantResource($enseignant);


    }

    /**
     * Display the specified resource.
     */
    public function show(Enseignant $enseignant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEnseignantRequest $request, Enseignant $enseignant)
    {
        $formFields=$request->validated();

        $enseignant->update([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'address' => $request->address,
                'phone' => $request->phone,
                'email' => $request->email,
            ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enseignant $enseignant)
    {
        $enseignant->delete();

        return response()->json(['message' => 'Enseignant deleted successfully']); 
    }
}
