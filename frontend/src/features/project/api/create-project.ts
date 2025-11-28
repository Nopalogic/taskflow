import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { Project } from "../types";
import { getProjectIdQueryKey } from "../contansts/query-key";

export const createProject = async (project: Omit<Project, "id">) => {
  const { data: response } = await axiosInstance.post("/projects", project);
  return response.message;
};

type UseCreateProjectParams = {
  mutationConfig?: MutationConfig<typeof createProject>;
};

export const useCreateProject = (params: UseCreateProjectParams = {}) => {
  return useMutation({
    ...params.mutationConfig,
    mutationFn: createProject,
    onSuccess: (data, variables, onMutateResult, context) => {
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
