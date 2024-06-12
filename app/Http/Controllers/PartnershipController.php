<?php

namespace App\Http\Controllers;

use App\Models\Institution;
use App\Models\Partnership;
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
}
