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
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('timeline_from')->nullable();
            $table->date('timeline_to')->nullable();
            $table->enum('priority', ['low', 'medium', 'high'])->nullable();
            $table->boolean('archive')->default(false);
            $table->longText('note')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
