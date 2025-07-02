import { DatePicker } from "@/components/date-picker";
import { Main } from "@/components/layouts/main";
import MarkdownEditor from "@/components/project/markdown-editor";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatLabel } from "@/lib/format";
import { Controller, useForm } from "react-hook-form";
import { CustomBadge } from "../badge";
import { Progress } from "../ui/progress";
import { projectSchema, ProjectValues } from "@/validators/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

interface ProjectProps {
  mode?: "create" | "edit";
  defaultValues?: Partial<ProjectValues>;
  onSubmit?: (data: ProjectValues) => void;
  onCancel?: () => void;
}

export default function ProjectForm({
  mode = "create",
  defaultValues = {},
  onSubmit,
  onCancel,
}: ProjectProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "not_started",
      priority: "low",
      note: "",
      date_range: {
        start_date: undefined,
        end_date: undefined,
      },
      ...defaultValues,
    },
  });

  return (
    <Main>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <Controller
            name="title"
            control={control}
            render={({ field: { value, onChange } }) => (
              <input
                type="text"
                className="w-full border-none p-0 text-5xl font-bold shadow-none focus:border-none focus:outline-none"
                value={value}
                onChange={onChange}
                placeholder="Project title"
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <input
                type="text"
                className="borde-none mt-4 w-full p-0 text-base shadow-none focus:border-none focus:outline-none"
                value={value}
                onChange={onChange}
                placeholder="description"
              />
            )}
          />

          <div className="mt-4 flex items-center justify-start">
            <Label className="w-[6rem] md:w-[10rem]">Timeline</Label>
            <Controller
              name="date_range"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  startDate={value?.start_date}
                  endDate={value?.end_date}
                  onChange={(startDate, endDate) => {
                    onChange({
                      start_date: startDate,
                      end_date: endDate,
                    });
                  }}
                />
              )}
            />
          </div>

          <Controller
            name="tasks"
            control={control}
            render={({ field: { value } }) => {
              const tasks = value || [];
              const totalTasks: number = tasks.length || 0;
              const totalTasksCompleted: number =
                tasks.filter((task) => task.status === "completed").length || 0;

              const progressPercentation =
                totalTasks > 0 ? (totalTasksCompleted / totalTasks) * 100 : 0;
              return (
                <>
                  <div className="mt-4 flex items-center justify-start">
                    <Label className="w-[6rem] md:w-[10rem]">Progress</Label>
                    <p className="text-sm">{progressPercentation}%</p>
                    <Progress
                      value={progressPercentation}
                      className="ml-2 w-[10%]"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-start">
                    <Label className="w-[6rem] md:w-[10rem]">Tasks Ratio</Label>
                    <span>{`${totalTasksCompleted}/${totalTasks} tasks completed`}</span>
                  </div>
                </>
              );
            }}
          />

          <Controller
            name="status"
            control={control}
            render={({ field: { value } }) => (
              <div className="mt-4 flex items-center justify-start capitalize">
                <Label className="w-[6rem] md:w-[10rem]">Status</Label>
                <h2>{formatLabel(value) || "Empty"}</h2>
              </div>
            )}
          />

          <div className="mt-4 flex items-center justify-start capitalize">
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
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="mt-4">
            <div className="mt-2 rounded-md border">
              <Controller
                name="tasks"
                control={control}
                render={({ field: { value } }) => (
                  <Table className="[&_td]:py-2 [&_th]:py-2">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {value ? (
                        value.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell className="font-medium">
                              {task.title}
                            </TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{formatDate(task.due_date)}</TableCell>
                            <TableCell>
                              <CustomBadge label={task.status} />
                            </TableCell>
                            <TableCell>
                              <CustomBadge label={task.priority} />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5}>
                            <div className="w-full py-3 text-center">
                              No tasks exists
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              />
            </div>
          </div>

          <Controller
            name="note"
            control={control}
            render={({ field: { value, onChange } }) => (
              <MarkdownEditor
                markdown={value || ""}
                onChange={onChange}
                className="mt-1 mb-16"
              />
            )}
          />

          <div className="fixed bottom-4 right-4 z-50">
            <div className="flex h-16 w-full items-center justify-end space-x-2 rounded-xl border px-4">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {mode === "create" ? "Create Project" : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Main>
  );
}
