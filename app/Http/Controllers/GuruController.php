<?php

namespace App\Http\Controllers;

use App\Exports\TeacherExport;
use App\Exports\TemplateTeacherExport;
use App\Http\Requests\TeacherRequest;
use App\Http\Requests\TeacherUpdateRequest;
use App\Imports\TeacherImport;
use App\Models\School;
use App\Models\Teacher;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class GuruController extends Controller
{
    protected $gender;
    protected $pendidikan;

    public function __construct()
    {
        $this->gender = Config::get('constantsdata.gender');
        $this->pendidikan = Config::get('constantsdata.pendidikan');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $teachers = Teacher::with('school')->latest()->get();
        return Inertia::render('Guru/Index', [
            'teachers' => $teachers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $schools_name = School::pluck('nama_sekolah');

        return Inertia::render('Guru/Create', [
            'gender' => $this->gender,
            'pendidikan' => $this->pendidikan,
            'schools_name' => $schools_name
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TeacherRequest $request): RedirectResponse
    {
        $school_id = School::where('nama_sekolah', $request->school_name)->pluck('id')->first();

        $request['school_id'] = $school_id;

        $student = $request->except('school_name');

        Teacher::create($student);
        return redirect()->route('guru.index')->with('message', 'Guru Berhasil Ditambahkan!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $teacherDetail = Teacher::where('kode', $id)->with('school')->first();
        $schools_name = School::pluck('nama_sekolah');

        return Inertia::render('Guru/Edit', [
            'gender' => $this->gender,
            'pendidikan' => $this->pendidikan,
            'teacherDetail' => $teacherDetail,
            'schools_name' => $schools_name
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TeacherUpdateRequest $request, string $id): RedirectResponse
    {
        $teacher = Teacher::where('kode', $id)->first();
        $school_id = School::where('nama_sekolah', $request->school_name)->pluck('id')->first();

        $request['school_id'] = $school_id;

        $teacher->update($request->except('school_name'));
        return redirect()->route('guru.index')->with('message', 'Guru Berhasil Diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            Teacher::whereIn('kode', $codes)->delete();
            return redirect()->route('guru.index');
        }
        return redirect()->route('guru.index');
    }

    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => ['required', 'mimes:csv,xls,xlsx']
        ]);

        $file = $request->file('file');
        $nama_file = $file->hashName();
        $file->storeAs('public/excel/', $nama_file);
        Excel::import(new TeacherImport(), storage_path('app/public/excel/' . $nama_file));
        Storage::delete('public/excel/' . $nama_file);

        return redirect()->back();
    }

    public function export()
    {
        return Excel::download(new TeacherExport(), 'teachers-' . Carbon::now()->format('Y-m-d') . '.xlsx');
    }

    public function downloadTemplate()
    {
        return Excel::download(new TemplateTeacherExport(), 'template-teachers.xlsx');
    }
}
