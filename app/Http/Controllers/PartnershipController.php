<?php

namespace App\Http\Controllers;

use App\Http\Requests\PartnershipRequest;
use App\Models\Institution;
use App\Models\Partnership;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;

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
}
