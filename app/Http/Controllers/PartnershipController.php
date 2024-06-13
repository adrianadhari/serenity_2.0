<?php

namespace App\Http\Controllers;

use App\Http\Requests\PartnershipRequest;
use App\Http\Requests\PartnershipUpdateRequest;
use App\Models\Institution;
use App\Models\Partnership;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class PartnershipController extends Controller
{
    protected $kategori_kemitraan;
    protected $status_kemitraan;

    public function __construct()
    {
        $this->kategori_kemitraan = Config::get('constantsdata.kategori_kemitraan');
        $this->status_kemitraan = Config::get('constantsdata.status_kemitraan');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $partnerships = Partnership::with('institutions')->latest()->get();

        return Inertia::render('Kemitraan/Index', [
            'partnerships' => $partnerships
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function create(): Response
    {
        $institutions = Institution::orderBy('nama', 'asc')->get();

        return Inertia::render('Kemitraan/Create', [
            'kategori' => $this->kategori_kemitraan,
            'status' => $this->status_kemitraan,
            'institutions' => $institutions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PartnershipRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $dok_kerjasama = $request->file('dok_kerjasama');
        if ($dok_kerjasama) {
            $fileName = 'dokumen-kerjasama-' . $request->nomor . '.' . $dok_kerjasama->extension();
            $dok_kerjasama->storeAs('public/dokumen-kerjasama', $fileName);
            $data['dok_kerjasama'] = $fileName;
        }

        $dok_roadmap = $request->file('dok_roadmap');
        if ($dok_roadmap) {
            $fileName = 'dokumen-roadmap-' . $request->nomor . '.' . $dok_roadmap->extension();
            $dok_roadmap->storeAs('public/dokumen-roadmap', $fileName);
            $data['dok_roadmap'] = $fileName;
        }

        $ids = [];
        foreach ($request->institutions as $item) {
            $ids[] = $item['id'];
        }

        $partnership = Partnership::create($data);
        $partnership->institutions()->attach($ids);

        return redirect()->route('kemitraan.index')->with('message', 'Kemitraan Berhasil Ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $institutions = Institution::orderBy('nama', 'asc')->get();
        $partnership = Partnership::with('institutions')->where('kode', $id)->first();

        if (!$partnership) {
            abort(404);
        }

        return Inertia::render('Kemitraan/Edit', [
            'kategori' => $this->kategori_kemitraan,
            'status' => $this->status_kemitraan,
            'partnership' => $partnership,
            'institutions' => $institutions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PartnershipUpdateRequest $request, $kode): RedirectResponse
    {
        $partnership = Partnership::where('kode', $kode)->firstOrFail();

        $dok_kerjasama = $request->file('dok_kerjasama');
        $dokKerjasamaName = $partnership->dok_kerjasama;
        if ($dok_kerjasama) {
            Storage::delete('public/dokumen-kerjasama/' . $dokKerjasamaName);
            $dokKerjasamaName = 'dokumen-kerjasama-' . $request->nomor . '.' . $dok_kerjasama->extension();
            $dok_kerjasama->storeAs('public/dokumen-kerjasama', $dokKerjasamaName);
        }

        $dok_roadmap = $request->file('dok_roadmap');
        $dokRoadmapName = $partnership->dok_roadmap;
        if ($dok_roadmap) {
            Storage::delete('public/dokumen-roadmap/' . $dokRoadmapName);
            $dokRoadmapName = 'dokumen-roadmap-' . $request->nomor . '.' . $dok_roadmap->extension();
            $dok_roadmap->storeAs('public/dokumen-roadmap', $dokRoadmapName);
        }

        $dataToUpdate = $request->all();
        $dataToUpdate['dok_kerjasama'] = $dokKerjasamaName;
        $dataToUpdate['dok_roadmap'] = $dokRoadmapName;

        $partnership->update($dataToUpdate);
        $partnership->institutions()->sync($dataToUpdate['institutions']);

        return redirect()->route('kemitraan.index')->with('message', 'Kemitraan Berhasil Diperbarui!');
    }

    public function multipleDelete(Request $request): RedirectResponse
    {
        $items = $request->input('items');
        if (is_array($items) && count($items) > 0) {
            foreach ($items as $item) {
                $partnership = Partnership::where('kode', $item['kode'])->first();
                if ($partnership && $partnership->dok_kerjasama == $item['dok_kerjasama']) {
                    Storage::delete('public/dokumen-kerjasama/' . $item['dok_kerjasama']);
                    $partnership->institutions()->detach();
                    $partnership->delete();
                }

                if ($partnership && $partnership->dok_roadmap == $item['dok_roadmap']) {
                    Storage::delete('public/dokumen-roadmap/' . $item['dok_roadmap']);
                    $partnership->institutions()->detach();
                    $partnership->delete();
                }
            }
            return redirect()->route('kemitraan.index');
        }
        return redirect()->route('kemitraan.index');
    }
}
