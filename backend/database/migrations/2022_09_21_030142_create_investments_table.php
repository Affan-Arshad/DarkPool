<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvestmentsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('investments', function (Blueprint $table) {
            $table->id();
            $table->float("amount");
            $table->date("date");
            $table->string("type");

            $table->foreignId('investor_id')->constrained();
            $table->foreignId('project_id')->nullable()->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('investments');
    }
}
