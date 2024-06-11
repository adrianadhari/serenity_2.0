<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainingRequest;
use App\Models\Training;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrainingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trainings = Training::latest()->withCount('employee')->get();
        return Inertia::render('Pelatihan/Index', [
            'trainings' => $trainings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Pelatihan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TrainingRequest $request): RedirectResponse
    {
        $training = $request->all();

        Training::create($training);
        return redirect()->route('pelatihan.index')->with('message', 'Pelatihan Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Training $training)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $trainingDetail = Training::where('kode_pelatihan', $id)->first();

        return Inertia::render('Pelatihan/Edit', [
            'trainingDetail' => $trainingDetail,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TrainingRequest $request, $kode): RedirectResponse
    {
        $training = Training::where('kode_pelatihan', $kode)->firstOrFail();

        $training->update($request->all());
        return redirect()->route('pelatihan.index')->with('message', 'Pelatihan Berhasil Diperbarui!');
    }

    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            Training::whereIn('kode_pelatihan', $codes)->delete();
            return redirect()->route('pelatihan.index');
        }
        return redirect()->route('pelatihan.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Training $training)
    {
        //
    }
}
