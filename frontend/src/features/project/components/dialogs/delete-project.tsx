"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDeleteProject } from "../../api/delete-project";
import { Project } from "../../types";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useProjectDialogs } from "../../stores/use-project-dialog";

interface DeleteProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
}

export function DeleteProjectDialog({
  open,
  onOpenChange,
  project,
}: DeleteProjectDialogProps) {
  const router = useRouter();
  const { clearState } = useProjectDialogs();
  const { mutate: deleteProject } = useDeleteProject({
    mutationConfig: {
      onSuccess: (data) => {
        onOpenChange(false);
        clearState();
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
