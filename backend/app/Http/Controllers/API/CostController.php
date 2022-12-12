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
        if ($project->status == "Completed") {
            return response()->json(['message' => 'Cannot modify completed project'], 403);
        }

        // using a transaction to fail everything if any of the actions fail
        DB::transaction(function () use ($project, $request) {
            // if cost > availableBalance
            // make investment by company account the missing amount
            $availableBalance = PoolHelper::availableBalance();
            if ($request->amount > $availableBalance) {
                $missingAmount = $request->amount - $availableBalance;
                InvestmentController::makeCompanyInvestment($missingAmount, $request->date);
            }

            $investorsRatio = PoolHelper::investorsRatio();

            $data = array_merge($request->all(), ['project_id' => $project->id, 'investors_ratio' => $investorsRatio]);
            return Cost::create($data);
        });
    }

    public function update(Project $project, Request $request, $id) {
        if ($project->status == "Completed") {
            return response()->json(['message' => 'Cannot modify completed project'], 500);
        }
        return Cost::find($id)->update($request->all());
    }

    public function destroy(Project $project, Cost $cost) {
        return $cost->delete();
    }
}
