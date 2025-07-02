import { Task } from "./task";

export interface Project {
  id?: string;
  user_id?: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  archive: boolean;
  timeline_from?: Date;
  timeline_to: Date;
  note?: string;
  tasks?: Task[];
}
