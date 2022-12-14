<?php

namespace Database\Seeders;

use App\Models\Investment;
use App\Models\Investor;
use App\Models\Project;
use App\Models\Cost;
use Faker\Factory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run() {
        Investor::factory(rand(100, 1000))->create()->each(function ($investor) {
            Investment::factory(rand(1, 4))->create([
                'investor_id' => $investor->id
            ]);
        });

        Project::factory(5)->create()
            ->each(function ($project) {
                for ($i = 0; $i < rand(1, 2); $i++) {
                    Cost::factory(1)->create([
                        'project_id' => $project->id
                    ]);
                }
            });
    }
}
