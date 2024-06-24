<?php

namespace App\Http\Controllers;

use App\Http\Requests\LabAnalisaRequest;
use App\Http\Requests\LabAnalisaUpdateRequest;
use App\Models\LabAnalisa;
use App\Models\LabPraAnalisa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class LabAnalisaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $analytics = LabAnalisa::with(['labPraAnalisa.labPelanggans'])->get();
        return Inertia::render('Laboratorium/Analisa/Index', [
            'analytics' => $analytics
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $kode_pra_analisa = LabPraAnalisa::pluck('kode');
        return Inertia::render('Laboratorium/Analisa/Create', [
            'kode_pra_analisa' => $kode_pra_analisa
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LabAnalisaRequest $request): RedirectResponse
    {
        $lab_pra_analisa_id = LabPraAnalisa::where('kode', $request->kode_pra_analisa)->pluck('id')->first();
        $request['lab_pra_analisa_id'] = $lab_pra_analisa_id;

        $analisa = $request->except(['kode_pra_analisa']);

        $suratPerintahKerja = $request->file('surat_perintah_kerja');
        if ($suratPerintahKerja) {
            $fileName = time() . $suratPerintahKerja->getClientOriginalName();
            $suratPerintahKerja->storeAs('public/analisa', $fileName);
            $analisa['surat_perintah_kerja'] = $fileName;
        }

        $logbookHasil = $request->file('logbook_hasil');
        if ($logbookHasil) {
            $fileName = time() .$logbookHasil->getClientOriginalName();
            $logbookHasil->storeAs('public/analisa', $fileName);
            $analisa['logbook_hasil'] = $fileName;
        }

        $jaminanMutu = $request->file('jaminan_mutu');
        if ($jaminanMutu) {
            $fileName = time() .$jaminanMutu->getClientOriginalName();
            $jaminanMutu->storeAs('public/analisa', $fileName);
            $analisa['jaminan_mutu'] = $fileName;
        }

        $estimasiKetidakpastianPengukuran = $request->file('estimasi_ketidakpastian_pengukuran');
        if ($estimasiKetidakpastianPengukuran) {
            $fileName = time() .$estimasiKetidakpastianPengukuran->getClientOriginalName();
            $estimasiKetidakpastianPengukuran->storeAs('public/analisa', $fileName);
            $analisa['estimasi_ketidakpastian_pengukuran'] = $fileName;
        }


        LabAnalisa::create($analisa);
        return redirect()->route('lab.analisa.index')->with('message', 'Analisa Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(LabAnalisa $labAnalisa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $analyticDetail = LabAnalisa::where('kode', $id)->with(['labPraAnalisa.labPelanggans'])->first();
        $kode_pra_analisa = LabPraAnalisa::pluck('kode');
        return Inertia::render('Laboratorium/Analisa/Edit', [
            'kode_pra_analisa' => $kode_pra_analisa,
            'analyticDetail' => $analyticDetail
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LabAnalisaUpdateRequest $request, $kode): RedirectResponse
    {
        $analytic = LabAnalisa::where('kode', $kode)->firstOrFail();
        $lab_pra_analisa_id = LabPraAnalisa::where('kode', $request->kode_pra_analisa)->pluck('id')->first();

        $request['lab_pra_analisa_id'] = $lab_pra_analisa_id;

        if ($request->hasFile('surat_perintah_kerja')) {
            Storage::delete('public/analisa/' . $analytic->surat_perintah_kerja);
            $fileName = time() . $request->file('surat_perintah_kerja')->getClientOriginalName();
            $request->file('surat_perintah_kerja')->storeAs('public/analisa', $fileName);
            $analytic->surat_perintah_kerja = $fileName;
        }
    
        if ($request->hasFile('logbook_hasil')) {
            Storage::delete('public/analisa/' . $analytic->logbook_hasil);
            $fileName = time() . $request->file('logbook_hasil')->getClientOriginalName();
            $request->file('logbook_hasil')->storeAs('public/analisa', $fileName);
            $analytic->logbook_hasil = $fileName;
        }
    
        if ($request->hasFile('jaminan_mutu')) {
            Storage::delete('public/analisa/' . $analytic->jaminan_mutu);
            $fileName = time() . $request->file('jaminan_mutu')->getClientOriginalName();
            $request->file('jaminan_mutu')->storeAs('public/analisa', $fileName);
            $analytic->jaminan_mutu = $fileName;
        }
    
        if ($request->hasFile('estimasi_ketidakpastian_pengukuran')) {
            Storage::delete('public/analisa/' . $analytic->estimasi_ketidakpastian_pengukuran);
            $fileName = time() . $request->file('estimasi_ketidakpastian_pengukuran')->getClientOriginalName();
            $request->file('estimasi_ketidakpastian_pengukuran')->storeAs('public/analisa', $fileName);
            $analytic->estimasi_ketidakpastian_pengukuran = $fileName;
        }
    
        // Update other attributes directly on the model
        $analytic->fill($request->except(['kode_pra_analisa', 'surat_perintah_kerja', 'logbook_hasil', 'jaminan_mutu', 'estimasi_ketidakpastian_pengukuran']));
        $analytic->save();
        return redirect()->route('lab.analisa.index')->with('message', 'Analisa Berhasil Diperbarui');
    }

    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            LabAnalisa::whereIn('kode', $codes)->delete();
            return redirect()->route('lab.analisa.index');
        }
        return redirect()->route('lab.analisa.index');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LabAnalisa $labAnalisa)
    {
        //
    }
}
