export const QueryKeys = {
  GET_MOVIES: (movieTitle: string, page: number) => [
    'getMovies',
    movieTitle,
    page,
  ],

  MOVIE_DETAILS: (movieId?: string) => ['movieDetails', movieId],
} as const;
