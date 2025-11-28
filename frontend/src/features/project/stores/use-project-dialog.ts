import { create } from "zustand";
import { Project } from "../types";

export type ProjectDialogType =
  | "project-create"
  | "project-update"
  | "project-delete"
  | null;

type DialogStore = {
  open: ProjectDialogType;
  project: Project | null;

  setOpen: (type: ProjectDialogType) => void;
  setProject: (type: Project) => void;
  clearState: () => void;
};

export const useProjectDialogs = create<DialogStore>((set) => ({
  open: null,
  project: null,

  setOpen: (type) => set({ open: type }),
  setProject: (project) => set({ project }),
  clearState: () => set({ open: null }),
}));
