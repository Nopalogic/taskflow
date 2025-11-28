import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getWorkspacesQueryKey } from "../constants/query-key";

export const getWorkspaces = async () => {
  const { data: response } = await axiosInstance.get("/workspaces");
  return response.data;
};

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
