<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\InstitusiController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\LabAgendaController;
use App\Http\Controllers\LabPegawaiController;
use App\Http\Controllers\LabPelangganController;
use App\Http\Controllers\LabPraAnalisaController;
use App\Http\Controllers\LabSppcController;
use App\Http\Controllers\LabTenderController;
use App\Http\Controllers\MagangController;
use App\Http\Controllers\PartnershipController;
use App\Http\Controllers\PesertaController;
use App\Http\Controllers\PesertaKegiatanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublikasiController;
use App\Http\Controllers\ResearchController;
use App\Http\Controllers\SekolahController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\TrainingController;
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

        Route::resource('/institusi', InstitusiController::class)->except([
            'show', 'destroy'
        ]);
        Route::prefix('institusi')->name('institusi.')->group(function () {
            Route::post('/multiple-delete', [InstitusiController::class, 'multipleDelete'])->name('multipleDelete');
            Route::post('/import', [InstitusiController::class, 'import'])->name('import');
            Route::get('/export', [InstitusiController::class, 'export'])->name('export');
            Route::get('/download-template', [InstitusiController::class, 'downloadTemplate'])->name('downloadTemplate');
        });

        Route::resource('/siswa', SiswaController::class)->except([
            'show', 'destroy'
        ]);
        Route::prefix('siswa')->name('siswa.')->group(function () {
            Route::post('/multiple-delete', [SiswaController::class, 'multipleDelete'])->name('multipleDelete');
            Route::post('/import', [SiswaController::class, 'import'])->name('import');
            Route::get('/export', [SiswaController::class, 'export'])->name('export');
            Route::get('/download-template', [SiswaController::class, 'downloadTemplate'])->name('downloadTemplate');
        });

        Route::resource('/magang', MagangController::class)->except([
            'show', 'destroy'
        ]);
        Route::post('/magang/multiple-delete', [MagangController::class, 'multipleDelete'])->name('magang.multipleDelete');

        Route::resource('/guru', GuruController::class)->except([
            'show', 'destroy'
        ]);
        Route::prefix('guru')->name('guru.')->group(function () {
            Route::post('/multiple-delete', [GuruController::class, 'multipleDelete'])->name('multipleDelete');
            Route::post('/import', [GuruController::class, 'import'])->name('import');
            Route::get('/export', [GuruController::class, 'export'])->name('export');
            Route::get('/download-template', [GuruController::class, 'downloadTemplate'])->name('downloadTemplate');
        });

        Route::resource('/peserta', PesertaController::class)->except([
            'show', 'destroy'
        ]);
        Route::prefix('peserta')->name('peserta.')->group(function () {
            Route::post('/multiple-delete', [PesertaController::class, 'multipleDelete'])->name('multipleDelete');
        });

        Route::resource('/publikasi', PublikasiController::class)->except([
            'show', 'destroy'
        ]);
        Route::post('/publikasi/multiple-delete', [PublikasiController::class, 'multipleDelete'])->name('publikasi.multipleDelete');
    });

    Route::middleware('admin')->group(function () {
        Route::resource('/kegiatan', KegiatanController::class)->except(['destroy']);
        Route::name('kegiatan.')->group(function () {
            Route::post('kegiatan/multiple-delete', [KegiatanController::class, 'multipleDelete'])->name('multipleDelete');
            Route::get('/kegiatan-aktif', [KegiatanController::class, 'kegiatanAktif'])->name('aktif');
        });

        Route::prefix('kegiatan')->name('kegiatan.peserta.')->group(function () {
            Route::get('/{id}/daftar', [PesertaKegiatanController::class, 'index'])->name('index');
            Route::post('/daftar', [PesertaKegiatanController::class, 'create'])->name('create');
            Route::post('/peserta/multiple-delete', [PesertaKegiatanController::class, 'multipleDelete'])->name('multipleDelete');
            Route::post('/peserta/update-score', [PesertaKegiatanController::class, 'updateScore'])->name('updateScore');
        });

        Route::resource('/penelitian', ResearchController::class)->except([
            'show', 'destroy'
        ]);
        Route::prefix('penelitian')->name('penelitian.')->group(function () {
            Route::post('/multiple-delete', [ResearchController::class, 'multipleDelete'])->name('multipleDelete');
        });

        Route::resource('/kemitraan', PartnershipController::class)->except([
            'show', 'destroy'
        ]);
        Route::prefix('kemitraan')->name('kemitraan.')->group(function () {
            Route::post('/multiple-delete', [PartnershipController::class, 'multipleDelete'])->name('multipleDelete');
        });

        Route::prefix('lab')->name('lab.')->group(function () {
            Route::resource('/pelanggan', LabPelangganController::class)->except([
                'show', 'destroy'
            ]);
            Route::post('/pelanggan/multiple-delete', [LabPelangganController::class, 'multipleDelete'])->name('pelanggan.multipleDelete');

            Route::resource('/pegawai', LabPegawaiController::class)->except([
                'show', 'destroy'
            ]);
            Route::post('/pegawai/multiple-delete', [LabPegawaiController::class, 'multipleDelete'])->name('pegawai.multipleDelete');

            Route::resource('/pra-analisa', LabPraAnalisaController::class)->except(['destroy']);
            Route::prefix('pra-analisa')->name('pra-analisa.')->group(function () {
                Route::post('/multiple-delete', [LabPraAnalisaController::class, 'multipleDelete'])->name('multipleDelete');
                Route::post('/{id}/update-no-surat', [LabPraAnalisaController::class, 'updateNoSurat'])->name('updateNoSurat');

                Route::prefix('{id}/lab-tender')->name('lab-tender.')->group(function () {
                    Route::get('/store', [LabTenderController::class, 'create'])->name('create');
                    Route::post('/store', [LabTenderController::class, 'store'])->name('store');
                    Route::post('/multiple-delete', [LabTenderController::class, 'multipleDelete'])->name('multipleDelete');
                });

                Route::prefix('{id}/lab-sppc')->name('lab-sppc.')->group(function () {
                    Route::get('/store', [LabSppcController::class, 'create'])->name('create');
                    Route::post('/store', [LabSppcController::class, 'store'])->name('store');
                    Route::post('/multiple-delete', [LabSppcController::class, 'multipleDelete'])->name('multipleDelete');
                });

                Route::prefix('{id}/lab-agenda')->name('lab-agenda.')->group(function () {
                    Route::get('/store', [LabAgendaController::class, 'create'])->name('create');
                    Route::post('/store', [LabAgendaController::class, 'store'])->name('store');
                    Route::post('/multiple-delete', [LabAgendaController::class, 'multipleDelete'])->name('multipleDelete');
                });
            });
        });

        Route::resource('/pelatihan', TrainingController::class)->except([
            'show', 'destroy'
        ]);
        Route::prefix('pelatihan')->name('pelatihan.')->group(function () {
            Route::post('/multiple-delete', [TrainingController::class, 'multipleDelete'])->name('multipleDelete');
        });

        Route::resource('/pegawai', EmployeeController::class)->except(['destroy']);
        Route::prefix('pegawai')->name('pegawai.')->group(function () {
            Route::post('/multiple-delete', [EmployeeController::class, 'multipleDelete'])->name('multipleDelete');
        });
    });
});

Route::prefix('api')->group(function () {
    Route::get('/get-sekolah', [PesertaKegiatanController::class, 'getSekolah']);
    Route::get('/get-peserta', [PesertaKegiatanController::class, 'getPeserta']);
    Route::get('/jumlah-peserta', [PesertaKegiatanController::class, 'jumlahPeserta']);
});

require __DIR__ . '/auth.php';
