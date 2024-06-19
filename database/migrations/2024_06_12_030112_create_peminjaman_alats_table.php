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
        Schema::create('peminjaman_alats', function (Blueprint $table) {
            $table->id();
            $table->string('kode_peminjaman')->unique();
            $table->string('tujuan_peminjaman');
            $table->date('tanggal_peminjaman');
            $table->date('tanggal_pengembalian')->nullable();
            $table->date('estimasi_tanggal_pengembalian');
            $table->integer('jumlah');
            $table->string('keterangan');
            $table->string('status_tarif');
            $table->string('status_peminjaman');
            $table->bigInteger('jumlah_invoice');
            $table->string('surat_masuk')->nullable();;
            $table->string('surat_balasan')->nullable();;
            $table->string('invoice_pelunasan')->nullable();;
            $table->string('bukti_pembayaran')->nullable();;
            $table->string('kontrak_peminjaman_alat')->nullable();;
            $table->string('form_serah_terima_alat')->nullable();;
            $table->foreignId('alat_id');
            $table->foreignId('lab_pelanggan_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peminjaman_alats');
    }
};
