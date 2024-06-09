<?php

namespace App\Http\Controllers;

use App\Http\Requests\KegiatanRequest;
use App\Http\Requests\KegiatanUpdateRequest;
use App\Models\Kegiatan;
use App\Models\PesertaKegiatan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class KegiatanController extends Controller
{
    protected $jenis_kegiatan;
    protected $semester;
    protected $flagship;
    protected $moda;
    protected $status_kegiatan;

    public function __construct()
    {
        $this->jenis_kegiatan = Config::get('constantsdata.jenis_kegiatan');
        $this->semester = Config::get('constantsdata.semester');
        $this->flagship = Config::get('constantsdata.flagship');
        $this->moda = Config::get('constantsdata.moda');
        $this->status_kegiatan = Config::get('constantsdata.status_kegiatan');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $activities = Kegiatan::latest()->get();
        return Inertia::render('Kegiatan/Index', [
            'activities' => $activities
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Kegiatan/Create', [
            'jenis_kegiatan' => $this->jenis_kegiatan,
            'semester' => $this->semester,
            'flagship' => $this->flagship,
            'moda' => $this->moda,
            'status_kegiatan' => $this->status_kegiatan
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(KegiatanRequest $request): RedirectResponse
    {
        $kegiatan = $request->all();
        $slug = Str::of($kegiatan['judul_kegiatan'])->slug('-');

        $img = $request->file('sertifikat');
        if ($img) {
            $fileName = 'sertifikat-kegiatan-' . $slug . '.' . $img->extension();
            $img->storeAs('public/sertifikat-kegiatan', $fileName);
            $kegiatan['sertifikat'] = $fileName;
        }

        Kegiatan::create($kegiatan);
        return redirect()->route('kegiatan.index')->with('message', 'Kegiatan Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show($id): Response
    {
        $activity = Kegiatan::where('kode', $id)->first();

        if (!$activity) {
            abort(404);
        }

        $kegiatan_id = Kegiatan::where('kode', $id)->pluck('id')->first();
        $participants = PesertaKegiatan::where('kegiatan_id', $kegiatan_id)->with('student', 'student.school', 'teacher', 'teacher.school', 'institution')->latest()->get();

        return Inertia::render('Kegiatan/Show', [
            'participants' => $participants,
            'activity' => $activity,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $kegiatanDetail = Kegiatan::where('kode', $id)->first();
        return Inertia::render('Kegiatan/Edit', [
            'jenis_kegiatan' => $this->jenis_kegiatan,
            'semester' => $this->semester,
            'flagship' => $this->flagship,
            'moda' => $this->moda,
            'status_kegiatan' => $this->status_kegiatan,
            'kegiatanDetail' => $kegiatanDetail
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(KegiatanUpdateRequest $request, $kode): RedirectResponse
    {
        $activity = Kegiatan::where('kode', $kode)->firstOrFail();
        $slug = Str::of($activity->judul_kegiatan)->slug('-');

        $img = $request->file('sertifikat');
        $fileName = $activity->sertifikat;
        if ($img) {
            Storage::delete('public/sertifikat-kegiatan/' . $fileName);
            $fileName = 'sertifikat-kegiatan-' . $slug . '.' . $img->extension();
            $img->storeAs('public/sertifikat-kegiatan', $fileName);
        }

        $dataToUpdate = $request->all();
        $dataToUpdate['sertifikat'] = $fileName;

        $activity->update($dataToUpdate);
        return redirect()->route('kegiatan.index')->with('message', 'Kegiatan Berhasil Diperbarui!');
    }

    public function multipleDelete(Request $request): RedirectResponse
    {
        $items = $request->input('items');
        if (is_array($items) && count($items) > 0) {
            foreach ($items as $item) {
                $kegiatan = Kegiatan::where('kode', $item['kode'])->first();
                if ($kegiatan && $kegiatan->sertifikat == $item['sertifikat']) {
                    Storage::delete('public/sertifikat-kegiatan/' . $item['sertifikat']);
                    $kegiatan->delete();
                }
            }
            return redirect()->route('kegiatan.index');
        }
        return redirect()->route('kegiatan.index');
    }

    public function kegiatanAktif(): Response
    {
        $activities = Kegiatan::where('status', 'Rencana')->orderBy('jadwal_mulai', 'desc')->get();
        return Inertia::render('Kegiatan/KegiatanAktif', [
            'activities' => $activities
        ]);
    }
}
