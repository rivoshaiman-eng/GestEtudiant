<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiant;

class EtudiantController extends Controller
{
    public function index() {
        $etudiants = Etudiant::all();
        return response()->json($etudiants);
    }
    
    public function store(Request $request) {
        try {
            $validated = $request->validate([
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'numet' => 'required|string|max:255|unique:etudiants',
                'moyenne' => 'required|numeric|min:0|max:20'
            ]);

            $etudiant = Etudiant::create($validated);
            return response()->json([
                'message' => 'Insertion avec succès',
                'data' => $etudiant
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation échouée', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Insertion echouee', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, int $id) {
        try {
            $etudiant = Etudiant::findOrFail($id);
            
            $validated = $request->validate([
                'nom' => 'sometimes|string|max:255',
                'prenom' => 'sometimes|string|max:255',
                'numet' => 'sometimes|string|max:255|unique:etudiants,numet,' . $id,
                'moyenne' => 'sometimes|numeric|min:0|max:20'
            ]);

            $etudiant->update($validated);
            return response()->json([
                'message' => 'Modification avec succès',
                'data' => $etudiant
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation échouée', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Modification echouee', 'error' => $e->getMessage()], 500);
        }
    }
    
    public function destroy($id) {
        try {
            $etudiant = Etudiant::findOrFail($id);
            $etudiant->delete();
            return response()->json(['message' => 'Suppression avec succès']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Suppression echouee', 'error' => $e->getMessage()], 500);
        }
    }
}
