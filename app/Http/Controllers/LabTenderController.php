<?php

namespace App\Http\Controllers;

use App\Models\LabTender;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LabTenderController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Laboratorium/PraAnalisa/CreateTender');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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
    public function multipleDelete(Request $request)
    {
        $ids = $request->input('ids');
        if (is_array($ids) && count($ids) > 0) {
            LabTender::whereIn('id', $ids)->delete();
            return redirect()->back();
        }
        return redirect()->back();
    }
}
