<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest;
use App\Http\Requests\EmployeeUpdateRequest;
use App\Models\Employee;
use App\Models\Training;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $nama_pelatihan = Training::pluck('nama_pelatihan');
        return Inertia::render('Pegawai/Create', [
            'nama_pelatihan' => $nama_pelatihan
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeRequest $request): RedirectResponse
    {
        $training_id = Training::where('nama_pelatihan', $request->nama_pelatihan)->pluck('id')->first();

        $request['training_id'] = $training_id;

        $employee = $request->except('nama_pelatihan');

        Employee::create($employee);
        return redirect()->route('pelatihan.index')->with('message', 'Pegawai Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show($training)

    {
        $employees = Employee::where('training_id', $training)->with(['training'])->get();
        return Inertia::render('Pegawai/Index', [
            'employees' => $employees
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $employeeDetail = Employee::where('nik_peserta', $id)->first();

        return Inertia::render('Pegawai/Edit', [
            'employeeDetail' => $employeeDetail,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeUpdateRequest $request, $kode): RedirectResponse
    {
        $employee = Employee::where('nik_peserta', $kode)->firstOrFail();
        $training_id = $employee->training_id;

        $employee->update($request->all());
        return redirect()->route('pegawai.show', $training_id)->with('message', 'Peserta Berhasil Diperbarui!');
    }

    public function multipleDelete(Request $request): RedirectResponse
    {
        $codes = $request->input('codes');
        if (is_array($codes) && count($codes) > 0) {
            Employee::whereIn('nik_peserta', $codes)->delete();
            return redirect()->route('pelatihan.index');
        }
        return redirect()->route('pelatihan.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
