<?php

namespace Database\Factories;

use App\Http\Controllers\API\InvestmentController;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use PoolHelper;

class CostFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        $amount = ceil($this->faker->numberBetween(10000, 100000) / 10) * 10;
        $date = $this->faker->dateTimeBetween('-12 months', 'now');
        $availableBalance = PoolHelper::availableBalance();
        if ($amount > $availableBalance) {
            $missing_amount = $amount - $availableBalance;
            InvestmentController::makeCompanyInvestment($missing_amount, $date);
        }
        return [
            'amount' => $amount,
            'description' => $availableBalance . " / " . Project::where('status', 'WIP')->withSum('costs', 'amount')->get()->sum('costs_sum_amount'), //$this->faker->text(),
            'date' => $date,
            'investors_ratio' => PoolHelper::investorsRatio()
        ];
    }
}
