<?php

namespace App\Http\Controllers;

use App\Http\Requests\PeminjamanRequest;
use App\Http\Requests\PeminjamanUpdateRequest;
use App\Models\Alat;
use App\Models\LabPelanggan;
use App\Models\PeminjamanAlat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PeminjamanAlatController extends Controller
{
    protected $status_tarif;
    protected $status_peminjaman;

    public function __construct()
    {
        $this->status_tarif = Config::get('constantsdata.status_tarif');
        $this->status_peminjaman = Config::get('constantsdata.status_peminjaman');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $peminjamans = PeminjamanAlat::with(['labPelanggan', 'alat'])->latest()->get();
        return Inertia::render('Laboratorium/Peminjaman/Index', [
            'peminjamans' => $peminjamans
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $tools_name = Alat::pluck('nama_alat');
        $nama_pelanggan = LabPelanggan::pluck('nama_pelanggan');
        return Inertia::render('Laboratorium/Peminjaman/Create', [
            'status_tarif' => $this->status_tarif,
            'status_peminjaman' => $this->status_peminjaman,
            'tools_name' => $tools_name,
            'nama_pelanggan' => $nama_pelanggan
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PeminjamanUpdateRequest $request): RedirectResponse
    {
        $alat_id = Alat::where('nama_alat', $request->nama_alat)->pluck('id')->first();
        $lab_pelanggan_id = LabPelanggan::where('nama_pelanggan', $request->nama_pelanggan)->pluck('id')->first();

        $request['alat_id'] = $alat_id;
        $request['lab_pelanggan_id'] = $lab_pelanggan_id;

        $peminjaman = $request->except(['nama_alat', 'nama_pelanggan']);

        $suratMasuk = $request->file('surat_masuk');
        if ($suratMasuk) {
            $fileName = $suratMasuk->getClientOriginalName();
            $suratMasuk->storeAs('public/peminjaman-alat', $fileName);
            $peminjaman['surat_masuk'] = $fileName;
        }

        $suratBalasan = $request->file('surat_balasan');
        if ($suratBalasan) {
            $fileName = $suratBalasan->getClientOriginalName();
            $suratBalasan->storeAs('public/peminjaman-alat', $fileName);
            $peminjaman['surat_balasan'] = $fileName;
        }

        $invoicePelunasan = $request->file('invoice_pelunasan');
        if ($invoicePelunasan) {
            $fileName = $invoicePelunasan->getClientOriginalName();
            $invoicePelunasan->storeAs('public/peminjaman-alat', $fileName);
            $peminjaman['invoice_pelunasan'] = $fileName;
        }

        $buktiPembayaran = $request->file('bukti_pembayaran');
        if ($buktiPembayaran) {
            $fileName = $buktiPembayaran->getClientOriginalName();
            $buktiPembayaran->storeAs('public/peminjaman-alat', $fileName);
            $peminjaman['bukti_pembayaran'] = $fileName;
        }

        $kontrak_peminjaman_alat = $request->file('kontrak_peminjaman_alat');
        if ($kontrak_peminjaman_alat) {
            $fileName = $kontrak_peminjaman_alat->getClientOriginalName();
            $kontrak_peminjaman_alat->storeAs('public/peminjaman-alat', $fileName);
            $peminjaman['kontrak_peminjaman_alat'] = $fileName;
        }

        $form_serah_terima_alat = $request->file('form_serah_terima_alat');
        if ($form_serah_terima_alat) {
            $fileName = $form_serah_terima_alat->getClientOriginalName();
            $form_serah_terima_alat->storeAs('public/peminjaman-alat', $fileName);
            $peminjaman['form_serah_terima_alat'] = $fileName;
        }
        PeminjamanAlat::create($peminjaman);
        return redirect()->route('lab.peminjaman.index')->with('message', 'Peminjaman Alat Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Alat $alat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $peminjamanDetail = PeminjamanAlat::where('kode_peminjaman', $id)->with(['alat', 'labPelanggan'])->first();

        if (!$peminjamanDetail) {
            abort(404);
        }
        $tools_name = Alat::pluck('nama_alat');
        $nama_pelanggan = LabPelanggan::pluck('nama_pelanggan');

        return Inertia::render('Laboratorium/Peminjaman/Edit', [
            'peminjamanDetail' => $peminjamanDetail,
            'status_tarif' => $this->status_tarif,
            'status_peminjaman' => $this->status_peminjaman,
            'tools_name' => $tools_name,
            'nama_pelanggan' => $nama_pelanggan
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(PeminjamanRequest $request, $kode): RedirectResponse
    {
        $peminjaman = PeminjamanAlat::where('kode_peminjaman', $kode)->firstOrFail();
        $alat_id = Alat::where('nama_alat', $request->nama_alat)->pluck('id')->first();
        $lab_pelanggan_id = LabPelanggan::where('nama_pelanggan', $request->nama_pelanggan)->pluck('id')->first();

        $request['alat_id'] = $alat_id;
        $request['lab_pelanggan_id'] = $lab_pelanggan_id;

        if ($request['status_peminjaman'] == "Dikembalikan") {
            $request['tanggal_pengembalian'] = now();
        }

        $suratMasuk = $request->file('surat_masuk');
        $suratMasukFileName = $peminjaman->surat_masuk;
        if ($suratMasuk) {
            Storage::delete('public/peminjaman-alat/' . $suratMasukFileName);
            $fileName = $suratMasuk->getClientOriginalName();
            $suratMasuk->storeAs('public/peminjaman-alat', $fileName);
            $peminjaman['surat_masuk'] = $fileName;
        }

        $suratBalasan = $request->file('surat_balasan');
        $suratBalasanFileName = $peminjaman->surat_balasan;
        if ($suratBalasan) {
            Storage::delete('public/peminjaman-alat/' . $suratBalasanFileName);
            $fileName = $suratBalasan->getClientOriginalName();
            $suratBalasan->storeAs('public/peminjaman-alat', $fileName);
            $peminjaman['surat_balasan'] = $fileName;
        }

        $invoicePelunasan = $request->file('invoice_pelunasan');
        $invoicePelunasanFileName = $peminjaman->invoice_pelunasan;
        if ($invoicePelunasan) {
            Storage::delete('public/peminjaman-alat/' . $invoicePelunasanFileName);
            $fileName = $invoicePelunasan->getClientOriginalName();
            $invoicePelunasan->storeAs('public/peminjaman-alat', $fileName);
            $peminjaman['invoice_pelunasan'] = $fileName;
        }

        $buktiPembayaran = $request->file('bukti_pembayaran');
        $buktiPembayaranFileName = $peminjaman->bukti_pembayaran;
        if ($buktiPembayaran) {
            Storage::delete('public/peminjaman-alat/' . $buktiPembayaranFileName);
            $fileName = $buktiPembayaran->getClientOriginalName();
            $buktiPembayaran->storeAs('public/peminjaman-alat', $fileName);
            $peminjaman['bukti_pembayaran'] = $fileName;
        }

        $kontrak_peminjaman_alat = $request->file('kontrak_peminjaman_alat');
        $kontrak_peminjaman_alat_filename = $peminjaman->kontrak_peminjaman_alat;
        if ($kontrak_peminjaman_alat) {
            Storage::delete('public/peminjaman-alat/' . $kontrak_peminjaman_alat_filename);
            $fileName = $kontrak_peminjaman_alat->getClientOriginalName();
            $kontrak_peminjaman_alat->storeAs('public/peminjaman-alat', $fileName);
            $peminjaman['kontrak_peminjaman_alat'] = $fileName;
        }

        $form_serah_terima_alat = $request->file('form_serah_terima_alat');
        $formSerahTerimaAlatFileName = $peminjaman->form_serah_terima_alat;
        if ($form_serah_terima_alat) {
            Storage::delete('public/peminjaman-alat/' . $formSerahTerimaAlatFileName);
            $fileName = $form_serah_terima_alat->getClientOriginalName();
            $form_serah_terima_alat->storeAs('public/peminjaman-alat', $fileName);
            $peminjaman['form_serah_terima_alat'] = $fileName;
        }
        $peminjaman->update($request->except(['nama_alat', 'nama_pelanggan']));
        return redirect()->route('lab.peminjaman.index')->with('message', 'Peminjaman Alat Berhasil Diperbarui!');
    }

    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            PeminjamanAlat::whereIn('kode_peminjaman', $codes)->delete();
            return redirect()->route('lab.peminjaman.index');
        }
        return redirect()->route('lab.peminjaman.index');
    }
}
