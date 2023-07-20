import { QueryClient, QueryKey, useQueryClient } from '@tanstack/react-query';

export const useGetFetchedQuery = (
  key: QueryKey | QueryKey[],
  areMultipleKeys = false
): QueryClient | Array<[QueryKey, unknown] | undefined> | undefined => {
  const queryClient = useQueryClient();

  return areMultipleKeys
    ? (key as QueryKey[]).map(key => queryClient.getQueryData(key))
    : queryClient.getQueryData(key);
};
