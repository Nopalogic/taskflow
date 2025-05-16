<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TrashController extends Controller
{

    public function index(): JsonResponse
    {
        try {
            $project = Project::onlyTrashed()->get();
            $task = Task::onlyTrashed()->get();

            if (!$project && !$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Trashed project or task not found',
                ], 404);
            }

            $restoredItems = [];

            if ($project) {
                $restoredItems['project'] = $project;
            }

            if ($task) {
                $restoredItems['task'] = $task;
            }

            return response()->json([
                'success' => true,
                'message' => 'Trashed projects and tasks retrieved successfully.',
                'data' => $restoredItems
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error retrieving trashed projects: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve trashed projects',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function restore(String $id): JsonResponse
    {
        try {
            $project = Project::onlyTrashed()->find($id);

            if ($project) {
                $project->restore();
                return response()->json([
                    'success' => true,
                    'message' => 'Project restored successfully.',
                ], 200);
            }

            $task = Task::onlyTrashed()->with(['project' => function ($q) {
                $q->withTrashed();
            }])->find($id);

            if ($task) {
                DB::transaction(function () use ($task) {
                    if ($task->project && $task->project->trashed()) {
                        $task->project->restore();
                    }

                    $task->restore();
                });

                $response = [
                    'success' => true,
                    'message' => 'Task restored successfully' .
                        ($task->project && !$task->project->trashed() ?
                            ' (project was not trashed)' :
                            ' with its project'),
                ];

                return response()->json($response, 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Trashed project or task not found',
            ], 404);
        } catch (\Exception $e) {
            Log::error('Restore error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to restore item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function delete(String $id): JsonResponse
    {
        try {
            $project = Project::onlyTrashed()->find($id);

            if ($project) {
                $project->forceDelete();
                return response()->json([
                    'success' => true,
                    'message' => 'Project permanently deleted successfully.',
                ], 200);
            }

            $task = Task::onlyTrashed()->find($id);

            if ($task) {
                $task->forceDelete();
                return response()->json([
                    'success' => true,
                    'message' => 'Task permanently deleted successfully.',
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Trashed project or task not found',
            ], 404);
        } catch (\Exception $e) {
            Log::error('Project delete error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to permanently delete project.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
