<?php

namespace App\Http\Controllers;

use App\Models\Institution;
use App\Models\Kegiatan;
use App\Models\PesertaKegiatan;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;

class PesertaKegiatanController extends Controller
{
    protected $tipePesertaKegiatan;

    public function __construct()
    {
        $this->tipePesertaKegiatan = Config::get('constantsdata.tipe_peserta_kegiatan');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $activities = Kegiatan::where('status', 'Rencana')->orderBy('jadwal_mulai', 'desc')->get();
        return Inertia::render('Kegiatan/Peserta/Index', [
            'activities' => $activities
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function detail(string $id)
    {
        $activity = Kegiatan::where('kode', $id)->first();
        return Inertia::render('Kegiatan/Peserta/Detail', [
            'activity' => $activity,
            'tipe' => $this->tipePesertaKegiatan
        ]);
    }

    public function daftar(Request $request)
    {
        $request->validate([
            'activityId' => 'required|exists:kegiatans,id',
        ]);

        PesertaKegiatan::create([
            'kegiatan_id' => $request->activityId,
            'teacher_id' => $request->type == 'Guru' ? $request->peserta['id'] : null,
            'student_id' => $request->type == 'Siswa' ? $request->peserta['id'] : null,
            'institution_id' => $request->type == 'Institusi' ? $request->sekolah['id'] : null
        ]);

        return redirect()->route('kegiatan.aktif')->with('message', 'Daftar ke kegiatan berhasil!');
    }

    public function getSekolah(Request $request)
    {
        if ($request->type == 'Institusi') {
            $datas = Institution::orderBy('nama', 'asc')->get();
        } else {
            $datas = School::orderBy('nama_sekolah', 'asc')->get();
        }

        return response()->json($datas);
    }

    public function getPeserta(Request $request)
    {
        $sekolah = School::find($request->id);

        if ($request->type == 'Siswa') {
            $peserta = $sekolah->students;
        } else if ($request->type == 'Guru') {
            $peserta = $sekolah->teachers;
        }

        return response()->json($peserta);
    }

    public function jumlahPeserta(Request $request)
    {
        $jumlah = PesertaKegiatan::where('kegiatan_id', $request->id)->count();
        return response()->json($jumlah);
    }
}
