import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { getProjectIdQueryKey } from "../constants/query-key";
import { ProjectType } from "../types";

export const updateProject = async (project: ProjectType) => {
  const { data: response } = await axiosInstance.patch(
    `/projects/${project.id}`,
    project,
  );
  return response.message;
};

type UseUpdateProjectParams = {
  mutationConfig?: MutationConfig<typeof updateProject>;
};

export const useUpdateProject = (params: UseUpdateProjectParams = {}) => {
  return useMutation({
    ...params.mutationConfig,
    mutationFn: updateProject,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: getProjectIdQueryKey(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: getProjectIdQueryKey(variables.workspaceId),
      });

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
  });
};
