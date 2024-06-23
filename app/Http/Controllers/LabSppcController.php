<?php

namespace App\Http\Controllers;

use App\Models\LabSppc;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LabSppcController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Laboratorium/PraAnalisa/CreateSppc');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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
            LabSppc::whereIn('id', $ids)->delete();
            return redirect()->back();
        }
        return redirect()->back();
    }
}
