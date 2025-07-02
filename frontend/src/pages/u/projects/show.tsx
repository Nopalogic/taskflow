/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/data-table/columns";
import { DatePicker } from "@/components/date-picker";
import { Main } from "@/components/layouts/main";
import MarkdownEditor from "@/components/project/markdown-editor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { formatLabel } from "@/lib/format";
import { deleteProject, getProject, updateProject } from "@/services/project";
import { Project } from "@/types/project"; // Assuming Task is also in this file
import { projectSchema, ProjectValues } from "@/validators/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "../loading-spinner"; // Assuming this exists
import { Task } from "@/types/task";

export default function ProjectShow() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [project, setProject] = useState<Project | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { control, handleSubmit, reset } = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      timeline: {
        from: undefined,
        to: undefined,
      },
      priority: "low",
      archive: false,
      note: "",
      tasks: [],
    },
  });

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      setIsLoading(true);
      try {
        const response = await getProject(projectId);
        if (response.success) {
          setProject(response.data);
        } else {
          toast({ variant: "destructive", title: "Failed to load project." });
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
        toast({ variant: "destructive", title: "An error occurred." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (project) {
      const transformedData = {
        ...project,
        timeline: {
          from: project.timeline_from
            ? new Date(project.timeline_from)
            : undefined,
          to: project.timeline_to ? new Date(project.timeline_to) : undefined,
        },
      };
      reset(transformedData);
    }
  }, [project, reset]);

  const onSubmit = async (data: ProjectValues) => {
    const dataForApi = {
      ...data,
      // Flatten the timeline object back into separate properties
      timeline_from: data.timeline.from,
      timeline_to: data.timeline.to,
      // Remove the nested timeline object that the API doesn't understand
      // timeline: undefined,
    };

    try {
      // Here you would transform `data` back to the API shape before sending
      // console.log("Form data submitted:", data);
      const response = await updateProject(projectId!, dataForApi);

      if (response.success) {
        navigate("/u/projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteProject(id);
      if (response.success) {
        toast({ title: response.message });
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (errors: Record<string, any>) => {
    const errorMessages = Object.values(errors).map(
      (error: any) => error.message,
    );
    toast({
      variant: "destructive",
      title: `There ${errorMessages.length > 1 ? "were" : "was"} ${errorMessages.length} error${errorMessages.length > 1 ? "s" : ""} with your submission`,
      description: (
        <ul className="list-disc pl-4">
          {errorMessages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
      ),
    });
  };

  const renderTaskProgress = (tasks: Task[] = []) => {
    const totalTasks = tasks.length;
    const tasksCompleted = tasks.filter(
      (task) => task.status === "completed",
    ).length;
    const progressPercentage =
      totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;

    const projectStatus = () => {
      if (progressPercentage === 100) return "completed";
      if (progressPercentage > 0) return "in progress";
      return "not started";
    };

    return (
      <>
        <div className="mt-4 flex items-center justify-start">
          <Label className="w-[6rem] md:w-[10rem]">Progress</Label>
          <p className="text-sm">{Math.round(progressPercentage)}%</p>
          <Progress value={progressPercentage} className="ml-2 w-[10%]" />
        </div>
        <div className="mt-4 flex items-center justify-start">
          <Label className="w-[6rem] md:w-[10rem]">Tasks Ratio</Label>
          <span>{`${tasksCompleted}/${totalTasks} tasks completed`}</span>
        </div>
        <div className="flex items-center justify-start capitalize">
          <Label className="w-[6rem] md:w-[10rem]">Status</Label>
          <p>{projectStatus()}</p>
        </div>
      </>
    );
  };

  // FIX 4: Add loading guard
  if (isLoading) {
    return (
      <Main>
        <div className="flex h-96 w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          {/* Form fields... */}
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="w-full border-none p-0 text-5xl font-bold shadow-none focus:border-none focus:outline-none"
                placeholder="Project title"
                aria-label="Project title"
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
            <Label className="w-[6rem] md:w-[10rem]">Timeline</Label>
            <Controller
              name="timeline"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker value={value} onChange={onChange} />
              )}
            />
          </div>

          <Controller
            name="tasks"
            control={control}
            render={({ field: { value } }) => renderTaskProgress(value)}
          />

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

          <div className="flex items-center justify-start capitalize">
            <Label className="w-[6rem] md:w-[10rem]">Archive</Label>
            <Controller
              name="archive"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox checked={value} onCheckedChange={onChange} />
              )}
            />
          </div>

          <Controller
            name="tasks"
            control={control}
            // FIX 5: Guard against undefined by providing a fallback empty array
            render={({ field: { value } }) => (
              <DataTable columns={columns} data={value || []} />
            )}
          />

          <Controller
            name="note"
            control={control}
            render={({ field: { value, onChange } }) => (
              <MarkdownEditor
                markdown={value || ""}
                onChange={onChange}
                className="mb-16"
              />
            )}
          />
          <div className="fixed bottom-0 right-4 flex w-full items-center justify-end space-x-2 bg-white pb-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit">Update Project</Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleDelete(projectId!)}
            >
              Delete
            </Button>
          </div>
        </form>
      </div>
    </Main>
  );
}
