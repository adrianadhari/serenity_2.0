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
        Schema::create('institution_partnership', function (Blueprint $table) {
            $table->foreignId('institution_id')->constrained('institutions')->onDelete('cascade');
            $table->foreignId('partnership_id')->constrained('partnerships')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('institution_partnership');
    }
};
