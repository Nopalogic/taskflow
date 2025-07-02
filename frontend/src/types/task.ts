type Status = "todo" | "in_progress" | "completed";
type Priority = "low" | "medium" | "high";

export interface Task {
  id?: string;
  project_id: string;
  user_id?: string;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  due_date?: Date;
}
