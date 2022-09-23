<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration {
    /**
     * Run the migrations.
     * 
     * @return void
     */
    public function up() {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('client_name');
            $table->string('reference_no');
            $table->date('start_date');
            $table->float('estimated_cost', 20);
            $table->float('proposed_price', 20);
            $table->float('company_profit_percent');
            $table->string('status');
            $table->date('completed_date')->nullable();
            $table->float('realized_amount', 20)->nullable();
            $table->float('profit_loss', 20)->nullable();
            $table->float('company_profit_loss', 20)->nullable();
            $table->float('shareable', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('projects');
    }
}
