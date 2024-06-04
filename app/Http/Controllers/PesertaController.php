<?php

namespace App\Http\Controllers;

use App\Exports\ParticipantExport;
use App\Exports\TemplateParticipantExport;
use App\Http\Requests\ParticipantRequest;
use App\Imports\ParticipantImport;
use App\Models\Institution;
use App\Models\Participant;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class PesertaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $tipe_peserta;
    protected $gender;
    protected $pendidikan;

    public function __construct()
    {
        $this->tipe_peserta = Config::get('constantsdata.tipe_peserta');
        $this->gender = Config::get('constantsdata.gender');
        $this->pendidikan = Config::get('constantsdata.pendidikan');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $participants = Participant::with('institution')->latest()->get();
        return Inertia::render('Peserta/Index', [
            'participants' => $participants
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $institusi = Institution::pluck('nama');

        return Inertia::render('Peserta/Create', [
            'tipe_peserta' => $this->tipe_peserta,
            'gender' => $this->gender,
            'pendidikan' => $this->pendidikan,
            'institusi' => $institusi,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ParticipantRequest $request): RedirectResponse
    {
        $institution_id = Institution::where('nama', $request->institusi)->pluck('id')->first();

        $request['institution_id'] = $institution_id;

        $participant = $request->except('institusi');

        Participant::create($participant);
        return redirect()->route('peserta.index')->with('message', 'Peserta Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $participantDetail = Participant::where('kode_peserta', $id)->with('institution')->first();
        $institusi = Institution::pluck('nama');

        return Inertia::render('Peserta/Edit', [
            'tipe_peserta' => $this->tipe_peserta,
            'jenis_kelamin' => $this->gender,
            'pendidikan' => $this->pendidikan,
            'institusi' => $institusi,
            'participantDetail' => $participantDetail,
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(ParticipantRequest $request, string $id): RedirectResponse
    {
        $participant = Participant::where('kode_peserta', $id)->first();
        $institution_id = Institution::where(
            'nama',
            $request->institusi
        )->pluck('id')->first();

        $request['institution_id'] = $institution_id;

        $participant->update($request->except('nama'));
        return redirect()->route('peserta.index')->with('message', 'Peserta Berhasil Diperbarui!');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            Participant::whereIn('kode_peserta', $codes)->delete();
            return redirect()->route('peserta.index');
        }
        return redirect()->route('peserta.index');
    }
}
