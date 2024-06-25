<?php

namespace App\Http\Controllers;

use App\Models\Alat;
use App\Models\LabPegawai;
use App\Models\LabPelanggan;
use App\Models\PeminjamanAlat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardLabController extends Controller
{
    public function index()
    {
        $totalPelanggan = LabPelanggan::count();
        $totalPegawai = LabPegawai::count();
        $totalAlat = Alat::count();
        $totalPeminjaman = PeminjamanAlat::count();
        $totalDipinjam = PeminjamanAlat::where('status_peminjaman', 'Dipinjam')->count();
        $totalDikembalikan = PeminjamanAlat::where('status_peminjaman', 'Dikembalikan')->count();

        return Inertia::render('Dashboard/Laboratorium', [
            'totalPelanggan' => $totalPelanggan,
            'totalPegawai' => $totalPegawai,
            'totalAlat' => $totalAlat,
            'totalPeminjaman' => $totalPeminjaman,
            'totalDipinjam' => $totalDipinjam,
            'totalDikembalikan' => $totalDikembalikan,
        ]);
    }
}
