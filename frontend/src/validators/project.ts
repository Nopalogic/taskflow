import { z } from "zod";
import { taskSchema } from "./task";

const priorityEnum = ["low", "medium", "high"] as const;

export const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  timeline: z.object({
    from: z.date({ required_error: "Please select a date" }),
    to: z.date().optional(),
  }),
  priority: z.enum(priorityEnum, {
    required_error: "Please select a priority",
    invalid_type_error: "Invalid priority value",
  }),
  archive: z.boolean().optional(),
  note: z
    .string()
    .max(10000, "Notes must be less than 10,000 characters")
    .optional(),
  tasks: z.array(taskSchema).optional(),
});

export type ProjectValues = z.infer<typeof projectSchema>;
