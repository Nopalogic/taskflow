import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import {
  getProjectIdQueryKey
} from "../constants/query-key";
import { ProjectType } from "../types";

export const deleteProject = async (project: ProjectType) => {
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
