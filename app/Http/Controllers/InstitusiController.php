<?php

namespace App\Http\Controllers;

use App\Exports\InstitutionExport;
use App\Exports\TemplateInstitutionExport;
use App\Http\Requests\InstitutionRequest;
use App\Http\Requests\InstitutionUpdateRequest;
use App\Imports\InstitutionImport;
use App\Models\Institution;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

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
    public function update(InstitutionUpdateRequest $request, string $id): RedirectResponse
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

    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => ['required', 'mimes:csv,xls,xlsx']
        ]);

        $file = $request->file('file');
        $nama_file = $file->hashName();
        $file->storeAs('public/excel/', $nama_file);
        Excel::import(new InstitutionImport(), storage_path('app/public/excel/' . $nama_file));
        Storage::delete('public/excel/' . $nama_file);

        return redirect()->back();
    }

    public function export()
    {
        return Excel::download(new InstitutionExport(), 'institutions-' . Carbon::now()->format('Y-m-d') . '.xlsx');
    }

    public function downloadTemplate()
    {
        return Excel::download(new TemplateInstitutionExport(), 'template-institutions.xlsx');
    }
}
