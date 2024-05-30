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
        Schema::create('research', function (Blueprint $table) {
            $table->id();
            $table->string('kode_penelitian')->unique();
            $table->string('judul_penelitian');
            $table->string('kategori_penelitian');
            $table->string('jenis_flagship');
            $table->string('area_penelitian');
            $table->string('subjek_penelitian');
            $table->string('nama_area_flagship');
            $table->string('lokasi_penelitian');
            $table->string('nama_penyelia');
            $table->string('jenis_hibah');
            $table->string('besaran_hibah');
            $table->string('nama_funding');
            $table->string('nama_peneliti');
            $table->string('sub_area_penelitian');
            $table->string('author');
            $table->string('bulan_dipublikasi');
            $table->string('doi');
            $table->string('status_penelitian');
            $table->foreignId('institution_id');
            $table->foreignId('publication_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('research');
    }
};
