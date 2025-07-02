import { z } from "zod";

const statusEnum = ["todo", "in_progress", "completed"] as const;
const priorityEnum = ["low", "medium", "high"] as const;

export const taskSchema = z.object({
  id: z.string().min(1).optional(),
  project_id: z.string().min(1, "Project should be select"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  due_date: z.date({ required_error: "Date should be select" }),
  status: z.enum(statusEnum),
  priority: z.enum(priorityEnum),
});

export type TaskValues = z.infer<typeof taskSchema>;
