import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { Project } from "../types";
import { getProjectIdQueryKey } from "../contansts/query-key";

export const deleteProject = async (project: Project) => {
  const { data: response } = await axiosInstance.delete(
    `/projects/${project.id}`,
  );
  return response.message;
};

type UseDeleteProjectParams = {
  mutationConfig?: MutationConfig<typeof deleteProject>;
};

export const useDeleteProject = (params: UseDeleteProjectParams = {}) => {
  return useMutation({
    mutationFn: deleteProject,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      if (variables.workspaceId) {
        queryClient.invalidateQueries({
          queryKey: getProjectIdQueryKey(variables.workspaceId),
        });
      }

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
  });
};
