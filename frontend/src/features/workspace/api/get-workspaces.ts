import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";

export interface Workspace {
  id: string;
  name: string;
  description?: string;
}

export const getWorkspaces = async () => {
  const { data: response } = await axiosInstance.get("/workspaces");
  return response.data;
};

export const getWorkspacesQueryKey = () => ["workspaces"];

export const getWorkspacesQueryOptions = () => {
  return queryOptions({
    queryKey: getWorkspacesQueryKey(),
    queryFn: getWorkspaces,
  });
};

type UseGetWorkspacesParams = {
  queryConfig?: QueryConfig<typeof getWorkspacesQueryOptions>;
};

export const useGetWorkspaces = (params: UseGetWorkspacesParams = {}) => {
  return useQuery({
    ...getWorkspacesQueryOptions(),
    ...params.queryConfig,
  });
};
