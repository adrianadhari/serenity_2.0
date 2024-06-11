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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('nama_peserta');
            $table->bigInteger('nik_peserta');
            $table->string('jabatan_saat_pelatihan');
            $table->string('unit_saat_pelatihan');
            $table->string('jabatan_saat_ini');
            $table->string('unit_saat_ini');
            $table->date('masa_berlaku_sertifikat');
            $table->date('masa_berakhir_sertifikat');
            $table->text('link_sertifikat');
            $table->foreignId('training_id')->constrained('trainings')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
