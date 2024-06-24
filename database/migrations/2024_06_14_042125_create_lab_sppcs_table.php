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
        Schema::create('lab_sppcs', function (Blueprint $table) {
            $table->id();
            $table->string('kode');
            $table->string('jenis_sampel');
            $table->string('unit_kemasan');
            $table->integer('jumlah_sampel');
            $table->string('parameter_uji');
            $table->string('metode_pengujian');
            $table->integer('no_analisis');
            $table->date('tgl_penerimaan');
            $table->date('tgl_selesai_pengujian');
            $table->foreignId('lab_pra_analisa_id')->constrained('lab_pra_analisas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_sppcs');
    }
};
