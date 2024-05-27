<?php

namespace App\Http\Controllers;

use App\Http\Requests\PublicationRequest;
use App\Models\Publication;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;

class PublikasiController extends Controller
{
    protected $tipe;
    protected $status;

    public function __construct()
    {
        $this->tipe = Config::get('constantsdata.tipe');
        $this->status = Config::get('constantsdata.status_publikasi');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $publications = Publication::latest()->get();
        return Inertia::render('Publikasi/Index', [
            'publications' => $publications
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Publikasi/Create', [
            'typeData' => $this->tipe,
            'statusData' => $this->status
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PublicationRequest $request): RedirectResponse
    {
        $pub = $request->all();

        Publication::create($pub);
        return redirect()->route('publikasi.index')->with('message', 'Publikasi Berhasil Ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $publication = Publication::where('kode', $id)->first();
        return Inertia::render('Publikasi/Edit', [
            'typeData' => $this->tipe,
            'statusData' => $this->status,
            'publicationDetail' => $publication
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PublicationRequest $request, string $id): RedirectResponse
    {
        $pub = Publication::where('kode', $id)->first();
        $pub->update($request->all());
        return redirect()->route('publikasi.index')->with('message', 'Publikasi Berhasil Diperbarui!');
    }

    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            Publication::whereIn('kode', $codes)->delete();
            return redirect()->route('publikasi.index');
        }
        return redirect()->route('publikasi.index');
    }
}
