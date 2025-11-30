import z from "zod";

export const ProjectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters.")
    .max(60, "Project name must be at most 60 characters."),
  workspaceId: z.string(),
});

export type ProjectSchemaForm = z.infer<typeof ProjectSchema>;
