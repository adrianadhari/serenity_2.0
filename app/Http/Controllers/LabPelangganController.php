<?php

namespace App\Http\Controllers;

use App\Http\Requests\LabPelangganRequest;
use App\Models\LabPelanggan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;

class LabPelangganController extends Controller
{
    protected $gender;
    protected $lab_instansi;

    public function __construct()
    {
        $this->gender = Config::get('constantsdata.gender');
        $this->lab_instansi = Config::get('constantsdata.lab_instansi');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $customers = LabPelanggan::latest()->get();
        return Inertia::render('Laboratorium/Pelanggan/Index', [
            'customers' => $customers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Laboratorium/Pelanggan/Create', [
            'gender' => $this->gender,
            'agency' => $this->lab_instansi,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LabPelangganRequest $request): RedirectResponse
    {
        $customer = $request->all();

        LabPelanggan::create($customer);
        return redirect()->route('lab.pelanggan.index')->with('message', 'Pelanggan Berhasil Ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $customer = LabPelanggan::where('kode', $id)->first();

        if (!$customer) {
            abort(404);
        }

        return Inertia::render('Laboratorium/Pelanggan/Edit', [
            'customerDetail' => $customer,
            'gender' => $this->gender,
            'agency' => $this->lab_instansi,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LabPelangganRequest $request, string $id): RedirectResponse
    {
        $customer = LabPelanggan::where('kode', $id)->first();
        $customer->update($request->all());
        return redirect()->route('lab.pelanggan.index')->with('message', 'Pelanggan Berhasil Diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            LabPelanggan::whereIn('kode', $codes)->delete();
            return redirect()->route('lab.pelanggan.index');
        }
        return redirect()->route('lab.pelanggan.index');
    }
}
