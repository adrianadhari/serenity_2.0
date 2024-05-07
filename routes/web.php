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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/sekolah', SekolahController::class);
    Route::post('/sekolah/import', [SekolahController::class, 'import'])->name('sekolah.import');
    Route::get('/sekolah/export', [SekolahController::class, 'export'])->name('sekolah.export');

    Route::resource('/institusi', InstitusiController::class);
    Route::resource('/siswa', SiswaController::class);
    Route::resource('/magang', MagangController::class);
    Route::resource('/guru', GuruController::class);
    Route::resource('/peserta', PesertaController::class);
    Route::resource('/publikasi', PublikasiController::class);
});

require __DIR__ . '/auth.php';
