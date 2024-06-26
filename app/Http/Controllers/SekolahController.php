<?php

namespace App\Http\Controllers;

use App\Exports\SchoolExport;
use App\Exports\TemplateSchoolExport;
use App\Http\Requests\SchoolRequest;
use App\Http\Requests\SchoolUpdateRequest;
use App\Imports\SchoolImport;
use App\Models\School;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class SekolahController extends Controller
{
    protected $schools;
    protected $categories;
    protected $types;

    public function __construct()
    {
        $this->schools = Config::get('constantsdata.school');
        $this->categories = Config::get('constantsdata.category');
        $this->types = Config::get('constantsdata.type');
    }

    public function index(): Response
    {
        $schools = School::latest()->get();
        return Inertia::render('Sekolah/Index', [
            'schools' => $schools
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Sekolah/Create', [
            'school' => $this->schools,
            'schoolCategory' => $this->categories,
            'schoolType' => $this->types
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SchoolRequest $request): RedirectResponse
    {
        $school = $request->all();

        $school['provinsi'] = $school['provinsi']['name'];
        $school['kota'] = $school['kota']['name'];

        School::create($school);
        return redirect()->route('sekolah.index')->with('message', 'Sekolah Berhasil Ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id): Response
    {
        $school = School::where('kode_sekolah', $id)->first();

        if (!$school) {
            abort(404);
        }

        return Inertia::render('Sekolah/Edit', [
            'schoolDetail' => $school,
            'school' => $this->schools,
            'schoolCategory' => $this->categories,
            'schoolType' => $this->types
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SchoolUpdateRequest $request, $kode): RedirectResponse
    {
        $school = School::where('kode_sekolah', $kode)->firstOrFail();
        $school->update($request->validated());
        return redirect()->route('sekolah.index')->with('message', 'Sekolah Berhasil Diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            School::whereIn('kode_sekolah', $codes)->delete();
            return redirect()->route('sekolah.index');
        }
        return redirect()->route('sekolah.index');
    }

    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => ['required', 'mimes:csv,xls,xlsx']
        ]);

        $file = $request->file('file');
        Excel::import(new SchoolImport, $file);

        return redirect()->back();
    }

    public function export()
    {
        return Excel::download(new SchoolExport, 'schools-' . Carbon::now()->format('d-m-Y') . '.xlsx');
    }

    public function downloadTemplate()
    {
        return Excel::download(new TemplateSchoolExport, 'template-schools.xlsx');
    }
}
