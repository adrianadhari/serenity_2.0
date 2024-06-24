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
        Schema::create('lab_analisas', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->unique();
            $table->date('tanggal_analisa');
            $table->string('surat_perintah_kerja')->nullable();
            $table->string('logbook_hasil')->nullable();
            $table->string('jaminan_mutu')->nullable();
            $table->string('estimasi_ketidakpastian_pengukuran')->nullable();
            $table->foreignId('lab_pra_analisa_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_analisas');
    }
};
