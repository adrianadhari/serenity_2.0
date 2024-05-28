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
        Schema::create('participants', function (Blueprint $table) {
            $table->id();
            $table->string('kode_peserta')->unique();
            $table->string('nama_peserta');
            $table->string('tipe_peserta');
            $table->string('email');
            $table->string('telp');
            $table->string('jabatan');
            $table->string('pendidikan');
            $table->string('jenis_kelamin');
            $table->foreignId('institution_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};
