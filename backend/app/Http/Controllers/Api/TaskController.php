<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $tasks = Task::latest()->get();

            return response()->json([
                'success' => true,
                'message' => 'Tasks retrieved successfully.',
                'data' => $tasks
            ], 200);
        } catch (\Exception $e) {
            Log::error('Task index error:' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve tasks.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(StoreTaskRequest $request): JsonResponse
    {
        try {
            task::create([
                'project_id' => $request->project_id,
                'user_id' => Auth::id(),
                'title' => $request->title,
                'description' => $request->description,
                'due_date' => $request->due_date,
                'priority' => $request->priority,
                'status' => $request->status,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'task created successfully.',
            ], 201);
        } catch (\Exception $e) {
            Log::error('task store error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create task.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(String $id): JsonResponse
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'task not found.',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Task retrieved successfully.',
                'data' => $task
            ], 200);
        } catch (\Exception $e) {
            Log::error('Task show error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieved task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateTaskRequest $request, String $id): JsonResponse
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'task not found.',
                ], 404);
            }

            $task->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Task updated successfully.',
                'data' => $task
            ], 200);
        } catch (\Exception $e) {
            Log::error('Task update error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(String $id): JsonResponse
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Task not found.',
                ], 404);
            }

            $task->delete();

            return response()->json([
                'success' => true,
                'message' => 'Task moved to trash successfully.',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Task destroy error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete task.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
