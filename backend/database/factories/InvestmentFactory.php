<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class InvestmentFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        return [
            'amount' => ceil($this->faker->numberBetween(100, 1000) / 100) * 100,
            'date' => $this->faker->dateTimeBetween('-12 months', 'now'),
            'type' => 'investment'
        ];
    }
}
