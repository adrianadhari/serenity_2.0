<?php

namespace App\Http\Controllers;

use App\Http\Requests\InstitutionRequest;
use App\Models\Institution;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;

class InstitusiController extends Controller
{
    protected $negara;
    protected $grup;
    protected $jenis;

    public function __construct()
    {
        $this->negara = Config::get('constantsdata.negara');
        $this->grup = Config::get('constantsdata.grup');
        $this->jenis = Config::get('constantsdata.jenis');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $institutions = Institution::latest()->get();
        return Inertia::render('Institusi/Index', [
            'institutions' => $institutions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Institusi/Create', [
            'negara' => $this->negara,
            'grup' => $this->grup,
            'jenis' => $this->jenis
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(InstitutionRequest $request): RedirectResponse
    {
        $institution = $request->all();

        $institution['kode'] = 'IN' . time();

        Institution::create($institution);
        return redirect()->route('institusi.index')->with('message', 'Institusi Berhasil Ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $institution = Institution::where('kode', $id)->first();
        return Inertia::render('Institusi/Edit', [
            'institutionDetail' => $institution,
            'negara' => $this->negara,
            'grup' => $this->grup,
            'jenis' => $this->jenis
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(InstitutionRequest $request, string $id): RedirectResponse
    {
        $institution = Institution::where('kode', $id)->first();
        $institution->update($request->all());
        return redirect()->route('institusi.index')->with('message', 'Institusi Berhasil Diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            Institution::whereIn('kode', $codes)->delete();
            return redirect()->route('institusi.index');
        }
        return redirect()->route('institusi.index');
    }
}
