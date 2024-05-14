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
        $students = Student::with('school')->get();
        return Inertia::render('Siswa/Index', [
            'students' => $students
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $schools = School::all();

        return Inertia::render('Siswa/Create', [
            'gender' => $this->gender,
            'schools' => $schools
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StudentRequest $request): RedirectResponse
    {
        $student = $request->all();

        $student['kode_siswa'] = 'ST' . time();
        $student['school_id'] = $student['school_id']['id'];

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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
