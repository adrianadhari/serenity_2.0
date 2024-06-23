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
        Schema::create('lab_pasca_analisas', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->unique();
            $table->date('tanggal_pasca_analisa');
            $table->string('invoice_pelunasan')->nullable();
            $table->string('bukti_pembayaran')->nullable();
            $table->string('lembar_hasil_uji')->nullable();
            $table->foreignId('lab_pra_analisa_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_pasca_analisas');
    }
};
