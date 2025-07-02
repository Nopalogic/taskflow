import { DatePicker } from "@/components/date-picker";
import { Main } from "@/components/layouts/main";
import MarkdownEditor from "@/components/project/markdown-editor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { createProject } from "@/services/project";
import { projectSchema, ProjectValues } from "@/validators/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function ProjectCreate() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<ProjectValues>({
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
    },
  });

  const onSubmit = async (data: ProjectValues) => {
    try {
      const response = await createProject(data);

      if (response.success) {
        navigate("/u/projects");
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
      title: `There ${errorCount > 1 ? "were" : "was"} ${errorCount} error${errorCount !== 1 ? "s" : ""} with your submission`,
      description: (
        <ul className="list-disc pl-4">
          {errorMessages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
      ),
    });
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
                placeholder="New project"
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
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </div>
    </Main>
  );
}
