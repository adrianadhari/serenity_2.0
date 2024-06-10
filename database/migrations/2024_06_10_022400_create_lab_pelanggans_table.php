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
        Schema::create('lab_pelanggans', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->unique();
            $table->string('instansi');
            $table->string('nama_instansi');
            $table->string('nama_pelanggan');
            $table->text('alamat');
            $table->string('telp');
            $table->date('tgl_lahir');
            $table->string('jenis_kelamin');
            $table->string('email');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_pelanggans');
    }
};
