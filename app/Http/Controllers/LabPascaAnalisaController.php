<?php

namespace App\Http\Controllers;

use App\Models\LabPascaAnalisa;
use App\Http\Requests\LabPascaAnalisaRequest;
use App\Http\Requests\LabPascaAnalisaUpdateRequest;
use App\Models\LabAnalisa;
use App\Models\LabPraAnalisa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class LabPascaAnalisaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $pascaAnalytics = LabPascaAnalisa::with(['labPraAnalisa.labPelanggans'])->get();
        return Inertia::render('Laboratorium/PascaAnalisa/Index', [
            'pascaAnalytics' => $pascaAnalytics
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $kode_pra_analisa = LabPraAnalisa::pluck('kode');
        return Inertia::render('Laboratorium/PascaAnalisa/Create', [
            'kode_pra_analisa' => $kode_pra_analisa
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LabPascaAnalisaRequest $request): RedirectResponse
    {
        $lab_pra_analisa_id = LabPraAnalisa::where('kode', $request->kode_pra_analisa)->pluck('id')->first();
        $request['lab_pra_analisa_id'] = $lab_pra_analisa_id;

        $pascaAnalisa = $request->except(['kode_pra_analisa']);

        $invoicePelunasan = $request->file('invoice_pelunasan');
        if ($invoicePelunasan) {
            $fileName = time() . $invoicePelunasan->getClientOriginalName();
            $invoicePelunasan->storeAs('public/pasca-analisa', $fileName);
            $pascaAnalisa['invoice_pelunasan'] = $fileName;
        }

        $buktiPembayaran = $request->file('bukti_pembayaran');
        if ($buktiPembayaran) {
            $fileName = time() .$buktiPembayaran->getClientOriginalName();
            $buktiPembayaran->storeAs('public/pasca-analisa', $fileName);
            $pascaAnalisa['bukti_pembayaran'] = $fileName;
        }

        $lembarHasilUji = $request->file('lembar_hasil_uji');
        if ($lembarHasilUji) {
            $fileName = time() .$lembarHasilUji->getClientOriginalName();
            $lembarHasilUji->storeAs('public/pasca-analisa', $fileName);
            $pascaAnalisa['lembar_hasil_uji'] = $fileName;
        }

        LabPascaAnalisa::create($pascaAnalisa);
        return redirect()->route('lab.pasca-analisa.index')->with('message', 'Pasca Analisa Berhasil Ditambahkan!');
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
        $pascaAnalyticDetail = LabPascaAnalisa::where('kode', $id)->with(['labPraAnalisa.labPelanggans'])->first();
        $kode_pra_analisa = LabPraAnalisa::pluck('kode');
        return Inertia::render('Laboratorium/PascaAnalisa/Edit', [
            'kode_pra_analisa' => $kode_pra_analisa,
            'pascaAnalyticDetail' => $pascaAnalyticDetail
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LabPascaAnalisaUpdateRequest $request, $kode): RedirectResponse
    {
        $pascaAnalytic = LabPascaAnalisa::where('kode', $kode)->firstOrFail();
        $lab_pra_analisa_id = LabPraAnalisa::where('kode', $request->kode_pra_analisa)->pluck('id')->first();

        $request['lab_pra_analisa_id'] = $lab_pra_analisa_id;

        if ($request->hasFile('invoice_pelunasan')) {
            Storage::delete('public/pasca-analisa/' . $pascaAnalytic->invoice_pelunasan);
            $fileName = time() . $request->file('invoice_pelunasan')->getClientOriginalName();
            $request->file('invoice_pelunasan')->storeAs('public/pasca-analisa', $fileName);
            $pascaAnalytic->invoice_pelunasan = $fileName;
        }
    
        if ($request->hasFile('bukti_pembayaran')) {
            Storage::delete('public/pasca-analisa/' . $pascaAnalytic->bukti_pembayaran);
            $fileName = time() . $request->file('bukti_pembayaran')->getClientOriginalName();
            $request->file('bukti_pembayaran')->storeAs('public/pasca-analisa', $fileName);
            $pascaAnalytic->bukti_pembayaran = $fileName;
        }
    
        if ($request->hasFile('lembar_hasil_uji')) {
            Storage::delete('public/pasca-analisa/' . $pascaAnalytic->lembar_hasil_uji);
            $fileName = time() . $request->file('lembar_hasil_uji')->getClientOriginalName();
            $request->file('lembar_hasil_uji')->storeAs('public/pasca-analisa', $fileName);
            $pascaAnalytic->lembar_hasil_uji = $fileName;
        }
    
        $pascaAnalytic->fill($request->except(['kode_pra_analisa', 'invoice_pelunasan', 'bukti_pembayaran', 'lembar_hasil_uji']));
        $pascaAnalytic->save();
        return redirect()->route('lab.pasca-analisa.index')->with('message', 'Pasca Analisa Berhasil Diperbarui');
    }

    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            LabPascaAnalisa::whereIn('kode', $codes)->delete();
            return redirect()->route('lab.pasca-analisa.index');
        }
        return redirect()->route('lab.pasca-analisa.index');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LabAnalisa $labAnalisa)
    {
        //
    }
}
