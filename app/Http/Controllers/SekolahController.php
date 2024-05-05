<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchoolRequest;
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
        $schools = School::latest()->get();
        return Inertia::render('Sekolah/Index', [
            'schools' => $schools
        ]);
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
    public function store(SchoolRequest $request)
    {
        $school = $request->all();

        $school['kode_sekolah'] = 'S' . time();
        $school['provinsi'] = $school['provinsi']['name'];
        $school['kota'] = $school['kota']['name'];

        School::create($school);
        return redirect()->route('sekolah.index')->with('message', 'Sekolah Berhasil Ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $school = School::where('kode_sekolah', $id)->first();
        return Inertia::render('Sekolah/Edit', [
            'schoolDetail' => $school,
            'school' => $this->schoolData['school'],
            'schoolCategory' => $this->schoolData['category'],
            'schoolType' => $this->schoolData['type']
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SchoolRequest $request, $id)
    {
        $school = School::where('kode_sekolah', $id)->first();
        $school->update($request->all());
        return redirect()->route('sekolah.index')->with('message', 'Sekolah Berhasil Diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $school = School::where('kode_sekolah', $id)->first();
        $school->delete();
        return back();
    }
}
