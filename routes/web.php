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


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/sekolah', [SekolahController::class, 'index'])->name('sekolah.index');
    Route::get('/sekolah/tambah', [SekolahController::class, 'create'])->name('sekolah.create');
    Route::post('/sekolah/tambah', [SekolahController::class, 'store'])->name('sekolah.store');
    Route::patch('/sekolah/edit', [SekolahController::class, 'update'])->name('sekolah.update');
    Route::delete('/sekolah', [SekolahController::class, 'destroy'])->name('sekolah.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/institusi', [InstitusiController::class, 'index'])->name('institusi.index');
    Route::get('/institusi/tambah', [InstitusiController::class, 'create'])->name('institusi.create');
    Route::post('/institusi/tambah', [InstitusiController::class, 'store'])->name('institusi.store');
    Route::patch('/institusi/edit', [InstitusiController::class, 'update'])->name('institusi.update');
    Route::delete('/institusi', [InstitusiController::class, 'destroy'])->name('institusi.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/siswa', [SiswaController::class, 'index'])->name('siswa.index');
    Route::get('/siswa/tambah', [SiswaController::class, 'create'])->name('siswa.create');
    Route::post('/siswa/tambah', [SiswaController::class, 'store'])->name('siswa.store');
    Route::patch('/siswa/edit', [SiswaController::class, 'update'])->name('siswa.update');
    Route::delete('/siswa', [SiswaController::class, 'destroy'])->name('siswa.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/magang', [MagangController::class, 'index'])->name('magang.index');
    Route::get('/magang/tambah', [MagangController::class, 'create'])->name('magang.create');
    Route::post('/magang/tambah', [MagangController::class, 'store'])->name('magang.store');
    Route::patch('/magang/edit', [MagangController::class, 'update'])->name('magang.update');
    Route::delete('/magang', [MagangController::class, 'destroy'])->name('magang.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/guru', [GuruController::class, 'index'])->name('guru.index');
    Route::get('/guru/tambah', [GuruController::class, 'create'])->name('guru.create');
    Route::post('/guru/tambah', [GuruController::class, 'store'])->name('guru.store');
    Route::patch('/guru/edit', [GuruController::class, 'update'])->name('guru.update');
    Route::delete('/guru', [GuruController::class, 'destroy'])->name('guru.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/peserta', [PesertaController::class, 'index'])->name('peserta.index');
    Route::get('/peserta/tambah', [PesertaController::class, 'create'])->name('peserta.create');
    Route::post('/peserta/tambah', [PesertaController::class, 'store'])->name('peserta.store');
    Route::patch('/peserta/edit', [PesertaController::class, 'update'])->name('peserta.update');
    Route::delete('/peserta', [PesertaController::class, 'destroy'])->name('peserta.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/publikasi', [PublikasiController::class, 'index'])->name('publikasi.index');
    Route::get('/publikasi/tambah', [PublikasiController::class, 'create'])->name('publikasi.create');
    Route::post('/publikasi/tambah', [PublikasiController::class, 'store'])->name('publikasi.store');
    Route::patch('/publikasi/edit', [PublikasiController::class, 'update'])->name('publikasi.update');
    Route::delete('/publikasi', [PublikasiController::class, 'destroy'])->name('publikasi.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
