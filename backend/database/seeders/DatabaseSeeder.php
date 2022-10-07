<?php

namespace Database\Seeders;

use App\Models\Investment;
use App\Models\Investor;
use App\Models\Project;
use App\Models\ProjectCost;
use Faker\Factory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run() {
        // \App\Models\User::factory(10)->create();

        // Investor::create([
        //     'name' => 'Company Account',
        //     'account_no' => '7770000022017',
        //     'account_name' => 'OAuthX Pvt Ltd',
        // ]);

        Investor::factory(5)->create()->each(function ($investor) {
            Investment::factory(rand(1, 4))->create([
                'investor_id' => $investor->id
            ]);
        });

        Project::factory(5)->create()
            ->each(function ($project) {
                ProjectCost::factory(rand(1, 4))->create([
                    'project_id' => $project->id
                ]);
            });
    }
}
