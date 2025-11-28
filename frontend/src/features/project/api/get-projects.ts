import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getProjectIdQueryKey } from "../contansts/query-key";

export const getProjects = async (workspaceId: string) => {
  const { data: response } = await axiosInstance.get("/projects", {
    headers: { "workspace-id": workspaceId },
  });
  return response.data;
};

const getProjectsQueryOptions = (workspaceId: string) => {
  return queryOptions({
    queryKey: getProjectIdQueryKey(workspaceId),
    queryFn: () => getProjects(workspaceId),
  });
};

type UseGetProjectsParams = {
  queryConfig?: QueryConfig<typeof getProjectsQueryOptions>;
  workspaceId: string;
};

export const useGetProjects = (params: UseGetProjectsParams) => {
  return useQuery({
    ...getProjectsQueryOptions(params.workspaceId),
    ...params.queryConfig,
  });
};