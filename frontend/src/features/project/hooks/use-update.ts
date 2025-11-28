import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateProject } from "../api/update-project";
import { ProjectSchema, ProjectSchemaForm } from "../validations/project";
import { Project } from "../types";

interface UseProjectFormProps {
  data: Project;
  onSuccess: () => void;
}

export const useProjectForm = ({ data, onSuccess }: UseProjectFormProps) => {
  const form = useForm<ProjectSchemaForm>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: data.name,
      workspaceId: data.workspaceId,
    },
  });

  const { mutate: updateProjectMutation } = useUpdateProject({
    mutationConfig: {
      onSuccess: (data) => {
        toast.success(data);
        onSuccess();
        form.reset();
      },
    },
  });

  const onSubmit = (request: ProjectSchemaForm) => {
    try {
      updateProjectMutation({ id: data.id, ...request });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Oops... something went wrong!", {
        description: "Please try again in a few moments",
      });
    }
  };

  return { form, onSubmit };
};
