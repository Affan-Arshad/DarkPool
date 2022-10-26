<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller {

    public function index() {
        return Project::withSum('costs', 'amount')->get();
    }

    public function show(Project $project) {
        return $project;
    }

    public function store(Request $request) {
        // TODO: Realized amount shouldn't be set if completed is not set
        return Project::create($request->all());
    }

    public function update(Request $request, $id) {
        return Project::find($id)->update($request->all());
    }

    public function destroy(Project $project) {
        return $project->delete();
    }
}
