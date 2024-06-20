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
        Schema::create('alats', function (Blueprint $table) {
            $table->id();
            $table->string('kode_alat')->unique();
            $table->string('kategori_alat');
            $table->string('nama_alat');
            $table->string('merk');
            $table->bigInteger('nomor_serial');
            $table->text('deskripsi_alat');
            $table->string('status_bmn');
            $table->string('kode_bmn')->nullable()->unique();
            $table->string('sumber_dana');
            $table->string('tahun_perolehan');
            $table->string('harga_perolehan');
            $table->date('kalibrasi_terakhir');
            $table->date('service_terakhir');
            $table->text('keterangan_service_terakhir');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alats');
    }
};
