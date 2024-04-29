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
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->string('kode_sekolah')->unique();
            $table->string('nama_sekolah')->unique();
            $table->string('kategori_sekolah');
            $table->string('jenis_sekolah');
            $table->string('tipe_sekolah');
            $table->string('provinsi');
            $table->string('kota');
            $table->text('alamat_sekolah');
            $table->string('nama_kontak');
            $table->string('telp');
            $table->string('email');
            $table->date('tgl_registrasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schools');
    }
};
