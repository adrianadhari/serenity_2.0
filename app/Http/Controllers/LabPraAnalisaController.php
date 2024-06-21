<?php

namespace App\Http\Controllers;

use App\Http\Requests\LabPraAnalisaRequest;
use App\Models\LabPelanggan;
use App\Models\LabPraAnalisa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class LabPraAnalisaController extends Controller
{
    protected $jenis_pelayanan;
    protected $status_tarif;
    protected $files;

    public function __construct()
    {
        $this->jenis_pelayanan = Config::get('constantsdata.jenis_pelayanan');
        $this->status_tarif = Config::get('constantsdata.status_tarif');
        $this->files = [
            'surat_masuk' => 'surat-masuk',
            'surat_balasan' => 'surat-balasan',
            'invoice_dp' => 'invoice-dp',
            'bukti_bayar_dp' => 'bukti-bayar-dp',
            'permintaan_tender' => 'permintaan-tender',
            'sppc' => 'sppc',
            'buku_agenda' => 'buku-agenda',
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $praAnalisas = LabPraAnalisa::latest()->get();
        return Inertia::render('Laboratorium/PraAnalisa/Index', [
            'praAnalisas' => $praAnalisas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $customers_name = LabPelanggan::pluck('nama_pelanggan');

        return Inertia::render('Laboratorium/PraAnalisa/Create', [
            'jenis' => $this->jenis_pelayanan,
            'status' => $this->status_tarif,
            'customers_name' => $customers_name
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LabPraAnalisaRequest $request): RedirectResponse
    {
        $pelanggan_id = LabPelanggan::where('nama_pelanggan', $request->pelanggan_name)->pluck('id')->first();
        $request['pelanggan_id'] = $pelanggan_id;

        $data = $request->except('pelanggan_name');

        foreach ($this->files as $field => $path) {
            $file = $request->file($field);
            if ($file) {
                $fileName = $path . '-' . time() . '.' . $file->extension();
                $file->storeAs('public/' . $path, $fileName);
                $data[$field] = $fileName;
            }
        }

        LabPraAnalisa::create($data);
        return redirect()->route('lab.pra-analisa.index')->with('message', 'Data Laboratorium Pra Analisa Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $detailData = LabPraAnalisa::where('kode', $id)->with('labPelanggans', 'labSppcs', 'labTenders', 'labAgendas')->first();

        if (!$detailData) {
            abort(404);
        }

        return Inertia::render('Laboratorium/PraAnalisa/Show', [
            'detailData' => $detailData,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $detailData = LabPraAnalisa::where('kode', $id)->with('labPelanggans')->first();

        if (!$detailData) {
            abort(404);
        }

        $customers_name = LabPelanggan::pluck('nama_pelanggan');

        return Inertia::render('Laboratorium/PraAnalisa/Edit', [
            'jenis' => $this->jenis_pelayanan,
            'status' => $this->status_tarif,
            'customers_name' => $customers_name,
            'detailData' => $detailData
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LabPraAnalisaRequest $request, string $id): RedirectResponse
    {
        $praAnalisa = LabPraAnalisa::where('kode', $id)->first();

        $pelanggan_id = LabPelanggan::where('nama_pelanggan', $request->pelanggan_name)->pluck('id')->first();
        $request['pelanggan_id'] = $pelanggan_id;

        $data = $request->except('pelanggan_name');

        foreach ($this->files as $field => $path) {
            $file = $request->file($field);
            $fileName = $praAnalisa->$field;
            if ($file) {
                Storage::delete('public/' . $path . '/' . $fileName);
                $fileName = $path . '-' . time() . '.' . $file->extension();
                $file->storeAs('public/' . $path, $fileName);
            }
            $data[$field] = $fileName;
        }

        $praAnalisa->update($data);
        return redirect()->route('lab.pra-analisa.index')->with('message', 'Data Laboratorium Pra Analisa Berhasil Diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function multipleDelete(Request $request): RedirectResponse
    {
        $items = $request->input('items');

        if (is_array($items) && count($items) > 0) {
            foreach ($items as $item) {
                $data = LabPraAnalisa::where('kode', $item['kode'])->first();

                foreach ($this->files as $field => $path) {
                    if ($data && $data->$field == $item[$field]) {
                        Storage::delete('public/' . $path . '/' . $item[$field]);
                        $data->delete();
                    }
                }
            }
            return redirect()->route('lab.pra-analisa.index');
        }
        return redirect()->route('lab.pra-analisa.index');
    }
}
