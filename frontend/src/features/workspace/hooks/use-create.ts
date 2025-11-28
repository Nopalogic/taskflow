import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateWorkspace } from "../api/create-workspace";
import { WorkspaceSchema, WorkspaceSchemaForm } from "../validations/workspace";

export const useWorkspaceForm = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const form = useForm<WorkspaceSchemaForm>({
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate: createWorkspaceMutation } = useCreateWorkspace({
    mutationConfig: {
      onSuccess: (data) => {
        toast.success(data);
        if (onSuccess) {
          onSuccess();
          form.reset();
        }
      },
    },
  });

  const onSubmit = (data: WorkspaceSchemaForm) => {
    try {
      createWorkspaceMutation(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Oops... something went wrong!", {
        description: "Please try again in a few moments",
      });
    }
  };

  return { form, onSubmit };
};
