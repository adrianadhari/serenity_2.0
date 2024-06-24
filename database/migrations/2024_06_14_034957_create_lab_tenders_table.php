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
        Schema::create('lab_tenders', function (Blueprint $table) {
            $table->id();
            $table->string('parameter_uji');
            $table->string('jenis_sampel');
            $table->string('metode');
            $table->string('peralatan');
            $table->boolean('personel');
            $table->boolean('bahan');
            $table->boolean('qc');
            $table->boolean('kondisi_akomodasi');
            $table->string('kesimpulan');
            $table->foreignId('lab_pra_analisa_id')->constrained('lab_pra_analisas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_tenders');
    }
};
