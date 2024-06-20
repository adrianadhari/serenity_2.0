<?php

namespace App\Http\Controllers;

use App\Http\Requests\LabPegawaiRequest;
use App\Http\Requests\LabPegawaiUpdateRequest;
use App\Models\LabPegawai;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;

class LabPegawaiController extends Controller
{
    protected $gender;
    protected $pendidikan;

    public function __construct()
    {
        $this->gender = Config::get('constantsdata.gender');
        $this->pendidikan = Config::get('constantsdata.pendidikan');
    }

    public function index(): Response
    {
        $employees = LabPegawai::latest()->get();
        return Inertia::render('Laboratorium/Pegawai/Index', [
            'employees' => $employees
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Laboratorium/Pegawai/Create', [
            'gender' => $this->gender,
            'pendidikan' => $this->pendidikan,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LabPegawaiRequest $request): RedirectResponse
    {
        $employee = $request->all();

        LabPegawai::create($employee);
        return redirect()->route('lab.pegawai.index')->with('message', 'Pegawai Berhasil Ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $pegawaiDetail = LabPegawai::where('kode', $id)->first();

        if (!$pegawaiDetail) {
            abort(404);
        }

        return Inertia::render('Laboratorium/Pegawai/Edit', [
            'gender' => $this->gender,
            'pendidikan' => $this->pendidikan,
            'pegawaiDetail' => $pegawaiDetail,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LabPegawaiUpdateRequest $request, $kode): RedirectResponse
    {
        $employee = LabPegawai::where('kode', $kode)->firstOrFail();

        $employee->update($request->all());
        return redirect()->route('lab.pegawai.index')->with('message', 'Pegawai Berhasil Diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            LabPegawai::whereIn('kode', $codes)->delete();
            return redirect()->route('lab.pegawai.index');
        }
        return redirect()->route('lab.pegawai.index');
    }
}
