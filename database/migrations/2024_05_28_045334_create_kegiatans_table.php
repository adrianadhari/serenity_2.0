<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kegiatans', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->unique();
            $table->string('jenis_kegiatan');
            $table->integer('semester');
            $table->string('judul_kegiatan')->unique();
            $table->string('jenis_flagship');
            $table->dateTime('jadwal_mulai');
            $table->dateTime('jadwal_selesai');
            $table->string('lokasi');
            $table->string('link');
            $table->string('moda');
            $table->text('tentang');
            $table->string('narasumber');
            $table->text('materi');
            $table->string('sertifikat')->nullable();
            $table->string('status');
            $table->integer('target_peserta');
            $table->integer('min_score');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kegiatans');
    }
};
