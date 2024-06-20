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
        Schema::create('lab_agendas', function (Blueprint $table) {
            $table->id();
            $table->date('tgl_terima_sampel');
            $table->integer('jumlah_sampel');
            $table->integer('kode_lab');
            $table->string('nama_koresponden');
            $table->string('jenis_sampel');
            $table->time('jam_pengambilan_sampel');
            $table->boolean('hemolis');
            $table->boolean('lipemik');
            $table->boolean('ikterus');
            $table->integer('volume');
            $table->boolean('cair');
            $table->boolean('dingin');
            $table->integer('no_box');
            $table->boolean('cup_asam');
            $table->boolean('cup_gelap');
            $table->string('f80');
            $table->string('f20');
            $table->text('keterangan');
            $table->foreignId('lab_pra_analisa_id')->constrained('lab_pra_analisas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_agendas');
    }
};
