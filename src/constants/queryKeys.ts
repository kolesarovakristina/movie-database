export const QueryKeys = {
  SEARCHED_MOVIES: (movieTitle?: string) => ['searchedMovies', movieTitle],
} as const;
