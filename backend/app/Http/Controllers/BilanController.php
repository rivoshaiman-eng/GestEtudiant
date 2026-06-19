<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiant;

class BilanController extends Controller
{
    public function index() {
        $etudiants = Etudiant::all();
        
        if ($etudiants->isEmpty()) {
            return response()->json([
                'min' => null,
                'max' => null,
                'admis' => 0,
                'redoublants' => 0,
                'exclus' => 0,
            ]);
        }

        return response()->json([
            'min' => $etudiants->min('moyenne'),
            'max' => $etudiants->max('moyenne'),
            'admis' => $etudiants->where('moyenne', '>=', 10)->count(),
            'redoublants' => $etudiants->whereBetween('moyenne', [5, 9.99])->count(),
            'exclus' => $etudiants->where('moyenne', '<', 5)->count(),
        ]);
    }
}
