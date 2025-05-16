<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $projects = Project::latest()->get();

            return response()->json([
                'success' => true,
                'message' => 'Projects retrieved successfully.',
                'data' => $projects
            ], 200);
        } catch (\Exception $e) {
            Log::error('Project index error:' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve projects.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(StoreProjectRequest $request): JsonResponse
    {
        try {
            Project::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Project created successfully.',
            ], 201);
        } catch (\Exception $e) {
            Log::error('Project store error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create project.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(String $id): JsonResponse
    {
        try {
            $project = Project::with('task')->find($id);

            if (!$project) {
                return response()->json([
                    'success' => false,
                    'message' => 'Project not found.',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Project retrieved successfully.',
                'data' => $project
            ], 200);
        } catch (\Exception $e) {
            Log::error('Project show error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieved project',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateProjectRequest $request, String $id): JsonResponse
    {
        try {
            $project = Project::find($id);

            if (!$project) {
                return response()->json([
                    'success' => false,
                    'message' => 'Project not found.',
                ], 404);
            }

            $project->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Project updated successfully.',
                'data' => $project
            ], 200);
        } catch (\Exception $e) {
            Log::error('Project update error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update project',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(String $id): JsonResponse
    {
        try {
            $project = Project::with('task')->find($id);

            if (!$project) {
                return response()->json([
                    'success' => false,
                    'message' => 'Project not found.',
                ], 404);
            }

            DB::transaction(function () use ($project) {
                $project->task()->delete();
                $project->delete();
            });

            return response()->json([
                'success' => true,
                'message' => 'Project moved to trash successfully.',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Project destroy error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete project.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
