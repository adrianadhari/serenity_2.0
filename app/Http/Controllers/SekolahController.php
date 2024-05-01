<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SekolahController extends Controller
{
    private $schoolData;

    public function __construct()
    {
        $this->schoolData = School::getSchoolData();
    }

    public function index()
    {
        return Inertia::render('Sekolah/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Sekolah/Create', [
            'school' => $this->schoolData['school'],
            'schoolCategory' => $this->schoolData['category'],
            'schoolType' => $this->schoolData['type']
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $school = $request->validate([
            'nama_sekolah' => ['required', 'string', 'max:255', 'unique:' . School::class],
            'kategori_sekolah' => ['required', Rule::in($this->schoolData['category'])],
            'jenis_sekolah' => ['required', Rule::in($this->schoolData['school'])],
            'tipe_sekolah' => ['required', Rule::in($this->schoolData['type'])],
            'provinsi' => ['required', 'max:255'],
            'kota' => ['required', 'max:255'],
            'alamat_sekolah' => ['required', 'string'],
            'nama_kontak' => ['required', 'max:255', 'string'],
            'telp' => ['required', 'max:13', 'string'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'tgl_registrasi' => ['required', 'date'],
        ]);

        $kode_sekolah = 'S' . time();
        $school['kode_sekolah'] = $kode_sekolah;
        $school['provinsi'] = $school['provinsi']['name'];
        $school['kota'] = $school['kota']['name'];

        School::create($school);
        return redirect()->route('sekolah.index')->with('message', 'Sekolah Berhasil Ditambahkan!');
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
    public function edit()
    {
        return Inertia::render('Sekolah/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
