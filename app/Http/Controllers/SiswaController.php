<?php

namespace App\Http\Controllers;

use App\Exports\StudentExport;
use App\Exports\TemplateStudentExport;
use App\Http\Requests\StudentRequest;
use App\Http\Requests\StudentUpdateRequest;
use App\Imports\StudentImport;
use App\Models\School;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class SiswaController extends Controller
{
    protected $gender;

    public function __construct()
    {
        $this->gender = Config::get('constantsdata.gender');
    }

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

        $request['school_id'] = $school_id;

        $student = $request->except('school_name');

        Student::create($student);
        return redirect()->route('siswa.index')->with('message', 'Siswa Berhasil Ditambahkan!');
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
    public function update(StudentUpdateRequest $request, $kode): RedirectResponse
    {
        $student = Student::where('kode_siswa', $kode)->firstOrFail();
        $school_id = School::where('nama_sekolah', $request->school_name)->pluck('id')->first();

        $request['school_id'] = $school_id;

        $student->update($request->except('school_name'));
        return redirect()->route('siswa.index')->with('message', 'Siswa Berhasil Diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            Student::whereIn('kode_siswa', $codes)->delete();
            return redirect()->route('siswa.index');
        }
        return redirect()->route('siswa.index');
    }

    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => ['required', 'mimes:csv,xls,xlsx']
        ]);

        $file = $request->file('file');
        Excel::import(new StudentImport, $file);

        return redirect()->back();
    }

    public function export()
    {
        return Excel::download(new StudentExport, 'students-' . Carbon::now()->format('d-m-Y') . '.xlsx');
    }

    public function downloadTemplate()
    {
        return Excel::download(new TemplateStudentExport, 'template-students.xlsx');
    }
}
