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
        Schema::create('lab_pra_analisas', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->unique();
            $table->string('tujuan_kegiatan');
            $table->string('pelayanan');
            $table->string('jenis_analisis');
            $table->string('status_tarif');
            $table->string('surat_masuk')->nullable();
            $table->string('surat_balasan')->nullable();
            $table->string('invoice_dp')->nullable();
            $table->string('bukti_bayar_dp')->nullable();
            $table->integer('jumlah_invoice')->nullable();
            $table->string('permintaan_tender')->nullable();
            $table->string('sppc')->nullable();
            $table->string('buku_agenda')->nullable();
            $table->string('contoh_uji')->nullable();
            $table->string('no_surat')->nullable()->unique();
            $table->foreignId('pelanggan_id')->constrained('lab_pelanggans')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_pra_analisas');
    }
};
