import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProjectSchema, ProjectSchemaForm } from "../forms/project";
import { useCreateProject } from "../api/create-project";
import { useWorkspaceStore } from "@/features/workspace/stores/use-workspace";

export const useProjectForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { currentWorkspace } = useWorkspaceStore();

  const form = useForm<ProjectSchemaForm>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: "",
      workspaceId: currentWorkspace?.id,
    },
  });

  const { mutate: createProjectMutation } = useCreateProject({
    mutationConfig: {
      onSuccess: (data) => {
        toast.success(data);
        onSuccess();
        form.reset();
      },
    },
  });

  const onSubmit = (data: ProjectSchemaForm) => {
    try {
      createProjectMutation(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Oops... something went wrong!", {
        description: "Please try again in a few moments",
      });
    }
  };

  return { form, onSubmit };
};
