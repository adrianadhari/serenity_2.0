<?php

namespace App\Http\Controllers;

use App\Models\Institution;
use App\Models\Kegiatan;
use App\Models\PesertaKegiatan;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PesertaKegiatanController extends Controller
{
    protected $tipePesertaKegiatan;

    public function __construct()
    {
        $this->tipePesertaKegiatan = Config::get('constantsdata.tipe_peserta_kegiatan');
    }

    public function index(string $id)
    {
        $activity = Kegiatan::where('kode', $id)->first();
        return Inertia::render('Kegiatan/Daftar', [
            'activity' => $activity,
            'tipe' => $this->tipePesertaKegiatan
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'type' => ['required', Rule::in($this->tipePesertaKegiatan)],
            'activityId' => ['required', 'exists:kegiatans,id'],
        ]);

        PesertaKegiatan::create([
            'kegiatan_id' => $request->activityId,
            'teacher_id' => $request->type == 'Guru' ? $request->peserta['id'] : null,
            'student_id' => $request->type == 'Siswa' ? $request->peserta['id'] : null,
            'institution_id' => $request->type == 'Institusi' ? $request->sekolah['id'] : null
        ]);

        return redirect()->route('kegiatan.aktif')->with('message', 'Daftar ke kegiatan berhasil!');
    }

    public function updateScore(Request $request)
    {
        $peserta = PesertaKegiatan::find($request->id);
        $peserta->update(['score' => $request->score]);
        return redirect()->back();
    }

    public function multipleDelete(Request $request)
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            PesertaKegiatan::whereIn('kode', $codes)->delete();
            return redirect()->back();
        }
        return redirect()->back();
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
