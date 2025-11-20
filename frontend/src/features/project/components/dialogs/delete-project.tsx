import { ConfirmDialog } from "@/components/confirm-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDeleteProject } from "../../api/delete-project";
import { ProjectType } from "../../types";

interface DeleteProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectType;
}

export function DeleteProjectDialog({
  open,
  onOpenChange,
  project,
}: DeleteProjectDialogProps) {
  const router = useRouter();
  const { mutate: deleteProject } = useDeleteProject({
    mutationConfig: {
      onSuccess: (data) => {
        router.replace("/u");
        toast.success(data);
      },
    },
  });

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Are you sure?"
      desc={
        <p>
          This action cannot be undone. It will permanently delete the{" "}
          <span className="font-semibold">{project.name}</span> project and all
          data within it.
        </p>
      }
      confirmText="Delete project"
      destructive
      handleConfirm={() => deleteProject(project)}
      className="sm:max-w-sm"
    />
  );
}
