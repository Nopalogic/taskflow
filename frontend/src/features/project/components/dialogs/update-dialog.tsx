"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useProjectForm } from "../../hooks/use-update";
import { DialogProps, Project } from "../../types";
import { DeleteProjectDialog } from "./delete-project";
import { useProjectDialogs } from "../../stores/use-project-dialog";

export function UpdateProjectDialog({
  open,
  onOpenChange,
  project,
}: DialogProps & { project: Project }) {
  const { clearState } = useProjectDialogs();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { form, onSubmit } = useProjectForm({
    data: project,
    onSuccess: () => {
      onOpenChange(false);
      clearState();
    },
  });

  const handleClose = () => {
    onOpenChange(false);
    clearState();
    form.reset();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <form id="update-project-form" onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent
            className="max-w-[425px] md:max-w-2xl"
            onInteractOutside={(event) => event.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>Edit project</DialogTitle>
            </DialogHeader>
            <FieldGroup className="gap-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-3"
                  >
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <div className="space-y-3 rounded-lg border border-red-500/50 bg-red-200/20 px-4 py-3">
              <div className="space-y-1">
                <h3 className="text-base font-medium text-red-500">
                  Danger zone
                </h3>
                <h3 className="text-muted-foreground text-sm">
                  Permanently delete this project. This action cannot be undone.
                </h3>
              </div>
              <Button
                variant="destructive"
                onClick={() => setDeleteDialogOpen(!deleteDialogOpen)}
              >
                Delete project
              </Button>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" form="update-project-form">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      <DeleteProjectDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        project={project}
      />
    </>
  );
}
