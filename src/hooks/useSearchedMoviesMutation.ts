import { useMutation } from '@tanstack/react-query';
import ApiService from 'apiService';

export const useSearchedMoviesMutation = () => {
  return useMutation({
    mutationFn: (movieTitle: string) =>
      ApiService.getSearchedMovies(movieTitle as string),
  });
};
