import z from "zod";

export const WorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, "Workspace name must be at least 2 characters.")
    .max(20, "Workspace name must be at most 20 characters."),
  description: z
    .string()
    .max(20, "Workspace name must be at most 20 characters.")
    .optional(),
});

export type WorkspaceSchemaForm = z.infer<typeof WorkspaceSchema>;
