<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        $cost = ceil($this->faker->numberBetween(20000, 200000) / 1000) * 1000;
        $proposedPrice = $cost * rand(15, 30) / 10;
        $status = $this->faker->randomElement(['Ongoing']); //, 'completed']);
        // $pl = ($status == "completed" ? $proposedPrice - $cost : 0);
        return [
            'name' => $this->faker->name(),
            'client_name' => $this->faker->name(),
            'reference_no' => $this->faker->swiftBicNumber(),
            'start_date' => $this->faker->dateTimeBetween('-12 months', 'now'),
            'status' => $status,
            'estimated_cost' => $cost,
            'proposed_price' => $proposedPrice,
            'company_profit_percent' => 70,
            // 'realized_amount' => ($status == "completed" ? $proposedPrice : 0),
            // 'profit_loss' => $pl,
            // 'company_profit_loss' => $pl * 0.7,
            // 'shareable' => $pl - ($pl * 0.7),
        ];
    }
}
