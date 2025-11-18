import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getWorkspacesQueryKey } from "./get-workspaces";

type WorkspaceRequest = {
  name: string;
};

export const createWorkspace = async (workspace: WorkspaceRequest) => {
  const { data: response } = await axiosInstance.post("/workspaces", workspace);
  return response.message;
};

type UseCreateWorkspaceParams = {
  mutationConfig?: MutationConfig<typeof createWorkspace>;
};

export const useCreateWorkspace = (params: UseCreateWorkspaceParams = {}) => {
  return useMutation({
    ...params.mutationConfig,
    mutationFn: createWorkspace,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getWorkspacesQueryKey() });

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
  });
};
