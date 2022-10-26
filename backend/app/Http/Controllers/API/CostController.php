<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Cost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PoolHelper;

class CostController extends Controller {

    public function index(Project $project) {
        return $project->costs;
    }

    public function show(Project $project, $id) {
        return $project->costs()->findOrFail($id);
    }

    public function store(Project $project, Request $request) {
        // TODO: shouldn't accept cost for completed projects

        // using a transaction to fail everything if any of the actions fail
        DB::transaction(function () use ($project, $request) {
            // if cost > availableBalance
            // make investment by company account the missing amount
            $availableBalance = PoolHelper::availableBalance();
            if ($request->amount > $availableBalance) {
                $missing_amount = $request->amount - $availableBalance;
                InvestmentController::makeCompanyInvestment($missing_amount, $request->date);
            }

            $investorsRatio = PoolHelper::investorsRatio();

            $cost = Cost::create(array_merge($request->all(), ['project_id' => $project->id, 'investors_ratio' => $investorsRatio]));

            return $cost;
        });
    }

    public function update(Project $project, Request $request, $id) {
        return Cost::find($id)->update($request->all());
    }

    public function destroy(Project $project, Cost $cost) {
        return $cost->delete();
    }
}
