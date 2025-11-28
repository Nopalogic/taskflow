"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { useProjectForm } from "../../hooks/use-create";
import { DialogProps } from "../../types";
import { Controller } from "react-hook-form";
import { useProjectDialogs } from "../../stores/use-project-dialog";

export function CreateProjectDialog({ open, onOpenChange }: DialogProps) {
  const { clearState } = useProjectDialogs();
  const { form, onSubmit } = useProjectForm({
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
    <Dialog open={open} onOpenChange={handleClose}>
      <form id="create-project-form" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogContent
          className="max-w-[425px] md:max-w-xl"
          onInteractOutside={(event) => event.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>
              Projects allow you to organize tasks, notes, and team
              collaboration in one place.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="gap-2">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="grid gap-3">
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
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="create-project-form">
              Create project
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
