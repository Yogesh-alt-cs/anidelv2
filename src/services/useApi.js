import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import api from "./api";

const fetchData = async (url) => {
  try {
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const useApi = (endpoint) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchData(endpoint),
    retry: 2,
    enabled: !!endpoint,
    refetchOnWindowFocus: false,
  });
};

const fetchInfiniteData = async ({ queryKey, pageParam = 1 }) => {
  try {
    const url = queryKey[0] + pageParam;
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const useInfiniteApi = (endpoint) => {
  return useInfiniteQuery({
    queryKey: [endpoint],
    queryFn: fetchInfiniteData,
    initialPageParam: 1,
    retry: 0,
    getNextPageParam: (lastpage) => {
      if (lastpage.data.pageInfo.hasNextPage) {
        return lastpage.data.pageInfo.currentPage + 1;
      } else {
        return undefined;
      }
    },
  });
};
