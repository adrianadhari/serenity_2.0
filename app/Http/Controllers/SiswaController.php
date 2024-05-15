<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequest;
use App\Models\School;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SiswaController extends Controller
{
    private $gender = ['Pria', 'Wanita'];

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $students = Student::with('school')->latest()->get();
        return Inertia::render('Siswa/Index', [
            'students' => $students
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $schools_name = School::pluck('nama_sekolah');

        return Inertia::render('Siswa/Create', [
            'gender' => $this->gender,
            'schools_name' => $schools_name
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StudentRequest $request): RedirectResponse
    {
        $school_id = School::where('nama_sekolah', $request->school_name)->pluck('id')->first();

        $request['kode_siswa'] = 'ST' . time();
        $request['school_id'] = $school_id;

        $student = $request->except('school_name');

        Student::create($student);
        return redirect()->route('siswa.index')->with('message', 'Siswa Berhasil Ditambahkan!');
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
        $studentDetail = Student::where('kode_siswa', $id)->with('school')->first();
        $schools_name = School::pluck('nama_sekolah');

        return Inertia::render('Siswa/Edit', [
            'gender' => $this->gender,
            'studentDetail' => $studentDetail,
            'schools_name' => $schools_name
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StudentRequest $request, string $id): RedirectResponse
    {
        $student = Student::where('kode_siswa', $id)->first();
        $school_id = School::where('nama_sekolah', $request->school_name)->pluck('id')->first();

        $request['school_id'] = $school_id;

        $student->update($request->except('school_name'));
        return redirect()->route('siswa.index')->with('message', 'Siswa Berhasil Diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $student = Student::where('kode_siswa', $id)->first();
        $student->delete();
        return back();
    }
}
