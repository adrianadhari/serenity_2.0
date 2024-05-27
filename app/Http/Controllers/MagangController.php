<?php

namespace App\Http\Controllers;

use App\Http\Requests\InternshipRequest;
use App\Models\Internship;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MagangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $interns = Internship::with('student')->latest()->get();
        return Inertia::render('Magang/Index', [
            'interns' => $interns
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $students = Student::pluck('nis');
        return Inertia::render('Magang/Create', [
            'students' => $students
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(InternshipRequest $request): RedirectResponse
    {
        $student_id = Student::where('nis', $request->nis)->pluck('id')->first();

        $request['student_id'] = $student_id;

        $student = $request->except('nis');

        Internship::create($student);
        return redirect()->route('magang.index')->with('message', 'Magang Berhasil Ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $internDetail = Internship::where('kode', $id)->with('student')->first();
        $students = Student::pluck('nis');

        return Inertia::render('Magang/Edit', [
            'students' => $students,
            'internDetail' => $internDetail
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(InternshipRequest $request, string $id): RedirectResponse
    {
        $student = Internship::where('kode', $id)->first();
        $student_id = Student::where('nis', $request->nis)->pluck('id')->first();

        $request['student_id'] = $student_id;

        $student->update($request->except('nis'));
        return redirect()->route('magang.index')->with('message', 'Magang Berhasil Diperbarui!');
    }

    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            Internship::whereIn('kode', $codes)->delete();
            return redirect()->route('magang.index');
        }
        return redirect()->route('magang.index');
    }
}
