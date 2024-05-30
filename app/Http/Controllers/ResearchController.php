<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResearchRequest;
use App\Models\Institution;
use App\Models\Publication;
use App\Models\Research;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;

class ResearchController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $kategori_penelitian;
    protected $jenis_flagship;
    protected $area_penelitian;
    protected $status_penelitian;

    public function __construct()
    {
        $this->kategori_penelitian = Config::get('constantsdata.kategori_penelitian');
        $this->jenis_flagship = Config::get('constantsdata.jenis_flagship');
        $this->area_penelitian = Config::get('constantsdata.area_penelitian');
        $this->status_penelitian = Config::get('constantsdata.status_penelitian');
    }

    public function index()
    {
        $researches = Research::with(['institution', 'publication'])->latest()->get();
        return Inertia::render('Penelitian/Index', [
            'researches' => $researches
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $institusi = Institution::pluck('nama');
        $publikasi = Publication::pluck('judul');

        return Inertia::render('Penelitian/Create', [
            'kategori_penelitian' => $this->kategori_penelitian,
            'jenis_flagship' => $this->jenis_flagship,
            'area_penelitian' => $this->area_penelitian,
            'status_penelitian' => $this->status_penelitian,
            'institusi' => $institusi,
            'publikasi' => $publikasi,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ResearchRequest $request): RedirectResponse
    {
        $institution_id = Institution::where('nama', $request->institusi)->pluck('id')->first();

        $request['institution_id'] = $institution_id;

        $publication_id = Publication::where('judul', $request->publikasi)->pluck('id')->first();

        $request['publication_id'] = $publication_id;

        $research = $request->except(['institusi', 'publikasi']);

        Research::create($research);
        return redirect()->route('penelitian.index')->with('message', 'Penelitian Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Research $research)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $researchDetail = Research::where('kode_penelitian', $id)->with(['institution', 'publication'])->first();
        $institusi = Institution::pluck('nama');
        $publikasi = Publication::pluck('judul');

        return Inertia::render('Penelitian/Edit', [
            'kategori_penelitian' => $this->kategori_penelitian,
            'jenis_flagship' => $this->jenis_flagship,
            'area_penelitian' => $this->area_penelitian,
            'status_penelitian' => $this->status_penelitian,
            'institusi' => $institusi,
            'publikasi' => $publikasi,
            'researchDetail' => $researchDetail,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ResearchRequest $request, string $id): RedirectResponse
    {
        $research = Research::where('kode_penelitian', $id)->first();
        $institution_id = Institution::where(
            'nama',
            $request->institusi
        )->pluck('id')->first();

        $request['institution_id'] = $institution_id;

        $publication_id = Publication::where(
            'judul',
            $request->publikasi
        )->pluck('id')->first();

        $request['publication_id'] = $publication_id;

        $research->update($request->except(['institusi', 'publikasi']));
        return redirect()->route('penelitian.index')->with('message', 'Penelitian Berhasil Diperbarui!');
    }


    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            Research::whereIn('kode_penelitian', $codes)->delete();
            return redirect()->route('penelitian.index');
        }
        return redirect()->route('penelitian.index');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Research $research)
    {
        //
    }
}
