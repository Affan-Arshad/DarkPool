<?php

use App\Models\Investment;
use App\Models\Investor;
use App\Models\Project;

class PoolHelper {

    public static function totalBalance() {
        return Investment::sum('amount');
    }

    public static function activeProjectCosts() {
        return Project::where('status', 'Ongoing')->withSum('costs', 'amount')->get()->sum('costs_sum_amount');
    }

    public static function availableBalance() {
        return PoolHelper::totalBalance() - PoolHelper::activeProjectCosts();
    }

    public static function investorsRatio() {
        $investorsRatio = [];

        $investors = Investor::withSum('investments', 'amount')->get();
        $investorAvailableBalance = PoolHelper::availableBalanceByInvestor();

        foreach ($investors as $investor) {
            if ($investorAvailableBalance[$investor->id] > 0) {
                $investorsRatio[$investor->id] = $investorAvailableBalance[$investor->id];
            }
        }

        return $investorsRatio;
    }


    public static function availableBalanceByInvestor() {
        $investorAvailableBalance = [];
        $investorRunningCosts = PoolHelper::runningCostsByInvestor();
        // TODO: calculate available balance for each investor
        // algorithm: get all projects that are status WIP

        $investors = Investor::withSum('investments', 'amount')->get();
        foreach ($investors as $investor) {
            $investorAvailableBalance[$investor->id] = $investor->investments_sum_amount;
            // subtract investorRunningCosts from investorBalance
            // * new investors might not be in the investorRunningCosts array.. leading to an error
            if (array_key_exists($investor->id, $investorRunningCosts)) {
                $investorAvailableBalance[$investor->id] = round($investorAvailableBalance[$investor->id] - $investorRunningCosts[$investor->id], 2);
            }
        }
        return $investorAvailableBalance;
    }

    public static function runningCostsByInvestor() {
        $investorRunningCosts = [];
        $wipProjects = Project::where('status', 'Ongoing')->with('costs')->get();
        // for each cost of each project: 
        foreach ($wipProjects as $project) {
            foreach ($project->costs as $runningCost) {
                // look into the investors_ratio json column
                // for each investor in the array
                $balanceAsOf = collect($runningCost->investors_ratio)->sum();
                foreach ($runningCost->investors_ratio as $investorId => $investorBalanceAsOf) {
                    // investorsCost = runningCost * (investorBalanceAsOf / $balanceAsOf)
                    // make a sum of this investorCost for each investor
                    // * maybe need to check for first entry for each investor
                    if (!array_key_exists($investorId, $investorRunningCosts)) $investorRunningCosts[$investorId] = 0;
                    $investorRunningCosts[$investorId] += round($runningCost->amount * ($investorBalanceAsOf / $balanceAsOf), 2);
                }
            }
        }
        return $investorRunningCosts;
    }
}
