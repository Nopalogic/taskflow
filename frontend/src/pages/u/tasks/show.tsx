import { Combobox } from "@/components/combobox";
import { Calendar22 } from "@/components/date-picker";
import { Main } from "@/components/layouts/main";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { formatLabel } from "@/lib/format";
import { deleteTask, getTask, updateTask } from "@/services/task";
import { Task } from "@/types/task";
import { taskSchema, TaskValues } from "@/validators/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "../loading-spinner";

export default function TaskShow() {
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { taskId } = useParams();
  const navigate = useNavigate();

  // FIX 1: Destructure `reset` from useForm
  const { control, handleSubmit, reset } = useForm<TaskValues>({
    resolver: zodResolver(taskSchema),
    // It's good practice to define the shape of your default values,
    // even if they are empty strings or null.
    defaultValues: {
      title: "",
      description: "",
      project_id: undefined,
      due_date: undefined,
      status: "todo",
      priority: "low",
    },
  });

  useEffect(() => {
    const fetchTask = async () => {
      // Set loading to true at the beginning of the fetch
      setIsLoading(true);
      try {
        const response = await getTask(taskId!);
        if (response.success) {
          setTask(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch task:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load task data.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  // FIX 2: Add a new useEffect to reset the form when the task data arrives
  useEffect(() => {
    if (task) {
      // The `due_date` from the server might be a string.
      // If your Calendar component expects a Date object, you must convert it.
      const transformedTask = {
        ...task,
        due_date: task.due_date ? new Date(task.due_date) : undefined,
      };
      reset(transformedTask);
    }
  }, [task, reset]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const onSubmit = async (data: TaskValues) => {
    try {
      const response = await updateTask(taskId!, data);

      if (response.success) {
        toast({ title: response.message });
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (errors: Record<string, any>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getAllErrorMessages = (errorObj: any): string[] => {
      const messages: string[] = [];
      for (const key in errorObj) {
        if (errorObj[key]?.message) {
          messages.push(errorObj[key].message);
        } else if (typeof errorObj[key] === "object") {
          messages.push(...getAllErrorMessages(errorObj[key]));
        }
      }
      return messages;
    };

    const errorMessages = getAllErrorMessages(errors);
    const errorCount = errorMessages.length;

    toast({
      variant: "destructive",
      title: `There ${
        errorCount > 1 ? "were" : "was"
      } ${errorCount} error${errorCount !== 1 ? "s" : ""} with your submission`,
      description: (
        <ul className="list-disc pl-4">
          {errorMessages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
      ),
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteTask(id);
      if (response.success) {
        toast({ title: response.message });
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main>
      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="w-full border-none p-0 text-5xl font-bold shadow-none focus:border-none focus:outline-none"
                placeholder="New task"
                aria-label="Task title"
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                value={field.value ?? ""}
                type="text"
                className="mt-4 w-full border-none p-0 text-base shadow-none focus:border-none focus:outline-none"
                placeholder="Description"
                aria-label="Project description"
              />
            )}
          />

          <div className="flex items-center justify-start">
            <Label className="w-[6rem] md:w-[10rem]">Project</Label>
            <Controller
              name="project_id"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Combobox value={value} onChange={onChange} />
              )}
            />
          </div>

          <div className="flex items-center justify-start">
            <Label className="w-[6rem] md:w-[10rem]">Due Date</Label>
            <Controller
              name="due_date"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Calendar22 value={value} onChange={onChange} />
              )}
            />
          </div>

          <div className="flex items-center justify-start capitalize">
            <Label className="w-[6rem] md:w-[10rem]">Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="w-36">
                    <SelectValue>{formatLabel(value)}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">Todo</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex items-center justify-start capitalize">
            <Label className="w-[6rem] md:w-[10rem]">Priority</Label>
            <Controller
              name="priority"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="w-36">
                    <SelectValue>{formatLabel(value)}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="fixed bottom-0 right-4 flex w-full items-center justify-end space-x-2 bg-white pb-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit">Update Task</Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleDelete(taskId!)}
            >
              Delete
            </Button>
          </div>
        </form>
      </div>
    </Main>
  );
}
