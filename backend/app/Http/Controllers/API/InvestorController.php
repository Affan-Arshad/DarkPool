<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Investor;
use Illuminate\Http\Request;

class InvestorController extends Controller {

    public function index() {
        // return Investor::all();
        return Investor
            ::withSum(['investments as deposits' => function ($query) {
                $query->where('type', 'investment');
            }], 'amount')
            ->withSum(['investments as returns' => function ($query) {
                $query->where('type', 'return');
            }], 'amount')
            ->get();
        // return Investor::with('investments')->withSum('investments', 'amount')->get();
    }

    public function show(Investor $investor) {
        return $investor;
    }

    public function store(Request $request) {
        return Investor::create($request->all());
    }

    public function update(Request $request, $id) {
        return Investor::find($id)->update($request->only([
            'name',
            'account_name',
            'account_no'
        ]));
    }

    public function destroy(Investor $investor) {
        return $investor->delete();
    }
}
