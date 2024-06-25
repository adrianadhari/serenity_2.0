<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Partnership;
use App\Models\PesertaKegiatan;
use App\Models\Research;
use App\Models\School;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        $totalSchool = School::count();
        $mouAktif = Partnership::where('tgl_akhir', '>', $today)->count();
        $mouNonAktif = Partnership::where('tgl_akhir', '<=', $today)->count();
        $totalTraining = Kegiatan::count();
        $totalPenelitian = Research::count();
        $sekolahUtama = School::where('kategori_sekolah', 'Utama')->count();
        $sekolahMadya = School::where('kategori_sekolah', 'Madya')->count();
        $sekolahPariPurna = School::where('kategori_sekolah', 'Pari Purna')->count();
        $allKegiatan = Kegiatan::all();

        return Inertia::render('Dashboard/Utama', [
            'totalSchool' => $totalSchool,
            'mouAktif' => $mouAktif,
            'mouNonAktif' => $mouNonAktif,
            'totalTraining' => $totalTraining,
            'totalPenelitian' => $totalPenelitian,
            'sekolahUtama' => $sekolahUtama,
            'sekolahMadya' => $sekolahMadya,
            'sekolahPariPurna' => $sekolahPariPurna,
            'allKegiatan' => $allKegiatan,
        ]);
    }

    public function searchDocument(Request $request)
    {
        $start_date = $request->awal;
        $end_date = $request->akhir;

        $selectedData = Partnership::where(function ($query) use ($start_date, $end_date) {
            $query->whereBetween('tgl_awal', [$start_date, $end_date])
                ->orWhereBetween('tgl_akhir', [$start_date, $end_date])
                ->orWhere(function ($query) use ($start_date, $end_date) {
                    $query->where('tgl_awal', '<=', $start_date)
                        ->where('tgl_akhir', '>=', $end_date);
                });
        })->get();


        return response()->json($selectedData);
    }

    public function searchResearch(Request $request)
    {
        $start_date = $request->awal;
        $end_date = $request->akhir;
        $status = $request->status;

        $selectedData = Research::when($start_date && $end_date, function ($query) use ($start_date, $end_date) {
            $query->whereBetween('created_at', [$start_date, $end_date]);
        })->when($status && $status !== 'All', function ($query) use ($status) {
            $query->where('status_penelitian', $status);
        })->with(['institution', 'publication'])->get();

        return response()->json($selectedData);
    }

    public function searchParticipant(Request $request)
    {
        $judul = $request->judul;
        $kegiatan_id = Kegiatan::where('judul_kegiatan', $judul)->pluck('id')->first();
        $selectedData = PesertaKegiatan::where('kegiatan_id', $kegiatan_id)->with('student', 'student.school', 'teacher', 'teacher.school', 'institution')->latest()->get();

        return response()->json($selectedData);
    }
}
