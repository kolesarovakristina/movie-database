import { useQuery } from '@tanstack/react-query';
import ApiService from 'apiService';
import { QueryKeys } from 'constants/queryKeys';

export const useMovieDetailsQuery = (movieId: string) => {
  return useQuery({
    queryKey: QueryKeys.MOVIE_DETAILS(movieId),
    queryFn: () => ApiService.getMovieDetails(movieId as string),
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};
