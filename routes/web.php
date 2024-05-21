<?php

use App\Http\Controllers\GuruController;
use App\Http\Controllers\InstitusiController;
use App\Http\Controllers\MagangController;
use App\Http\Controllers\PesertaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublikasiController;
use App\Http\Controllers\SekolahController;
use App\Http\Controllers\SiswaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('adminOrUnit')->group(function () {
        Route::resource('/sekolah', SekolahController::class)->except([
            'show', 'destroy'
        ]);
        Route::prefix('sekolah')->name('sekolah.')->group(function () {
            Route::post('/multiple-delete', [SekolahController::class, 'multipleDelete'])->name('multipleDelete');
            Route::post('/import', [SekolahController::class, 'import'])->name('import');
            Route::get('/export', [SekolahController::class, 'export'])->name('export');
            Route::get('/download-template', [SekolahController::class, 'downloadTemplate'])->name('downloadTemplate');
        });

        Route::resource('/institusi', InstitusiController::class);
        Route::post('/institusi/multiple-delete', [InstitusiController::class, 'multipleDelete'])->name('institusi.multipleDelete');

        Route::resource('/siswa', SiswaController::class);
        Route::post('/siswa/multiple-delete', [SiswaController::class, 'multipleDelete'])->name('siswa.multipleDelete');

        Route::resource('/magang', MagangController::class);

        Route::resource('/guru', GuruController::class);
        Route::post('/guru/multiple-delete', [GuruController::class, 'multipleDelete'])->name('guru.multipleDelete');

        Route::resource('/peserta', PesertaController::class);
        Route::resource('/publikasi', PublikasiController::class);
    });
});

require __DIR__ . '/auth.php';
