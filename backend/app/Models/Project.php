<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class Project extends Model {
    use HasFactory;

    protected $guarded = ['profit_loss', 'company_profit_loss', 'shareable'];

    public function costs(): HasMany {
        return $this->hasMany(Cost::class);
    }

    protected static function boot() {
        parent::boot();


        static::saving(function ($project) {
            DB::beginTransaction();

            // profit_loss, company_profit_loss or shareable is already set
            // deny saving
            if (
                $project->profit_loss !== null ||
                $project->company_profit_loss !== null ||
                $project->shareable !== null
            ) {

                return false;
            } // maybe set a message for the user

            // if status is anything but completed ignore and let it save
            if ($project->status != 'Completed') return DB::commit();

            // if completed and fields not yet set, set fields
            Validator::make(request()->all(), [
                'realized_amount' => 'required',
                'completed_date' => 'required'
            ]);

            $projectAllCosts = $project->costs->sum('amount');
            $project->profit_loss = $project->realized_amount - $projectAllCosts;
            $project->company_profit_loss = $project->profit_loss * $project->company_profit_percent / 100;

            // prevent investors from sharing loss -> company takes all loss
            $project->company_profit_loss = ($project->profit_loss < 0) ? $project->profit_loss : $project->company_profit_loss;

            $project->shareable = $project->profit_loss - $project->company_profit_loss;

            // make deposits to each investor
            $investorContributionsForProject = [];
            foreach ($project->costs as $cost) {
                $balanceAsOf = collect($cost->investors_ratio)->sum();
                foreach ($cost->investors_ratio as $investorId => $investorBalanceAsOf) {
                    if (!array_key_exists($investorId, $investorContributionsForProject)) $investorContributionsForProject[$investorId] = 0;
                    $investorContributionsForProject[$investorId] += round($cost->amount * ($investorBalanceAsOf / $balanceAsOf), 2);
                }
            }

            // fix decimal inaccuracies
            // adjust last entry based on other entries
            $sumOfEntriesExceptLast = collect($investorContributionsForProject)->sum() - end($investorContributionsForProject);
            // set last entry to what remains to make exact cost
            $investorContributionsForProject[array_key_last($investorContributionsForProject)] = $projectAllCosts - $sumOfEntriesExceptLast;

            // calculate Investor returns based on contributions
            foreach ($investorContributionsForProject as $investorId => $contribution) {
                $investorReturn = round($project->shareable * ($contribution / $projectAllCosts), 2);
                Investment::create([
                    'type' => 'return',
                    'amount' => $investorReturn,
                    'investor_id' => $investorId,
                    'project_id' => $project->id,
                    'date' => $project->completed_date
                ]);
            }
            DB::commit();
        });
    }
}
