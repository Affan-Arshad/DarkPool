<?php

use App\Models\Investor;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvestorsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('investors', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("account_no");
            $table->string("account_name");
            $table->timestamps();
        });

        Investor::create([
            'name' => 'Company Account',
            'account_no' => '7770000000001',
            'account_name' => 'OAuthX Pvt Ltd',
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('investors');
    }
}
