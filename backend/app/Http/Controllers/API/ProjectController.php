<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Exception;
use Illuminate\Http\Request;

class ProjectController extends Controller {

    public function index() {
        return Project::withSum('costs', 'amount')->get();
    }

    public function show($id) {
        return Project::withSum('costs', 'amount')->find($id);
    }

    public function store(Request $request) {
        // TODO: Realized amount shouldn't be set if completed is not set
        return Project::create($request->all());
    }

    public function update(Request $request, $id) {
        // Observe Model Saving and Handle Related Calculations on Model
        // trying to catch any errors on the Model saving method ...failed
        $project =  Project::find($id);
        if ($project->status == "Completed") {
            return response()->json(['message' => 'Cannot modify completed project'], 500);
        }
        return $project->update($request->all());
    }

    public function destroy(Project $project) {
        return $project->delete();
    }
}
