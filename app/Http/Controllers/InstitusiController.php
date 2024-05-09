<?php

namespace App\Http\Controllers;

use App\Http\Requests\InstitutionRequest;
use App\Models\Institution;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InstitusiController extends Controller
{
    private $institutionData;

    public function __construct()
    {
        $this->institutionData = Institution::getInstitutionData();
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
            'negara' => $this->institutionData['negara'],
            'grup' => $this->institutionData['grup'],
            'jenis' => $this->institutionData['jenis']
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(InstitutionRequest $request): RedirectResponse
    {
        $institution = $request->all();

        $institution['kode'] = 'I' . time();

        Institution::create($institution);
        return redirect()->route('institusi.index')->with('message', 'Institusi Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $institution = Institution::where('kode', $id)->first();
        return Inertia::render('Institusi/Edit', [
            'institutionDetail' => $institution,
            'negara' => $this->institutionData['negara'],
            'grup' => $this->institutionData['grup'],
            'jenis' => $this->institutionData['jenis']
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
    public function destroy(string $id): RedirectResponse
    {
        $institution = Institution::where('kode', $id)->first();
        $institution->delete();
        return back();
    }
}
