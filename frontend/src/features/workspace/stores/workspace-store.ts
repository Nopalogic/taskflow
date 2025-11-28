import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getWorkspaces } from "../api/get-workspaces";
import { Workspace } from "../types";

interface WorkspaceState {
  currentWorkspace: Workspace | null;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  updateWorkspace: (workspaceId: string, updates: Partial<Workspace>) => void;
  initializeUserWorkspace: () => Promise<void>;
  clearWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      currentWorkspace: null,

      setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),

      updateWorkspace: (workspaceId, updates) => {
        const { currentWorkspace } = get();

        const updatedCurrentWorkspace =
          currentWorkspace?.id === workspaceId
            ? { ...currentWorkspace, ...updates }
            : currentWorkspace;

        set({
          currentWorkspace: updatedCurrentWorkspace,
        });
      },

      initializeUserWorkspace: async () => {
        try {
          const existingWorkspaces = await getWorkspaces();

          set({
            currentWorkspace: existingWorkspaces[0],
          });
        } catch (error) {
          throw error;
        }
      },

      clearWorkspace: () => {
        set({
          currentWorkspace: null,
        });
      },
    }),
    {
      name: "taskflow-workspace-storage",
      partialize: (state) => ({
        currentWorkspace: state.currentWorkspace,
      }),
    },
  ),
);
