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
        Schema::create('partnerships', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->unique();
            $table->string('nomor')->unique();
            $table->string('kategori');
            $table->string('judul');
            $table->string('status');
            $table->date('tgl_awal');
            $table->date('tgl_akhir');
            $table->integer('notifikasi');
            $table->string('dok_kerjasama')->nullable();
            $table->string('dok_roadmap')->nullable();
            $table->string('nama_penandatangan');
            $table->string('jabatan_penandatangan');
            $table->text('ruang_lingkup');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partnerships');
    }
};
