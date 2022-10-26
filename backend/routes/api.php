<?php

use App\Http\Controllers\API\InvestmentController;
use App\Http\Controllers\API\InvestorController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\CostController;
use App\Models\Investor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Investors
Route::get("/investors", [InvestorController::class, "index"]);
Route::get("/investors/{investor}", [InvestorController::class, "show"]);
Route::post("/investors", [InvestorController::class, "store"]);
Route::put("/investors/{investor}", [InvestorController::class, "update"]);
Route::delete("/investors/{investor}", [InvestorController::class, "destroy"]);

// Investments
Route::get("/investments", [InvestmentController::class, "index"]);
Route::get("/investments/{investment}", [InvestmentController::class, "show"]);
Route::post("/investments", [InvestmentController::class, "store"]);
Route::put("/investments/{investment}", [InvestmentController::class, "update"]);
Route::delete("/investments/{investment}", [InvestmentController::class, "destroy"]);

// Projects
Route::get("/projects", [ProjectController::class, "index"]);
Route::get("/projects/{project}", [ProjectController::class, "show"]);
Route::post("/projects", [ProjectController::class, "store"]);
Route::put("/projects/{project}", [ProjectController::class, "update"]);
Route::delete("/projects/{project}", [ProjectController::class, "destroy"]);

// ProjectCost
Route::get("/projects/{project}/costs", [CostController::class, "index"]);
Route::get("/projects/{project}/costs/{cost}", [CostController::class, "show"]);
Route::post("/projects/{project}/costs", [CostController::class, "store"]);
Route::put("/projects/{project}/costs/{cost}", [CostController::class, "update"]);
Route::delete("/projects/{project}/costs/{cost}", [CostController::class, "destroy"]);

// dev
Route::get("/balances", function () {
    $totalBalance = PoolHelper::totalBalance();
    $activeProjectCosts = PoolHelper::activeProjectCosts();
    $availableBalance = $totalBalance - $activeProjectCosts;
    $balanceByInvestor = PoolHelper::availableBalanceByInvestor();
    $runningCostsByInvestor = PoolHelper::runningCostsByInvestor();
    $totalInvestors = Investor::all()->count();

    return [
        "totalBalance" => $totalBalance,
        "activeProjectCosts" => $activeProjectCosts,
        "availableBalance" => $availableBalance,
        "balanceByInvestor" => $balanceByInvestor,
        "runningCostsByInvestor" => $runningCostsByInvestor,
        "totalInvestors" => $totalInvestors,
    ];
});
