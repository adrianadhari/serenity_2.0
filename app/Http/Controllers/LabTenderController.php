<?php

namespace App\Http\Controllers;

use App\Http\Requests\LabTenderRequest;
use App\Models\LabPraAnalisa;
use App\Models\LabTender;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LabTenderController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        return Inertia::render('Laboratorium/PraAnalisa/CreateTender', [
            'id' => $id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LabTenderRequest $request, $id)
    {
        $pra_analisa_id = LabPraAnalisa::where('kode', $id)->pluck('id')->first();

        $data = $request->all();
        $data['lab_pra_analisa_id'] = $pra_analisa_id;

        LabTender::create($data);
        return redirect()->route('lab.pra-analisa.show', ['pra_analisa' => $id])->with('message', 'Input Kaji Ulang Permintaan, Tender, dan Kontrak Berhasil!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function multipleDelete(Request $request)
    {
        $ids = $request->input('ids');
        if (is_array($ids) && count($ids) > 0) {
            LabTender::whereIn('id', $ids)->delete();
            return redirect()->back();
        }
        return redirect()->back();
    }
}
