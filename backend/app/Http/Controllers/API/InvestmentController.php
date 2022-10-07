<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Investment;
use Illuminate\Http\Request;

class InvestmentController extends Controller {

    public function index() {
        return Investment::get();
    }

    public function show(Investment $investment) {
        return $investment;
    }

    public function store(Request $request) {
        return Investment::create($request->all());
    }

    public function update(Request $request, $id) {
        return Investment::find($id)->update($request->all());
    }

    public function destroy(Investment $investment) {
        return $investment->delete();
    }

    public static function makeCompanyInvestment($amount, $date) {
        return Investment::create([
            'investor_id' => 1,
            'amount' => $amount,
            'date' => $date,
            'type' => 'investment',
        ]);
    }
}
