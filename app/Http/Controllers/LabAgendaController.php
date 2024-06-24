<?php

namespace App\Http\Controllers;

use App\Http\Requests\LabAgendaRequest;
use App\Models\LabAgenda;
use App\Models\LabPraAnalisa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LabAgendaController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        return Inertia::render('Laboratorium/PraAnalisa/CreateAgenda', [
            'id' => $id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LabAgendaRequest $request, $id)
    {
        $pra_analisa_id = LabPraAnalisa::where('kode', $id)->pluck('id')->first();

        $data = $request->all();
        $data['lab_pra_analisa_id'] = $pra_analisa_id;

        LabAgenda::create($data);
        return redirect()->route('lab.pra-analisa.show', ['pra_analisa' => $id])->with('message', 'Input Buku Agenda Penerimaan Contoh Berhasil!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function multipleDelete(Request $request)
    {
        $ids = $request->input('ids');
        if (is_array($ids) && count($ids) > 0) {
            LabAgenda::whereIn('id', $ids)->delete();
            return redirect()->back();
        }
        return redirect()->back();
    }
}
