<?php

namespace App\Http\Controllers;

use App\Http\Requests\ToolRequest;
use App\Http\Requests\ToolUpdateRequest;
use App\Models\Alat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;

class AlatController extends Controller
{
    protected $kategori_alat;
    protected $status_bmn;
    protected $sumber_dana;

    public function __construct()
    {
        $this->kategori_alat = Config::get('constantsdata.kategori_alat');
        $this->status_bmn = Config::get('constantsdata.status_bmn');
        $this->sumber_dana = Config::get('constantsdata.sumber_dana');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $tools = Alat::latest()->get();
        return Inertia::render('Laboratorium/Alat/Index', [
            'tools' => $tools
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Laboratorium/Alat/Create', [
            'kategori_alat' => $this->kategori_alat,
            'status_bmn' => $this->status_bmn,
            'sumber_dana' => $this->sumber_dana
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ToolRequest $request): RedirectResponse
    {
        $tool = $request->all();
        Alat::create($tool);
        return redirect()->route('lab.alat.index')->with('message', 'Alat Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Alat $alat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $toolDetail = Alat::where('kode_alat', $id)->first();

        if (!$toolDetail) {
            abort(404);
        }

        return Inertia::render('Laboratorium/Alat/Edit', [
            'toolDetail' => $toolDetail,
            'kategori_alat' => $this->kategori_alat,
            'status_bmn' => $this->status_bmn,
            'sumber_dana' => $this->sumber_dana
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(ToolUpdateRequest $request, string $id)
    {
        $tool = Alat::where('kode_alat', $id)->first();
        $tool->update($request->all());
        return redirect()->route('lab.alat.index')->with('message', 'Alat Berhasil Diperbarui');
    }

    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            Alat::whereIn('kode_alat', $codes)->delete();
            return redirect()->route('lab.alat.index');
        }
        return redirect()->route('lab.alat.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alat $alat)
    {
        //
    }
}
