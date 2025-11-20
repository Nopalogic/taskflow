import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getProjectIdQueryKey } from "../constants/query-key";

export const getProjectDetail = async (id: string) => {
  const { data: response } = await axiosInstance.get(`/projects/${id}`);
  return response.data;
};

const getProjectDetailsQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: getProjectIdQueryKey(id),
    queryFn: () => getProjectDetail(id),
  });
};

type UseGetProjectDetailParams = {
  queryConfig?: QueryConfig<typeof getProjectDetailsQueryOptions>;
  projectId: string;
};

export const useGetProjectDetail = (params: UseGetProjectDetailParams) => {
  return useQuery({
    ...getProjectDetailsQueryOptions(params.projectId),
    ...params.queryConfig,
  });
};
