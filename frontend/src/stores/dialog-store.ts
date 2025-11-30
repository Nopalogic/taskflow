import { create } from "zustand";

export type DialogType = "project-create" | "project-update" | null;

type DialogStore<T> = {
  open: DialogType;
  data: T | null;
  setOpen: (type: DialogType, data?: T | null) => void;
  updateData: (updater: (currentData: T | null) => T | null) => void;
  clearData: () => void;
};

export const dialogStore = <T>() => {
  return create<DialogStore<T>>((set) => ({
    open: null,
    data: null,
    setOpen: (type, data = null) => set({ open: type, data }),
    clearData: () => set({ open: null, data: null }),
    updateData: (updater) => set((state) => ({ data: updater(state.data) })),
  }));
};
