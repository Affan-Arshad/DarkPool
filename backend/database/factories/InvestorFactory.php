<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class InvestorFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        $name = $this->faker->name();
        return [
            'name' => $name,
            'account_no' => $this->faker->unique()->numberBetween(7700000000000, 7790009999999),
            'account_name' => $name,
        ];
    }
}
